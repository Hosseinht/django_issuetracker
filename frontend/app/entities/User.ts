export interface User {
  id?: number;
  email: string;
}

export interface CheckUser {
  user: User;
  isAuthenticated: boolean;
}
