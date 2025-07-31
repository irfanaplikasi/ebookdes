export interface User {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
