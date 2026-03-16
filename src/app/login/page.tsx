'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock } from 'lucide-react';

const DEMO_USER = 'ohio-demo';
const DEMO_PASS = 'autonops2025';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setError(false);
    setLoading(true);

    setTimeout(() => {
      if (username === DEMO_USER && password === DEMO_PASS) {
        sessionStorage.setItem('autonops_auth', 'true');
        router.push('/dashboard');
      } else {
        setError(true);
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      {/* Background effects */}
      <div className="absolute inset-0 animated-gradient opacity-20" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="gradient-orb w-[500px] h-[500px] bg-red-500/15 top-[-150px] right-[-100px]" />
        <div
          className="gradient-orb w-[400px] h-[400px] bg-blue-500/10 bottom-[-100px] left-[-100px]"
          style={{ animationDelay: '5s' }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="AutonOps"
            width={180}
            height={50}
            className="h-12 w-auto"
            priority
          />
        </div>

        {/* Card */}
        <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-white">Mission Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Authorized access only</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-sm text-red-400">
                Invalid credentials. Contact your Autonops administrator.
              </div>
            )}

            <button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>

          <p className="text-center text-slate-500 text-xs mt-6">
            Need access? Contact your Autonops representative.
          </p>
        </div>
      </div>
    </div>
  );
}
