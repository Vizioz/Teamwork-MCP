FROM debian:bullseye-slim

ENV DEBIAN_FRONTEND=noninteractive \
    GLAMA_VERSION="0.2.0" \
    PATH="/home/service-user/.local/bin:${PATH}"

RUN (groupadd -r service-user)
RUN (useradd -u 1987 -r -m -g service-user service-user)
RUN (mkdir -p /home/service-user/.local/bin /app)
RUN (chown -R service-user:service-user /home/service-user /app)
RUN (apt-get update)
RUN (apt-get install -y --no-install-recommends build-essential curl wget software-properties-common libssl-dev zlib1g-dev git)
RUN (rm -rf /var/lib/apt/lists/*)
RUN (curl -fsSL https://deb.nodesource.com/setup_22.x | bash -)
RUN (apt-get install -y nodejs)
RUN (apt-get clean)
RUN (npm install -g mcp-proxy@2.10.6)
RUN (npm install -g pnpm@9.15.5)
RUN (npm install -g bun@1.1.42)
RUN (node --version)
RUN (curl -LsSf https://astral.sh/uv/install.sh | UV_INSTALL_DIR="/usr/local/bin" sh)
RUN (uv python install 3.13 --default --preview)
RUN (ln -s $(uv python find) /usr/local/bin/python)
RUN (python --version)
RUN (apt-get clean)
RUN (rm -rf /var/lib/apt/lists/*)
RUN (rm -rf /tmp/*)
RUN (rm -rf /var/tmp/*)
RUN (su - service-user -c "uv python install 3.13 --default --preview && python --version")

# Comment next two lines and uncomment git clone lines to use repository or vice versa
COPY . /app
RUN chown -R service-user:service-user /app
USER service-user
WORKDIR /app
# RUN git clone https://github.com/Vizioz/Teamwork-MCP .
# RUN git checkout main

RUN (npm install)
RUN (npm run build)

CMD ["mcp-proxy","node","build/index.js"]
