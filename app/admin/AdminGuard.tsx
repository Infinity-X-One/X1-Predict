// components/AdminGuard.tsx

'use client';

import React, { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export const AdminGuard: React.FC<Props> = ({ children }) => {
  const [accessGranted, setAccessGranted] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  const handleAccess = () => {
    if (token === 'infinityxadmin') {
      setAccessGranted(true);
    } else {
      alert('❌ Invalid access token');
    }
  };

  if (accessGranted) return <>{children}</>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white space-y-4">
      <h1 className="text-2xl font-bold">🔐 Admin Access Required</h1>
      <input
        type="password"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="bg-black border border-white px-4 py-2 rounded text-white"
        placeholder="Enter admin token"
      />
      <button
        onClick={handleAccess}
        className="bg-white text-black px-4 py-2 rounded-xl shadow-md hover:bg-gray-200"
      >
        ✅ Enter
      </button>
    </div>
  );
};
