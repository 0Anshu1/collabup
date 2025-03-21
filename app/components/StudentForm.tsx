import React from 'react';

export default function StudentForm() {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">Full Name</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Institute Name</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="University"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Email</label>
        <input
          type="email"
          className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">College ID Card (PDF)</label>
        <div className="mt-1 flex items-center justify-center w-full">
          <label className="w-full flex flex-col items-center px-4 py-6 bg-[#1E293B] text-gray-300 rounded-lg border-2 border-gray-600 border-dashed cursor-pointer hover:border-blue-500 hover:bg-[#2D3B4F] transition-all duration-300">
            <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-sm text-gray-400">Upload your college ID card</span>
            <span className="text-xs text-gray-500 mt-1">PDF only, max 5MB</span>
            <input
              type="file"
              className="hidden"
              accept=".pdf"
            />
          </label>
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Coding Profiles</label>
        <input
          type="url"
          placeholder="LeetCode Profile URL"
          className="block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="url"
          placeholder="CodeForces Profile URL"
          className="block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">LinkedIn Profile</label>
        <input
          type="url"
          className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://linkedin.com/in/..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">GitHub Profile</label>
        <input
          type="url"
          className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://github.com/..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Password</label>
        <input
          type="password"
          className="mt-1 block w-full rounded-lg bg-[#1E293B] border-gray-600 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="••••••••"
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