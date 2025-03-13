import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function FacultyForm() {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    institute: '',
    email: '',
    facultyId: null as File | null,
    researchAreas: '',
    password: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setFormData(prev => ({ ...prev, facultyId: file }));
    }
  };

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(formData.email, formData.password, 'faculty', {
        fullName: formData.fullName,
        institute: formData.institute,
        facultyId: formData.facultyId,
        researchAreas: formData.researchAreas
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
        <label className="block text-sm font-medium text-gray-300">Institute</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          value={formData.institute}
          onChange={(e) => setFormData(prev => ({ ...prev, institute: e.target.value }))}
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
        <label className="block text-sm font-medium text-gray-300">Faculty ID Card (PDF)</label>
        <div className="mt-1 flex items-center justify-center w-full">
          <label className="w-full flex flex-col items-center px-4 py-6 bg-[#1E293B] text-gray-300 rounded-lg border-2 border-gray-600 border-dashed cursor-pointer hover:border-blue-500 hover:bg-[#2D3B4F] transition-all duration-300">
            <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-sm text-gray-400">Upload your faculty ID card</span>
            <span className="text-xs text-gray-500 mt-1">PDF only, max 5MB</span>
            <input
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Research Areas</label>
        <textarea
          className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          value={formData.researchAreas}
          onChange={(e) => setFormData(prev => ({ ...prev, researchAreas: e.target.value }))}
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