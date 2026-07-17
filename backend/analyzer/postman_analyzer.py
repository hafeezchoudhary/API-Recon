
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
        "endpoints": [],
    }

    items = json_data["item"]
    traverse_items(items, analysis) 
    
    return analysis


def traverse_items(items, analysis):
    for item in items : 
        if "request" in item :
            analysis["summary"]["total_requests"] += 1 
            method = item["request"]["method"] 
            url = item["request"]["url"]["raw"] 
            analysis["endpoints"].append({
                    "method": method,
                    "url": url
                }) 
            analysis["methods"][method] += 1
            request = item["request"]
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
    analysis = {
        "variables": {
            "count": 0,
            "name": [],
        }
    }

    variables = json_data["variable"]
    for variable in variables :
        key = variable["key"]
        if key:
            analysis["variables"]["count"] += 1
            analysis["variables"]["name"].append(key) 

    return analysis 
