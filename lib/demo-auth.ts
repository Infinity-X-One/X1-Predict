// Simple demo authentication system
export interface DemoUser {
  username: string
  password: string
  role: "user" | "admin"
  displayName: string
}

export const demoUsers: DemoUser[] = [
  {
    username: "demo",
    password: "demo123",
    role: "user",
    displayName: "Demo User",
  },
  {
    username: "admin",
    password: "admin123",
    role: "admin",
    displayName: "Administrator",
  },
  {
    username: "test",
    password: "test123",
    role: "user",
    displayName: "Test User",
  },
  {
    username: "user1",
    password: "password",
    role: "user",
    displayName: "User One",
  },
]

export function authenticateUser(username: string, password: string): DemoUser | null {
  const user = demoUsers.find((u) => u.username === username && u.password === password)
  return user || null
}

export function isAdmin(user: DemoUser | null): boolean {
  return user?.role === "admin"
}
