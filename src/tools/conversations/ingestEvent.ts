import logger from "../../utils/logger.js";
import services from "../../services/index.js";

export const ingestConversationEventDefinition = {
  name: "ingestConversationEvent",
  description: "Append a normalized conversation event into the persistent index.",
  inputSchema: {
    type: "object",
    properties: {
      threadId: { type: "string" },
      projectId: { anyOf: [{ type: "integer" }, { type: "string" }] },
      timestamp: { type: "string" },
      author: { type: "string" },
      channel: { type: "string" },
      content: { type: "string" },
      tags: { type: "array", items: { type: "string" } },
      metadata: { type: "object" }
    },
    required: ["threadId", "timestamp", "author", "content"]
  }
};

export async function handleIngestConversationEvent(input: any) {
  logger.info("=== ingestConversationEvent called ===");
  const res = await (services as any).ingestEvent(input);
  return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
}

export default handleIngestConversationEvent;
