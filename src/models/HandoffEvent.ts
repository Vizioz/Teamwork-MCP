export interface HandoffTarget {
  name: string; // e.g., "NotionRelay", "PrimeAgent", "ClaudeAgent"
  channel?: string; // e.g., page id, queue name
}

export interface HandoffPayloadContext {
  projectId?: number;
  taskId?: number;
  entity?: string;
  metadata?: Record<string, unknown>;
}

export interface HandoffEvent {
  id?: string;
  title: string;
  description?: string;
  hypothesis?: string;
  targets: HandoffTarget[];
  priority?: 'low' | 'normal' | 'high';
  createdAt?: string;
  context?: HandoffPayloadContext;
}
