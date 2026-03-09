export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface AuthUser {
  type: "github" | "email";
  id: string;
  name?: string;
  avatar?: string;
  email?: string;
  token?: string;
}

export interface ConversationState {
  messages: ChatMessage[];
  isStreaming: boolean;
  existingMarkets: Record<string, string>;
  marketsLoaded: boolean;
  finalOutput: string | null;
}
