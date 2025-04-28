FROM debian:bullseye-slim

ENV DEBIAN_FRONTEND=noninteractive \
    # Add npm global bin to PATH for service-user
    PATH="/home/service-user/.npm-global/bin:/home/service-user/.local/bin:${PATH}"

# Create service user and set up directories
RUN groupadd -r service-user && \
    useradd -u 1987 -r -m -g service-user service-user && \
    # Create app dir and npm global dir owned by user
    mkdir -p /home/service-user/.local/bin /app /home/service-user/.npm-global && \
    chown -R service-user:service-user /home/service-user /app

# Install Node.js and system dependencies as root
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get update && \
    apt-get install -y nodejs npm && \
    node --version && \
    npm --version && \
    # mcp-proxy install removed from root steps
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Switch to service-user BEFORE installing global packages for that user
USER service-user
WORKDIR /home/service-user

# Configure npm to use the user's global directory
RUN npm config set prefix '/home/service-user/.npm-global'

# Install mcp-proxy globally for the service-user
RUN npm install -g mcp-proxy@2.10.6

WORKDIR /app

CMD ["mcp-proxy", "npx", "-y", "@vizioz/teamwork-mcp"]
