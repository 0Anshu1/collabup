import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, ArrowLeft } from 'lucide-react';
import StudentForm from './StudentForm';
import FacultyForm from './FacultyForm';
import StartupForm from './StartupForm';
import MentorForm from './MentorForm';
import { useAuth } from '../contexts/AuthContext';

type Role = 'student' | 'faculty' | 'startup' | 'mentor';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, type }: AuthModalProps) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuth();

  const renderForm = () => {
    if (type === 'login') {
      return (
        <form className="space-y-4" onSubmit={async (e) => {
          e.preventDefault();
          try {
            await signIn(email, password);
            onClose();
          } catch (err) {
            setError('Invalid email or password');
          }
        }}>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/25"
          >
            Log In
          </button>
        </form>
      );
    }

    if (!selectedRole) {
      return (
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-center text-white">Choose your role</h3>
          <div className="grid grid-cols-2 gap-4">
            {(['student', 'faculty', 'startup', 'mentor'] as Role[]).map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className="p-6 bg-[#1E293B] rounded-lg hover:bg-[#2D3B4F] transition-all duration-300 border border-gray-700 group"
              >
                <div className="text-gray-300 group-hover:text-white capitalize font-medium">{role}</div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    const FormComponent = {
      student: StudentForm,
      faculty: FacultyForm,
      startup: StartupForm,
      mentor: MentorForm,
    }[selectedRole];

    return (
      <div>
        <button
          onClick={() => setSelectedRole(null)}
          className="flex items-center text-gray-400 hover:text-gray-300 mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to roles
        </button>
        <FormComponent />
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#0F172A] p-6 text-left align-middle shadow-xl transition-all border border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-xl font-medium text-white">
              {type === 'login' ? 'Welcome Back' : 'Join CollabUp'}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
            {renderForm()}
          </div>
          {type === 'login' && (
            <p className="mt-4 text-sm text-center text-gray-400">
              Don't have an account?{' '}
              <button onClick={() => onClose()} className="text-blue-400 hover:text-blue-300">
                Sign up
              </button>
            </p>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}