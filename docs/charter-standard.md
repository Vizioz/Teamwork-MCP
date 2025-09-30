# Charter Standard

This repository adopts a Charter Standard and Academic Framework to ensure quality, repeatability, and stakeholder trust across code, data, and governance.

## Principles

- Clarity of objectives and scope
- Evidence-based decision making and auditability
- Hypothesis-driven analysis and testability
- MECE structuring and clean architecture boundaries
- Security-by-default and least privilege
- Reproducibility (deterministic builds, pinned toolchains)
- Observability (logs, metrics, traceability)

## Governance Artifacts

- CONTRIBUTING: Contribution pathways, review process, DCO/CLA notes
- CODE_OF_CONDUCT: Inclusive collaboration policy
- SECURITY: Reporting and disclosure practices
- CODEOWNERS: Ownership clarity and review routing
- CI/CD: Build, typecheck, test, and security checks

## Delivery Framework (McKinsey/Bain/BCG-inspired)

- Problem framing: objective, constraints, KPIs
- Hypotheses and structured workplan
- Data collection with provenance and quality checks
- Insight synthesis and decision memo
- Implementation plan and change management

## Engineering Practices

- TypeScript strictness; no implicit any
- Lint/typecheck required in CI before merge
- Tests cover critical paths; snapshot external contracts where possible
- Secrets in env/CI secrets, never in code
- Minimal privileges for tokens/keys

See `docs/governance.md` for operational details and `README.md` for usage.
