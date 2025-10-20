import logger from "../../utils/logger.js";
import services from "../../services/index.js";
import { HandoffEvent } from "../../models/HandoffEvent.js";

export const enqueueHandoffDefinition = {
  name: "enqueueHandoff",
  description: "Enqueue a multi-agent handoff event (Notion Relay, Prime, Claude).",
  inputSchema: {
    type: "object",
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      hypothesis: { type: "string" },
      targets: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            channel: { type: "string" }
          },
          required: ["name"]
        }
      },
      priority: { type: "string", enum: ["low", "normal", "high"] },
      context: {
        type: "object",
        properties: {
          projectId: { type: "integer" },
          taskId: { type: "integer" },
          entity: { type: "string" },
          metadata: { type: "object" }
        }
      }
    },
    required: ["title", "targets"],
    description: "Handoff event for orchestrated collaboration"
  },
  annotations: {
    title: "Enqueue Multi-Agent Handoff",
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false
  }
};

export async function handleEnqueueHandoff(input: any) {
  logger.info("=== enqueueHandoff tool called ===");
  logger.info(`Input: ${JSON.stringify(input || {})}`);

  const event: HandoffEvent = {
    title: input.title,
    description: input.description,
    hypothesis: input.hypothesis,
    targets: input.targets || [],
    priority: input.priority || 'normal',
    context: input.context
  };

  try {
    const result = await (services as any).enqueueHandoff(event);
    return {
      content: [{ type: "text", text: JSON.stringify({ ok: true, id: result.id }, null, 2) }]
    };
  } catch (error: any) {
    logger.error(`enqueueHandoff error: ${error.message}`);
    return {
      content: [{ type: "text", text: `enqueueHandoff failed: ${error.message}` }]
    };
  }
}

export default handleEnqueueHandoff;
