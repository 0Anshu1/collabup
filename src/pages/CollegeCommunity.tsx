import React, { useState } from 'react';
import { Users, MessageSquare, Calendar, Trophy } from 'lucide-react';
import GroupChat from '../components/GroupChat';

const CollegeCommunity = () => {
  const [selectedGroup, setSelectedGroup] = useState<any>(null);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">College Community</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-[#1E293B] p-6 rounded-xl">
          <Users className="w-8 h-8 text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">500+</h3>
          <p className="text-gray-400">Active Students</p>
        </div>
        <div className="bg-[#1E293B] p-6 rounded-xl">
          <MessageSquare className="w-8 h-8 text-green-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">20+</h3>
          <p className="text-gray-400">Study Groups</p>
        </div>
        <div className="bg-[#1E293B] p-6 rounded-xl">
          <Calendar className="w-8 h-8 text-purple-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">10+</h3>
          <p className="text-gray-400">Monthly Events</p>
        </div>
        <div className="bg-[#1E293B] p-6 rounded-xl">
          <Trophy className="w-8 h-8 text-yellow-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">10+</h3>
          <p className="text-gray-400">Success Stories</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#1E293B] p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6">Upcoming Events-Vashist TechFest</h2>
          <div className="space-y-6">
            {[
              {
                title: "Tech Talk: AI in Education",
                date: "March 22, 2025",
                time: "3:00 PM",
                location: "Senate Hall"
              },
              {
                title: "Student Project Showcase",
                date: "March 23, 2025",
                time: "2:00 PM",
                location: "H05"
              },
              {
                title: "Startup Expo",
                date: "March 25, 2025",
                time: "5:00 PM",
                location: "Old Library"
              }
            ].map((event, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-gray-400">{event.date} at {event.time}</p>
                <p className="text-gray-400">{event.location}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1E293B] p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6">Active Study Groups</h2>
          <div className="space-y-6">
            {[
              {
                name: "Web Development",
                members: 28,
                topic: "MERN Stack"
              },
              {
                name: "Data Science",
                members: 35,
                topic: "Machine Learning"
              },
              {
                name: "Mobile App Development",
                members: 22,
                topic: "React Native"
              }
            ].map((group, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-[#0F172A] rounded-lg">
                <div>
                  <h3 className="font-semibold">{group.name}</h3>
                  <p className="text-gray-400">{group.topic}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">{group.members} members</p>
                  <button 
                    onClick={() => setSelectedGroup(group)}
                    className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
                  >
                    Join Group
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedGroup && (
        <GroupChat 
          group={selectedGroup} 
          onClose={() => setSelectedGroup(null)} 
        />
      )}
    </div>
  );
};

export default CollegeCommunity