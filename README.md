# APIRecon

APIRecon is a web-based Postman Collection Analyzer built using React and Flask. It helps developers and security professionals analyze Postman collections and extract useful insights such as API endpoints, authentication methods, variables, headers, sensitive data exposure, and PDF reports.

---

## Features

- Upload Postman Collections
- Collection Summary
- HTTP Method Analysis
- Authentication Analysis
- Variable Detection
- Endpoint Discovery
- Header Analysis
- Query Parameter Analysis
- Sensitive Data Detection
- Response Analysis
- Search Functionality
- PDF Report Generation
- Fully Responsive UI
- Dark Dashboard Interface

---

## Sensitive Data Detection

APIRecon detects potentially sensitive information in:

- Variables
- Headers
- Query Parameters
- Request Bodies

### Supported Keywords

```text
password
token
access_token
api_key
client_id
client_secret
authorization
jwt
secret
```

---

## Tech Stack

### Frontend

- React
- Tailwind CSS
- Vite
- React Icons

### Backend

- Flask
- Flask-CORS
- ReportLab

---

## Supported Postman Features

| Feature | Supported |
|--------|--------|
| Variables | Yes |
| Headers | Yes |
| Query Parameters | Yes |
| Raw JSON Body | Yes |
| URL Encoded Body | Yes |
| Authentication | Yes |
| Nested Folders | Yes |
| Responses | Yes |
| Disabled Parameters | Ignored |
| Sensitive Data Detection | Yes |

---

## Example Output

```text
Collection Name: API Collection

Total Requests: 25
Total Folders: 6

Methods:
- GET: 10
- POST: 8
- PUT: 2
- DELETE: 3
- PATCH: 2

Sensitive Findings:
- password
- api_key
- client_secret
- access_token
```

---

## PDF Reports

APIRecon generates downloadable PDF reports containing:
 
- Collection Information
- Request Summary
- Method Breakdown
- Authentication Statistics
- Variables
- Headers
- Query Parameters
- Sensitive Data Findings
- Response Information
- Endpoint Details

---

## Deployment

- Frontend: Vercel
- Backend: Render

---

## Future Improvements

- OpenAPI Support
- Swagger Support
- Risk Scoring
- Security Recommendations
- CSV Export
- Collection Comparison
- User Authentication

---

## Security Notice

APIRecon performs static analysis on uploaded Postman collections. It does not execute any user-provided code or make requests to external APIs.

---

## License

MIT License

---

## Author

Developed by **Hafeez Choudhary**

GitHub: `https://github.com/hafeezchoudhary`