import logger from "../../utils/logger.js";
import services from "../../services/index.js";

export const synthesizeConversationThreadDefinition = {
  name: "synthesizeConversationThread",
  description: "Synthesize a conversation thread into a structured summary and write to Evidence Binder.",
  inputSchema: {
    type: "object",
    properties: {
      threadId: { type: "string" }
    },
    required: ["threadId"]
  }
};

export async function handleSynthesizeConversationThread(input: any) {
  logger.info("=== synthesizeConversationThread called ===");
  const res = await (services as any).synthesizeThread(input.threadId);
  return { content: [{ type: "text", text: JSON.stringify(res, null, 2) }] };
}

export default handleSynthesizeConversationThread;
