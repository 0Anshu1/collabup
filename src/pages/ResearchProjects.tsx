import React, { useState } from 'react';
import { FlaskConical, Users, Book, Award, Brain, Microscope, Rocket, Database, Upload, X, Check } from 'lucide-react';
interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  faculty: string;
}

const branches = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Electrical',
  'Chemical',
  'Biotechnology',
  'Aerospace'
];

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose, projectTitle, faculty }) => {
  const [semester, setSemester] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [branch, setBranch] = useState(branches[0]);
  const [resume, setResume] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [semesterError, setSemesterError] = useState('');

  const validateSemester = (value: string) => {
    const semNum = parseInt(value);
    if (isNaN(semNum) || semNum < 1 || semNum > 8) {
      setSemesterError('Please enter a semester between 1 and 8');
      return false;
    }
    setSemesterError('');
    return true;
  };

  const handleSubmit = () => {
    if (!validateSemester(semester) || !cgpa || !resume) {
      alert('Please fill all required fields correctly');
      return;
    }
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      // Reset form
      setSemester('');
      setCgpa('');
      setBranch(branches[0]);
      setResume(null);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1E293B] rounded-xl p-6 max-w-md w-full mx-4 relative">
        {!showSuccess ? (
          <>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-orange-400 mb-4">Apply for Research Project</h2>
            <h3 className="text-lg text-gray-200 mb-6">{projectTitle}</h3>
            <p className="text-gray-400 mb-6">Faculty: {faculty}</p>

            <div className="space-y-6">
              {/* Semester Input */}
              <div>
                <label className="block text-gray-300 mb-2">Current Semester</label>
                <input
                  type="number"
                  value={semester}
                  onChange={(e) => {
                    setSemester(e.target.value);
                    validateSemester(e.target.value);
                  }}
                  className="w-full px-4 py-2 bg-[#0F172A] border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter semester (1-8)"
                />
                {semesterError && (
                  <p className="text-red-500 text-sm mt-1">{semesterError}</p>
                )}
              </div>

              {/* CGPA Input */}
              <div>
                <label className="block text-gray-300 mb-2">Current CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  className="w-full px-4 py-2 bg-[#0F172A] border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter CGPA"
                />
              </div>

              {/* Branch Selection */}
              <div>
                <label className="block text-gray-300 mb-2">Branch</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-4 py-2 bg-[#0F172A] border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {branches.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-gray-300 mb-2">Upload Resume</label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => setResume(e.target.files?.[0] || null)}
                    className="hidden"
                    id="resume"
                    accept=".pdf,.doc,.docx"
                  />
                  <label
                    htmlFor="resume"
                    className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg cursor-pointer hover:bg-[#0F172A] transition-colors"
                  >
                    <Upload size={20} className="mr-2 text-orange-400" />
                    <span className="text-gray-300">
                      {resume ? resume.name : 'Choose Resume'}
                    </span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-500 transition-colors"
              >
                Submit Application
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <div className="bg-green-500 rounded-full p-2">
                <Check size={32} className="text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Thank you for applying! 🎉
            </h2>
            <p className="text-gray-300">
              You will be contacted soon regarding your application.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
const ResearchProjects = () => {
  const [selectedProject, setSelectedProject] = useState<{ title: string; faculty: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyClick = (title: string, faculty: string) => {
    setSelectedProject({ title, faculty });
    setIsModalOpen(true);
  };
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-orange-400">Research Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-[#1E293B] p-6 rounded-xl transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20">
          <Brain className="w-8 h-8 text-orange-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">150+</h3>
          <p className="text-gray-400">Active Research Projects</p>
        </div>
        <div className="bg-[#1E293B] p-6 rounded-xl transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20">
          <Microscope className="w-8 h-8 text-orange-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">5+</h3>
          <p className="text-gray-400">Research Labs</p>
        </div>
        <div className="bg-[#1E293B] p-6 rounded-xl transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20">
          <Database className="w-8 h-8 text-orange-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">200+</h3>
          <p className="text-gray-400">Published Papers</p>
        </div>
        <div className="bg-[#1E293B] p-6 rounded-xl transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20">
          <Rocket className="w-8 h-8 text-orange-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">2,00,000+</h3>
          <p className="text-gray-400">Research Funding</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-[#1E293B] p-8 rounded-xl hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-6 text-orange-400">Featured Research Areas</h2>
          <div className="space-y-6">
            {[
              {
                icon: FlaskConical,
                title: "Artificial Intelligence",
                description: "Research in machine learning, neural networks, and AI applications.",
                color: "text-blue-400"
              },
              {
                icon: Users,
                title: "Human-Computer Interaction",
                description: "Studies on user experience and interface design.",
                color: "text-green-400"
              },
              {
                icon: Book,
                title: "Sustainable Technology",
                description: "Green computing and environmental impact research.",
                color: "text-purple-400"
              }
            ].map((area, index) => (
              <div key={index} className="flex gap-4 p-4 bg-[#0F172A] rounded-lg hover:bg-[#1a2234] transition-colors duration-300">
                <area.icon className={`w-6 h-6 ${area.color} flex-shrink-0`} />
                <div>
                  <h3 className="font-semibold text-white">{area.title}</h3>
                  <p className="text-gray-400">{area.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1E293B] p-8 rounded-xl hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-6 text-orange-400">Current Opportunities</h2>
          <div className="space-y-6">
            {[
              {
                title: "AI in Healthcare",
                faculty: "Dr. Ram Prasad Padhy",
                duration: "6 months",
                spots: "3 spots available"
              },
              {
                title: "Quantum Computing",
                faculty: "Prof. Masilamani V",
                duration: "12 months",
                spots: "2 spots available"
              },
              {
                title: "Cybersecurity",
                faculty: "Dr. Pradeep Kumar",
                duration: "8 months",
                spots: "4 spots available"
              }
            ].map((project, index) => (
              <div key={index} className="border-l-4 border-orange-500 pl-4 p-4 bg-[#0F172A] rounded-lg hover:bg-[#1a2234] transition-colors duration-300">
                <h3 className="font-semibold text-white">{project.title}</h3>
                <p className="text-gray-400">Faculty: {project.faculty}</p>
                <p className="text-gray-400">Duration: {project.duration}</p>
                <p className="text-blue-400">{project.spots}</p>
                <button 
                  onClick={() => handleApplyClick(project.title, project.faculty)}
                  className="mt-2 text-sm bg-orange-600 text-white px-6 py-2 rounded-lg transform hover:scale-105 hover:bg-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#1E293B] p-8 rounded-xl hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300">
        <h2 className="text-2xl font-semibold mb-6 text-orange-400">Research Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Award,
              title: "Published Papers",
              count: "50+",
              description: "Research papers published in international journals"
            },
            {
              icon: Users,
              title: "Student Researchers",
              count: "100+",
              description: "Active student researchers across departments"
            },
            {
              icon: Award,
              title: "Research Grants",
              count: "2,00,000+",
              description: "Secured in research funding"
            }
          ].map((achievement, index) => (
            <div key={index} className="text-center p-6 bg-[#0F172A] rounded-xl transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
              <achievement.icon className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2 text-white">{achievement.count}</h3>
              <h4 className="font-medium mb-2 text-orange-400">{achievement.title}</h4>
              <p className="text-gray-400">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
      {selectedProject && (
        <ApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          projectTitle={selectedProject.title}
          faculty={selectedProject.faculty}
        />
      )}
    </div>
  );
};
    

export default ResearchProjects;