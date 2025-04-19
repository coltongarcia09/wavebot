import React from 'react';
import { useForm } from 'react-hook-form';
import { LogIn } from 'lucide-react';
import { useAuthStore } from '../lib/store';

interface AuthFormData {
  email: string;
  password: string;
}

export function Auth() {
  const { register, handleSubmit } = useForm<AuthFormData>();
  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit = (data: AuthFormData) => {
    // In a real app, this would make an API call
    setUser({ email: data.email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <LogIn className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold text-white">Sign in to TheWaveBot</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              {...register('password')}
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}