export interface ConversationEvent {
  id?: string;
  threadId: string;
  projectId?: number | string;
  timestamp: string; // ISO8601
  author: string; // agent/user id or name
  channel?: string; // e.g., slack, notion, email
  content: string; // raw text
  tags?: string[];
  metadata?: Record<string, unknown>;
}
