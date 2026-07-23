import json

sensitive_keywords = [
        "password",
        "token",
        "access_token",
        "client_secret",
        "client_id",
        "secret",
        "api_key",
        "authorization",
        "jwt"
]


def create_analysis() :
    analysis = {
        "collection": {},
        "summary": {
            "total_requests": 0,
            "total_folders": 0 
        },
        "methods": {
            "GET": 0,
            "POST": 0,
            "PUT": 0,
            "DELETE": 0,
            "PATCH": 0
        },
        "authentication": {
            "bearer": 0,
            "apikey": 0,
            "basic": 0,
            "oauth2": 0,
            "noauth": 0 
        },
        "variables": {
            "count": 0,
            "items": [],
        },
        "endpoints": [],
        "headers": {},
        "query_parameters": {},
        "sensitive_data": [],
        "response": [],
    }

    return analysis


def analyze_collection(json_data, analysis) :

    if "info" not in json_data :
        return {
            "success": False,
            "error": "Missing info section"
        }
    
    info = json_data.get("info")

    analysis["collection"]["name"] = info.get("name")
    analysis["collection"]["schema"] = info.get("schema")
    analysis["collection"]["postman_id"] = info.get("_postman_id")

    return analysis


def analyze_summary(json_data, analysis):

    items = json_data["item"]
    traverse_items(items, analysis) 
    
    return analysis


def traverse_items(items, analysis):

    for item in items:
        if "request" in item:
            request = item["request"]
            analysis["summary"]["total_requests"] += 1

            method = request["method"]
            analysis["methods"][method] += 1

            url = request["url"]["raw"]

            # -------------------------
            # Headers
            # -------------------------

            headers = request.get("header")

            if headers:
                for header in headers:
                    header_key = header["key"]

                    if header_key in analysis["headers"]:
                        analysis["headers"][header_key] += 1
                    else:
                        analysis["headers"][header_key] = 1

                    header_normalized = (header_key.lower().replace("-", "_").replace(" ", "_"))

                    if header_normalized in sensitive_keywords:
                        add_sensitive_data(
                            analysis,
                            {
                                "key": header_key,
                                "severity": "High",
                                "location": "Header",
                                "method": method,
                                "endpoint": url
                            }
                        )

            # -------------------------
            # Query Parameters
            # -------------------------

            query = request["url"].get("query")

            if query:
                for param in query:
                    if param.get("disabled"):
                        continue

                    query_key = param["key"]

                    if query_key in analysis["query_parameters"]:
                        analysis["query_parameters"][query_key] += 1
                    else:
                        analysis["query_parameters"][query_key] = 1

                    query_normalized = (query_key.lower().replace("-", "_").replace(" ", "_"))

                    if query_normalized in sensitive_keywords:
                        severity = ("Medium" if query_normalized == "token" else "High")
                        add_sensitive_data(
                            analysis,
                            {
                                "key": query_key,
                                "severity": severity,
                                "location": "Query",
                                "method": method,
                                "endpoint": url
                            }
                        )

            # -------------------------
            # Body
            # -------------------------

            body = request.get("body")

            if body:
                raw = body.get("raw")
                if raw:
                    try:
                        raw_dict = json.loads(raw)
                    except:
                        raw_dict = {}
                    for raw_key in raw_dict:
                        body_normalized = (raw_key.lower().replace("-", "_").replace(" ", "_"))

                        if body_normalized in sensitive_keywords: 
                            severity = ("Medium" if body_normalized == "token" else "High")

                            add_sensitive_data(
                                analysis,
                                {
                                    "key": raw_key,
                                    "severity": severity,
                                    "location": "Body",
                                    "method": method,
                                    "endpoint": url
                                }
                            )

                # URL ENCODED BODY

                urlencoded = body.get("urlencoded")

                if urlencoded:
                    for field in urlencoded:
                        field_key = field["key"]
                        normalized = (field_key.lower().replace("-", "_").replace(" ", "_"))

                        if normalized in sensitive_keywords:
                            add_sensitive_data(
                                analysis,
                                {
                                    "key": field_key,
                                    "severity": "High",
                                    "location": "Body",
                                    "method": method,
                                    "endpoint": url
                                }
                            )

            # -------------------------
            # Authentication
            # -------------------------

            auth = request.get("auth")

            if auth:
                auth_type = auth.get("type")
                analysis["authentication"][auth_type] += 1
            else:
                analysis["authentication"]["noauth"] += 1

            # -------------------------
            # Response
            # -------------------------

            response = item.get("response")

            if response:
                for res in response:
                    analysis["response"].append({
                        "status": res["status"],
                        "code": res["code"]
                    })

            # -------------------------
            # Endpoints
            # -------------------------

            name = item.get("name")

            auth_type = "NoAuth"

            if request.get("auth"):
                auth_type = request["auth"]["type"]

            analysis["endpoints"].append({
                "name": name,
                "method": method,
                "url": url,
                "auth": auth_type
            })

        # -------------------------
        # Recursive Folder Traversal
        # -------------------------

        if "item" in item:
            analysis["summary"]["total_folders"] += 1
            traverse_items(
                item["item"],
                analysis
            )

    return analysis


def analyze_variables(json_data, analysis):

    variables = json_data.get("variable")
    if variables :
        for variable in variables:
            key = variable["key"]
            if key:
                analysis["variables"]["count"] += 1
                analysis["variables"]["items"].append({
                    "key": variable["key"],
                    "value": variable.get("value", "-")
                })

    return analysis


def add_sensitive_data(analysis, data):

    for item in analysis["sensitive_data"]:
        if item["key"] == data["key"]:
            return

    analysis["sensitive_data"].append(data)