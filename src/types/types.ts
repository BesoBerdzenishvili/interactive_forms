export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  is_blocked: boolean;
  is_admin: boolean;
}

export interface TemplateData {
  id: number;
  title: string;
  description: string;
  likes: string[];
  tags: string[];
  topic: string;
  creator_id: number;
  image_url: string;
  who_can_fill: number[];
  users_who_filled: number[];
  filled_forms: number;
}

export interface Question {
  id: number;
  title: string;
  description: string;
  form_id: number;
  order: number;
  type: string;
}

export interface Comment {
  id: number;
  created_at: string;
  form_id: number;
  author_id: number;
  text: string;
}

export interface Answer {
  form_id: number;
  template_title: string;
  author_id: number;
  author_name: string;
  title: string;
  description: string;
  answer: string;
  send_id: string;
  order: number;
  type: string;
}
