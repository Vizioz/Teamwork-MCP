Conversation Review Standard
============================

All client projects undergo persistent, full‑scope conversation review. Conversation data is indexed, synthesized, and integrated into agent learning loops to enable compound insight, faster execution, and elimination of reset‑to‑zero.

Principles
----------

- Persistence: capture across channels; durable storage
- Full scope: include planning, execution, and retrospectives
- Synthesis: structured summaries with decisions, risks, next steps
- Integration: feed insights back into orchestration and tasking
- Privacy & Security: follow SECURITY policy; PII handling; least privilege

Artifacts
---------

- Raw event index (JSONL)
- Thread syntheses (markdown)
- Decision deltas (ADR links)

APIs & Tools
------------

- ingestConversationEvent: append normalized event into index
- synthesizeConversationThread: produce structured summary and decisions

Operationalization
------------------

- Run periodically or on triggers (end of day, stage transitions)
- Evidence Binder receives syntheses; Orchestration pulls insights into handoffs