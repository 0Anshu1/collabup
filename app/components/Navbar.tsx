"use client"
import React from 'react';
import Link from 'next/link';
import { Search, ArrowLeft } from 'lucide-react';
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Home, Users, BookOpen, Rocket, GraduationCap, Handshake, Lightbulb } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A] border-b border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-blue-400 hover:scale-110 transition-transform duration-300">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search live projects"
              className="bg-[#1E293B] text-gray-300 pl-10 pr-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/25">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          {[
            ['Student Proj', '/student-projects'],
            ['Buddy Finder', '/buddy-finder'],
            ['Mentorship', '/mentorship'],
            ['Startup Proj', '/startup-proj'],
          ].map(([title, path]) => (
            <Link
              key={path}
              href={path}
              className="relative text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
            >
              {title}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;