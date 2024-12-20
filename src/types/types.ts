export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  is_blocked: boolean;
  is_admin: boolean;
}

export interface TemplateData {
  // id: number;
  title: string;
  description: string;
  likes: string[];
  tags: string[];
  topic: string;
  creator_id: string;
  image_url: string;
  who_can_fill: string[];
}

export interface Question {
  id: string;
  title: string;
  description: string;
  order: number;
  type: string;
}
