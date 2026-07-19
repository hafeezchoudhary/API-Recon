analysis = {
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
            "name": [],
        },
        "endpoints": [],
        "headers": {},
        "query_parameters": {},
        "sensitive_data": [],
        
    }

sensitive_keywords = [
        "password",
        "token",
        "access_token",
        "secret",
        "api_key",
        "authorization",
        "jwt"
]


def analyze_collection(json_data) :
    analysis = {
        "collection": {},
    }
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


def analyze_summary(json_data):
    

    

    items = json_data["item"]
    traverse_items(items, analysis) 
    
    return analysis


def traverse_items(items, analysis):

    for item in items : 
        if "request" in item :
            analysis["summary"]["total_requests"] += 1 

            method = item["request"]["method"] 
            analysis["methods"][method] += 1

            url = item["request"]["url"]["raw"] 
            analysis["endpoints"].append({
                "method": method,
                "url": url 
            }) 
            
            headers = item["request"].get("header") 
            if headers :
                for header in headers :
                    header_key = header["key"]
                    if header_key in analysis["headers"] :
                        analysis["headers"][header_key] += 1
                    else :
                        analysis["headers"][header_key] = 1 

                    if header_key.lower() in sensitive_keywords :
                        analysis["sensitive_data"].append(header_key)

            query = item["request"]["url"].get("query")
            if query :
                for param in query :
                    query_key = param["key"]
                    if query_key in analysis["query_parameters"] :
                        analysis["query_parameters"][query_key] += 1
                    else :
                        analysis["query_parameters"][query_key] = 1 

                    if query_key.lower() in sensitive_keywords :
                        analysis["sensitive_data"].append(query_key)
            
            request = item["request"]
            body = request.get("body") 
            if body :
                raw = body.get("raw")
                for keyword in sensitive_keywords :
                    if raw :
                        if keyword in raw.lower() :
                            analysis["sensitive_data"].append(raw) 


            auth = request.get("auth") 
            if auth:
                auth_type = auth.get("type") 
                analysis["authentication"][auth_type] += 1 
            else :
                analysis["authentication"]["noauth"] += 1


        if "item" in item :
            analysis["summary"]["total_folders"] += 1 
            traverse_items(item["item"], analysis)   

    return analysis


def analyze_variables(json_data):
    
    variables = json_data["variable"]
    for variable in variables :
        key = variable["key"]
        if key:
            analysis["variables"]["count"] += 1
            analysis["variables"]["name"].append(key) 
        
        if key in sensitive_keywords :
            analysis["sensitive_data"].append(key)

    return analysis 
