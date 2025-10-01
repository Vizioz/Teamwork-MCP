72-hour Monitoring Setup
========================

Prereqs
-------

- Teamwork credentials configured (env or .env)
- Tasklist ID available in `.teamwork` or passed to tool

Steps
-----

1. Review and edit `teamwork-72hour-monitoring/tasks.csv`
2. Create tasks via script or MCP tool
3. Track progress and update Meta·Mega status

Create Tasks (via MCP tool)
---------------------------

Use the `enqueueHandoff` tool to request Prime/Claude to ingest the CSV and create tasks via `createTask` in sequence.

Create Tasks (direct script)
----------------------------

Run `npm run monitoring:create` after setting `TEAMWORK_DOMAIN`, `TEAMWORK_USERNAME`, `TEAMWORK_PASSWORD`, and ensuring `.teamwork` includes `TASKLISTID`.