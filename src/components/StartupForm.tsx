import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function StartupForm() {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    startupName: '',
    founderName: '',
    email: '',
    website: '',
    industry: '',
    description: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(formData.email, formData.password, 'startup', {
        startupName: formData.startupName,
        founderName: formData.founderName,
        website: formData.website,
        industry: formData.industry,
        description: formData.description
      });
      // Close the modal and reset form
      const closeButton = document.querySelector('[aria-label="Close"]');
      if (closeButton instanceof HTMLElement) {
        closeButton.click();
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-100 border border-red-200 rounded-lg">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-300">Startup Name</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder=""
          value={formData.startupName}
          onChange={(e) => setFormData(prev => ({ ...prev, startupName: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Founder Name</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          value={formData.founderName}
          onChange={(e) => setFormData(prev => ({ ...prev, founderName: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Email</label>
        <input
          type="email"
          className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Website</label>
        <input
          type="url"
          className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          value={formData.website}
          onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Industry</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          value={formData.industry}
          onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Company Description</label>
        <textarea
          className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Password</label>
        <input
          type="password"
          className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/25"
      >
        Create Account
      </button>
    </form>
  );
}