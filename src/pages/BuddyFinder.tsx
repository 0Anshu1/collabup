import React, { useState } from 'react';
import { Search, Filter, BookOpen, Code, Users, Star, MapPin, MessageCircle, User } from 'lucide-react';

interface BuddyProfile {
  id: number;
  name: string;
  avatar: string;
  domain: string;
  level: string;
  skills: string[];
  location: string;
  matchScore: number;
  hackathons?: string[];
}

const indianHackathons = [
  "Smart India Hackathon",
  "HackVerse",
  "HackBout",
  "InOut Hackathon",
  "HackCBS",
  "HackRush",
  "CodeUtsava",
  "HackIndia",
  "DevsHouse"
];

const mockProfiles: BuddyProfile[] = [
  {
    id: 1,
    name: "Anshu Saini",
    avatar: "anshu.jpg",
    domain: "Web Development",
    level: "Intermediate",
    skills: ["React", "Node.js", "TypeScript", "Tailwind CSS"],
    location: "Chennai, India",
    matchScore: 95,
    hackathons: ["Smart India Hackathon", "DevsHouse"]
  },
  {
    id: 2,
    name: "Prince Maurya",
    avatar: "prince.png",
    domain: "UX Design",
    level: "Advanced",
    skills: ["Figma", "UI Design", "User Research"],
    location: "Chennai, India",
    matchScore: 88,
    hackathons: ["HackCBS", "DevsHouse"]
  }
];

const BuddyFinder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedHackathon, setSelectedHackathon] = useState('all');

  const filteredProfiles = mockProfiles.filter(profile => {
    const matchesDomain = selectedDomain === 'all' || profile.domain.toLowerCase() === selectedDomain;
    const matchesLevel = selectedLevel === 'all' || profile.level.toLowerCase() === selectedLevel.toLowerCase();
    const matchesHackathon = selectedHackathon === 'all' || 
      (profile.hackathons && profile.hackathons.includes(selectedHackathon));
    
    return matchesDomain && matchesLevel && matchesHackathon;
  });

  return (
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12 pt-6">
          <h1 className="text-4xl font-bold text-white mb-4">
            Buddy Finder
          </h1>
          <p className="text-lg text-gray-400">
            Find the perfect study partner based on your interests and skill level
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, skills, or location..."
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <select
                  className="appearance-none px-4 py-2 pr-8 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                >
                  <option value="all">Domains</option>
                  <option value="web development">Web Development</option>
                  <option value="ux design">UX Design</option>
                  <option value="artificial intelligence">Artificial Intelligence</option>
                  <option value="machine learning">Machine Learning</option>
                  <option value="blockchain">Blockchain</option>
                  <option value="iot">IOT</option>
                  <option value="cyber security">Cyber Security</option>
                </select>
              </div>
              <div className="relative">
                <select
                  className="appearance-none px-4 py-2 pr-8 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  <option value="all">Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="relative">
                <select
                  className="appearance-none px-4 py-2 pr-8 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={selectedHackathon}
                  onChange={(e) => setSelectedHackathon(e.target.value)}
                >
                  <option value="all">Hackathons</option>
                  {indianHackathons.map((hackathon) => (
                    <option key={hackathon} value={hackathon}>
                      {hackathon}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Buddy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <div key={profile.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-gray-700">
              <div className="relative">
                <div className="absolute top-4 right-4 bg-gray-900 px-3 py-1 rounded-full shadow-md border border-gray-700">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400" size={16} fill="currentColor" />
                    <span className="font-semibold text-gray-200">{profile.matchScore}%</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-200">{profile.name}</h3>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin size={16} />
                      <span className="text-sm">{profile.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={16} className="text-indigo-400" />
                    <span className="font-medium text-gray-300">{profile.domain}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code size={16} className="text-indigo-400" />
                    <span className="text-gray-400">{profile.level}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-indigo-300 rounded-full text-sm border border-gray-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {profile.hackathons && profile.hackathons.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-2">Hackathons:</div>
                    <div className="flex flex-wrap gap-2">
                      {profile.hackathons.map((hackathon, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-indigo-900/50 text-indigo-300 rounded-full text-sm border border-indigo-800"
                        >
                          {hackathon}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  <MessageCircle size={20} />
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    
  );
};

export default BuddyFinder;