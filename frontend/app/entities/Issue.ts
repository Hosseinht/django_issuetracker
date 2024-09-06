import { User } from "@/app/entities/User";

export type Status = "OPEN" | "IN_PROGRESS" | "CLOSED";
export type Priority = "HIGH" | "MEDIUM" | "LOW";

export interface Issue {
  id: number;
  user?: User;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  created_at: string;
  updated_at: string;
}
