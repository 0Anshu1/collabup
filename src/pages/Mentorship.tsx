import React, { useState } from 'react';
import { Search, Filter, BookOpen, Code, Star, MapPin, MessageCircle, ChevronDown, Calendar, Clock, Video, X, PartyPopper } from 'lucide-react';

interface Mentor {
  id: number;
  name: string;
  imageUrl: string;
  domain: string;
  pricing: string;
  experience: number;
  location: string;
  matchScore: number;
  skills: string[];
}
interface BookingDetails {
    date: string;
    timeSlot: string;
    platform: string;
  }
const domains = [
  'Full Stack Development',
  'Frontend Development',
  'Backend Development',
  'Mobile Development',
  'DevOps',
  'Cloud Computing',
  'Data Science',
  'Machine Learning',
  'Artificial Intelligence',
  'Blockchain',
  'Cybersecurity',
  'UI/UX Design'
];

const priceRanges = [
  '2000-5000',
  '5000-10000',
  '10000-15000',
  '15000-20000',
  '20000+'
];

const experienceYears = [2, 3, '3+'];

const platforms = ['Google Meet', 'Zoom', 'Microsoft Teams', 'Skype'];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
];
const mentors: Mentor[] = [
  {
    id: 1,
    name: "Anshu Saini",
    domain: "Full Stack Development",
    pricing: "5000-10000",
    experience: 3,
    imageUrl: "anshu.jpg",
    location: "Bangalore, India",
    matchScore: 95,
    skills: ["React", "Node.js", "TypeScript", "MongoDB"]
  },
  {
    id: 2,
    name: "Prince Maurya",
    domain: "UI/UX Design",
    pricing: "10000-15000",
    experience: 3,
    imageUrl: "prince.png",
    location: "Mumbai, India",
    matchScore: 88,
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"]
  }
];

function Mentorship() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedExperience, setSelectedExperience] = useState<string | number>('');
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
    const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
      date: '',
      timeSlot: '',
      platform: ''
    });
  
    const filteredMentors = mentors.filter(mentor => {
      const searchMatch = searchTerm === '' || 
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        mentor.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const domainMatch = !selectedDomain || mentor.domain === selectedDomain;
      const priceMatch = !selectedPrice || mentor.pricing === selectedPrice;
      const experienceMatch = !selectedExperience || 
        (selectedExperience === '3+' ? mentor.experience >= 3 : mentor.experience === selectedExperience);
      
      return searchMatch && domainMatch && priceMatch && experienceMatch;
    });
  
    const handleBookSession = (mentor: Mentor) => {
      setSelectedMentor(mentor);
      setIsBookingModalOpen(true);
    };
  
    const handleConfirmBooking = () => {
      if (bookingDetails.date && bookingDetails.timeSlot && bookingDetails.platform) {
        setIsBookingModalOpen(false);
        setIsConfirmationModalOpen(true);
      }
    };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12 pt-6">
        <h1 className="text-4xl font-bold text-white mb-4">
          Find Your Perfect Mentor
        </h1>
        <p className="text-lg text-gray-400">
          Connect with expert mentors based on your learning goals
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
            <div className="relative inline-block">
              <div className="relative">
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="appearance-none w-48 pl-4 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
                >
                  <option value="">All Domains</option>
                  {domains.map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
            <div className="relative inline-block">
              <div className="relative">
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="appearance-none w-48 pl-4 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
                >
                  <option value="">All Prices</option>
                  {priceRanges.map((range) => (
                    <option key={range} value={range}>
                      ₹{range}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
            <div className="relative inline-block">
              <div className="relative">
                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="appearance-none w-48 pl-4 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
                >
                  <option value="">All Experience</option>
                  {experienceYears.map((year) => (
                    <option key={year} value={year}>
                      {year} {typeof year === 'number' ? 'Years' : ' Years'}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <div key={mentor.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-gray-700">
            <div className="relative">
              <div className="absolute top-4 right-4 bg-gray-900 px-3 py-1 rounded-full shadow-md border border-gray-700">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-400" size={16} fill="currentColor" />
                  <span className="font-semibold text-gray-200">{mentor.matchScore}%</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={mentor.imageUrl}
                  alt={mentor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-200">{mentor.name}</h3>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={16} />
                    <span className="text-sm">{mentor.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={16} className="text-indigo-400" />
                  <span className="font-medium text-gray-300">{mentor.domain}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code size={16} className="text-indigo-400" />
                  <span className="text-gray-400">{mentor.experience} Years Experience</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-indigo-300 rounded-full text-sm border border-gray-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-2">Price Range:</div>
                <span className="px-3 py-1 bg-indigo-900/50 text-indigo-300 rounded-full text-sm border border-indigo-800">
                  ₹{mentor.pricing}
                </span>
              </div>

              <button 
                    onClick={() => handleBookSession(mentor)}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <MessageCircle size={20} />
                    Book Session
                  </button>
            </div>
          </div>
        ))}
      </div>
      {/* Booking Modal */}
      {isBookingModalOpen && selectedMentor && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-white">Book Session with {selectedMentor.name}</h3>
                  <button 
                    onClick={() => setIsBookingModalOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Select Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="date"
                        value={bookingDetails.date}
                        onChange={(e) => setBookingDetails({...bookingDetails, date: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Select Time Slot</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 text-gray-400" size={20} />
                      <select
                        value={bookingDetails.timeSlot}
                        onChange={(e) => setBookingDetails({...bookingDetails, timeSlot: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="">Select a time slot</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Select Platform</label>
                    <div className="relative">
                      <Video className="absolute left-3 top-3 text-gray-400" size={20} />
                      <select
                        value={bookingDetails.platform}
                        onChange={(e) => setBookingDetails({...bookingDetails, platform: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="">Select a platform</option>
                        {platforms.map((platform) => (
                          <option key={platform} value={platform}>{platform}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmBooking}
                    disabled={!bookingDetails.date || !bookingDetails.timeSlot || !bookingDetails.platform}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed mt-6"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Confirmation Modal */}
          {isConfirmationModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700 text-center">
                <div className="flex justify-center mb-4">
                  <PartyPopper size={48} className="text-yellow-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Thanks for Connecting! 🎉</h3>
                <p className="text-gray-300 mb-6">
                  Our mentors will connect with you on {bookingDetails.date} at {bookingDetails.timeSlot} via {bookingDetails.platform}
                </p>
                <button
                  onClick={() => setIsConfirmationModalOpen(false)}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
  );
}

export default Mentorship;