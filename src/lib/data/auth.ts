import { AuthSession, UserRole } from './types';

// Demo users — replace with Supabase Auth in production
const DEMO_USERS = [
  {
    username: 'ohio-demo',
    password: 'autonops2025',
    userId: 'usr-001',
    userName: 'Chief Malone',
    email: 'malone@rioverdefd.gov',
    role: 'customer' as UserRole,
    accountId: 'acct-001',
    accountName: 'Rio Verde Fire Dept',
  },
  {
    username: 'admin',
    password: 'autonops2025',
    userId: 'usr-admin-001',
    userName: 'Bob Lee',
    email: 'bob.lee@autonops.us',
    role: 'admin' as UserRole,
    accountId: null,
    accountName: null,
  },
  {
    username: 'cfo',
    password: 'autonops2025',
    userId: 'usr-admin-002',
    userName: 'Josh Kibe',
    email: 'josh@autonops.us',
    role: 'cfo' as UserRole,
    accountId: null,
    accountName: null,
  },
];

export function authenticate(username: string, password: string): AuthSession | null {
  const user = DEMO_USERS.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return null;
  return {
    authenticated: true,
    userId: user.userId,
    userName: user.userName,
    email: user.email,
    role: user.role,
    accountId: user.accountId,
    accountName: user.accountName,
  };
}

const AUTH_KEY = 'autonops_session';

export function saveSession(session: AuthSession): void {
  sessionStorage.setItem(AUTH_KEY, JSON.stringify(session));
}

export function getSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  const raw = sessionStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    const session = JSON.parse(raw) as AuthSession;
    if (!session.authenticated) return null;
    return session;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  sessionStorage.removeItem(AUTH_KEY);
  // Also clear legacy key
  sessionStorage.removeItem('autonops_auth');
}

export function isAdmin(role: UserRole): boolean {
  return ['admin', 'cfo', 'operations', 'leadership'].includes(role);
}

export function isCustomer(role: UserRole): boolean {
  return role === 'customer';
}
