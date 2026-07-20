def generate_report(analysis) :
    f = open("APILens_Report.txt", "w")
    f.write("APILens Report\n") 

    f.write("Collection Information\n")
    f.write(f"{analysis['collection']['name']}\n")
    f.write(f"{analysis['collection']['schema']}\n")
    f.write(f"{analysis['collection']['postman_id']}\n")

    f.write("Summary\n")
    f.write(f"Total Requests: {analysis['summary']['total_requests']}\n")
    f.write(f"Total Folders: {analysis['summary']['total_folders']}\n")

    f.write("Methods\n") 
    for method, count in analysis["methods"].items():
        f.write(f"{method}: {count}\n") 

    f.write("Authentication\n")
    for auth, count in analysis["authentication"].items() :
        f.write(f"{auth}: {count}\n")

    f.write("Variables\n") 
    f.write(f"Total variables: {analysis['variables']['count']}\n")
    for key in analysis["variables"]["name"] : 
        f.write(f"Keys: {key}\n") 

    f.write("Endpoints\n")
    for endpoint in analysis["endpoints"] :
        f.write(f"{endpoint['method']}: {endpoint['url']}\n")

    f.write("Headers\n")
    for header, count in analysis["headers"].items() :
        f.write(f"{header}: {count}\n")

    f.write("Query Parameters\n")
    for query, count in analysis["query_parameters"].items() :
        f.write(f"{query}: {count}\n")

    f.write("Sensitive Data\n")
    for data in analysis["sensitive_data"] :
        f.write(f"{data}\n")

    f.write("Response\n")
    for response in analysis["response"] :
        f.write(f"{response}\n")

    f.close()