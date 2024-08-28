import { User } from "@/app/entities/User";

export type Status = "OPEN" | "IN_PROGRESS" | "CLOSED";

export interface Issue {
  id: number;
  user?: User;
  title: string;
  description: string;
  status: Status;
  created_at: string;
  updated_at: string;
}
