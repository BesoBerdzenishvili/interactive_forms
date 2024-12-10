export interface User {
  id: number;
  name: string;
  email: string;
  lastSeen: string;
  status: "active" | "blocked";
}
