import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function MentorForm() {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    expertiseAreas: '',
    yearsOfExperience: '',
    linkedinUrl: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(formData.email, formData.password, 'mentor', {
        fullName: formData.fullName,
        expertiseAreas: formData.expertiseAreas,
        yearsOfExperience: formData.yearsOfExperience,
        linkedinUrl: formData.linkedinUrl
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
        <label className="block text-sm font-medium text-gray-300">Full Name</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          value={formData.fullName}
          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
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
        <label className="block text-sm font-medium text-gray-300">Expertise Areas</label>
        <textarea
          className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          value={formData.expertiseAreas}
          onChange={(e) => setFormData(prev => ({ ...prev, expertiseAreas: e.target.value }))}
          placeholder="e.g., Machine Learning, Web Development, Business Strategy"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Years of Experience</label>
        <input
          type="number"
          className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          value={formData.yearsOfExperience}
          onChange={(e) => setFormData(prev => ({ ...prev, yearsOfExperience: e.target.value }))}
          min="0"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">LinkedIn Profile</label>
        <input
          type="url"
          className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          value={formData.linkedinUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
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