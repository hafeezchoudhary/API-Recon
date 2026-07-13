def analyze_collection(json_data) :
    analysis = {
        "collection": {}
    }
    if json_data["info"] in json_data :
        info = json_data.get("info")

    analysis["collection"]["name"] = info["name"]

    return analysis