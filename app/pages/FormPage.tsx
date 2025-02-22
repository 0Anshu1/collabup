"use client"
import React, { useState } from 'react';
import { UserProfile } from '@clerk/nextjs';
import StudentForm from '../components/StudentForm';
import FacultyForm from '../components/FacultyForm';
import MentorForm from '../components/MentorForm';
import StartupForm from '../components/StartupForm';

type Role = 'student' | 'faculty' | 'mentor' | 'startup' | null;

const FormPage = () => {
  const [selectedRole, setSelectedRole] = useState<Role>(null);

  const renderForm = () => {
    switch (selectedRole) {
      case 'student':
        return <StudentForm />;
      case 'faculty':
        return <FacultyForm />;
      case 'mentor':
        return <MentorForm />;
      case 'startup':
        return <StartupForm />;
      default:
        return null;
    }
  };

  if (selectedRole) {
    return (
      <div className="container mx-auto px-4 py-8">
        {renderForm()}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#1E293B] p-8 rounded-xl shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Choose Your Role</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { role: 'student', label: 'Student', color: 'blue' },
            { role: 'faculty', label: 'Faculty', color: 'green' },
            { role: 'mentor', label: 'Mentor', color: 'yellow' },
            { role: 'startup', label: 'Startup', color: 'purple' }
          ].map(({ role, label, color }) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role as Role)}
              className={`p-4 rounded-lg border-2 border-${color}-500/50 bg-${color}-500/10 
                hover:bg-${color}-500/20 transition-all duration-300 flex flex-col items-center justify-center gap-2`}
            >
              <span className={`text-${color}-400 font-semibold`}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormPage;
