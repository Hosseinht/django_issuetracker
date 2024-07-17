export type Status = "OPEN" | "IN_PROGRESS" | "CLOSED";

export interface Issue {
  id: number;
  title: string;
  description: string;
  status: Status;
  created_at: string;
  updated_at: string;
}
