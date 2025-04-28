# Dockerize for Teamwork-MCP

Build the Docker image:
```bash
docker build -t teamwork-mcp .
```

Run the Docker container:
```bash
docker run -it --rm -e MCP_PROXY_DEBUG=true -e DOMAIN=my-company.com -e USER=admin@company.com -e PASS=topsecret localhost/teamwork-mcp
```