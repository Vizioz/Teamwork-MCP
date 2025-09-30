# Governance

This repository follows a pragmatic governance model:

## Roles and Ownership

- CODEOWNERS define review responsibility for critical paths
- Maintainers approve releases and enforce policies

## Decision Records

- Significant changes should include a short Decision Record in PR description covering: context, options, decision, rationale, and impact

## CI/CD

- On PR: install, typecheck, build
- Future: lint, unit tests, security scanning

## Security

- Vulnerability reports via SECURITY policy
- No secrets in code; use repository/encrypted secrets

## Documentation

- README is entry point; docs folder for standards
- Keep examples updated when APIs change
