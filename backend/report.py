from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet


def generate_report(analysis):

    doc = SimpleDocTemplate("APILens_Report.pdf")
    styles = getSampleStyleSheet()

    elements = []

    # Title
    elements.append(Paragraph("APILens Report", styles["Title"]))
    elements.append(Spacer(1, 12))

    # Collection Information
    elements.append(
        Paragraph("Collection Information", styles["Heading2"])
    )
    elements.append(
        Paragraph(f"Name: {analysis["collection"]["name"]}", styles["Normal"])
    )
    elements.append(
        Paragraph(f"Schema: {analysis["collection"]["schema"]}", styles["Normal"])
    )
    elements.append(
        Paragraph(f"Postman ID: {analysis["collection"]["postman_id"]}", styles["Normal"])
    )
    elements.append(Spacer(1, 12))

    # Summary
    elements.append(Paragraph("Summary", styles["Heading2"]))
    elements.append(
        Paragraph(
            f"Total Requests: {analysis['summary']['total_requests']}",
            styles["Normal"]
        )
    )
    elements.append(
        Paragraph(
            f"Total Folders: {analysis['summary']['total_folders']}",
            styles["Normal"]
        )
    )
    elements.append(Spacer(1, 12))

    # Methods
    elements.append(Paragraph("Methods", styles["Heading2"]))

    for method, count in analysis["methods"].items():
        elements.append(
            Paragraph(
                f"{method}: {count}",
                styles["Normal"]
            )
        )

    elements.append(Spacer(1, 12))

    # Authentication
    elements.append(
        Paragraph("Authentication", styles["Heading2"])
    )

    for auth, count in analysis["authentication"].items():
        elements.append(
            Paragraph(
                f"{auth}: {count}",
                styles["Normal"]
            )
        )

    elements.append(Spacer(1, 12))

    # Variables
    elements.append(Paragraph("Variables", styles["Heading2"]))

    elements.append(
        Paragraph(
            f"Total Variables: {analysis['variables']['count']}",
            styles["Normal"]
        )
    )
    elements.append(Paragraph("keys: ", styles["Normal"]))
    for key in analysis["variables"]["name"]:
        elements.append(
            Paragraph(
                f"-{key}",
                styles["Normal"]
            )
        )

    elements.append(Spacer(1, 12))

    # Endpoints
    elements.append(Paragraph("Endpoints", styles["Heading2"]))

    for endpoint in analysis["endpoints"]:
        elements.append(
            Paragraph(
                f"{endpoint['method']} - {endpoint['url']}",
                styles["Normal"]
            )
        )

    elements.append(Spacer(1, 12))

    # Headers
    elements.append(Paragraph("Headers", styles["Heading2"]))

    for header, count in analysis["headers"].items():
        elements.append(
            Paragraph(
                f"{header}: {count}",
                styles["Normal"]
            )
        )

    elements.append(Spacer(1, 12))

    # Query Parameters
    elements.append(
        Paragraph("Query Parameters", styles["Heading2"])
    )

    for query, count in analysis["query_parameters"].items():
        elements.append(
            Paragraph(
                f"{query}: {count}",
                styles["Normal"]
            )
        )

    elements.append(Spacer(1, 12))

    # Sensitive Data
    elements.append(
        Paragraph("Sensitive Data", styles["Heading2"])
    )

    for data in analysis["sensitive_data"]:
        elements.append(
            Paragraph(
                data,
                styles["Normal"]
            )
        )

    elements.append(Spacer(1, 12))

    # Response
    elements.append(Paragraph("Response", styles["Heading2"]))

    for response in analysis["response"]:
        elements.append(
            Paragraph(
                f"{response["code"]} : {response["status"]}",
                styles["Normal"]
            )
        )

    # Build PDF
    doc.build(elements)