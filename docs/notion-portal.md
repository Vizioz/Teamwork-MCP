Notion Portal & Relay
=====================

Databases
---------

Agents Dashboard (properties)
- Agent (Select): Prime, Clawed, Ancillary
- Task (Title)
- Charter Stage (Select): Intake, In-Flight, Review, Complete
- Status (Select): G, Y, R
- Due (Date & Time, America/New_York)
- Log (Relation → Agent Logs)

Agent Logs (properties)
- Timestamp (Date & Time)
- Agent (Relation → Agents Dashboard)
- Action Description (Text)
- Version (Text, e.g., v1.0)

Charter Checkpoint (template)
- Pilot Principle checklist
- Integrity Override flag

Relay Webhooks
--------------

- Prime → POST /webhook/prime
- Clawed → POST /webhook/clawed
- Ancillary → POST /webhook/ancillary

Payload (example)
```json
{
  "task_id": "<notion_row_id>",
  "agent": "Prime",
  "action": "Intake",
  "timestamp": "2025-09-30T15:33:00Z",
  "version": "v1.0"
}
```

Server
------

- Start local webhook server: `npm run relay:serve`
- The server enqueues handoffs consumed by the dispatcher.
