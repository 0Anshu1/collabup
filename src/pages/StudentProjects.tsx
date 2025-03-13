import React, { useState } from 'react';
import { Filter, Upload, Code, Clock, Book, Users, Plus } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  level: string;
  levelColor: string;
  technologies: string[];
  duration: string;
  cover: string;
}

interface ProjectCardProps {
  project: Project;
}

interface UploadProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadProjectModal = ({ isOpen, onClose }: UploadProjectModalProps) => {
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1E293B] rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        {!showSuccess ? (
          <>
            <h2 className="text-2xl font-semibold mb-6">Upload Project</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-2">Project Title</label>
                <input
                  type="text"
                  className="w-full bg-[#0F172A] p-3 rounded-lg text-white"
                  placeholder="Enter project title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Project Description</label>
                <textarea
                  className="w-full bg-[#0F172A] p-3 rounded-lg text-white h-32"
                  placeholder="Describe your project"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Domain</label>
                  <select className="w-full bg-[#0F172A] p-3 rounded-lg text-white" required>
                    <option value="">Select Domain</option>
                    <option>Web Development</option>
                    <option>Mobile Development</option>
                    <option>AI/ML</option>
                    <option>Blockchain</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Level</label>
                  <select className="w-full bg-[#0F172A] p-3 rounded-lg text-white" required>
                    <option value="">Select Level</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <input
                    type="text"
                    className="w-full bg-[#0F172A] p-3 rounded-lg text-white"
                    placeholder="e.g., 3 months"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Framework</label>
                  <input
                    type="text"
                    className="w-full bg-[#0F172A] p-3 rounded-lg text-white"
                    placeholder="e.g., React, Flutter"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Project Cover</label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      // Handle image upload
                      const file = e.target.files?.[0];
                      if (file) {
                        // TODO: Handle image upload
                        console.log('Image file:', file);
                      }
                    }}
                  />
                  <Upload className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-400">Drag and drop or click to upload cover image</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Project Documents</label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.zip,.rar"
                    onChange={(e) => {
                      // Handle document upload
                      const files = e.target.files;
                      if (files) {
                        // TODO: Handle document upload
                        console.log('Document files:', files);
                      }
                    }}
                  />
                  <Upload className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-400">Upload project documents (PDF, DOC, TXT, ZIP)</p>
                  <p className="text-xs text-gray-500 mt-2">Max file size: 10MB per file</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  Upload Project
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-12 transform animate-fade-in">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Thanks for Uploading!
            </h2>
            <p className="text-gray-300">
              Keep Collaborating
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const StudentProjects = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const projects = [
    {
      title: "AI-Powered Task Manager",
      description: "A smart task management system that uses AI to prioritize and organize tasks efficiently.",
      level: "Advanced",
      levelColor: "bg-red-500/20 text-red-400",
      technologies: ["Python", "TensorFlow", "React"],
      duration: "3 months",
      cover: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=2070"
    },
    {
      title: "Social Learning Platform",
      description: "A collaborative platform for students to share resources and learn together.",
      level: "Intermediate",
      levelColor: "bg-yellow-500/20 text-yellow-400",
      technologies: ["React", "Node.js", "MongoDB"],
      duration: "2 months",
      cover: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-400 text-center">Student Projects</h1>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="btn-primary mt-4"
        >
          <Plus className="w-5 h-5" />
          Upload Project
        </button>
      </div>

      <div className="bg-[#1E293B] p-4 rounded-xl mb-8 flex flex-wrap gap-4">
        <div className="flex items-center gap-2 text-gray-400">
          <Filter className="w-5 h-5" />
          <span>Filters:</span>
        </div>
        {['Domain', 'Language', 'Framework', 'Duration', 'Level'].map((filter) => (
          <select
            key={filter}
            className="bg-[#0F172A] text-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>{filter}</option>
          </select>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      <UploadProjectModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};

export default StudentProjects;

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [showCollaborateSuccess, setShowCollaborateSuccess] = useState(false);

  const handleCollaborate = () => {
    setShowCollaborateSuccess(true);
    setTimeout(() => {
      setShowCollaborateSuccess(false);
    }, 3000);
  };

  return (
    <>
      {showCollaborateSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1E293B] rounded-xl p-8 text-center transform animate-fade-in">
            <div className="text-6xl mb-4">🎉 👥</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Thanks for Collaborating!
            </h2>
            <p className="text-gray-300">
              You will be shared the details of the project along with the team details.
            </p>
          </div>
        </div>
      )}
      <div className="bg-[#1E293B] rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
        <img src={project.cover} alt={project.title} className="w-full h-48 object-cover" />
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-white">{project.title}</h3>
            <span className={`px-3 py-1 rounded-full text-sm ${project.levelColor}`}>
              {project.level}
            </span>
          </div>
          <p className="text-gray-400 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech: string, index: number) => (
              <span key={index} className="bg-[#0F172A] text-blue-400 px-3 py-1 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{project.duration}</span>
            </div>
            <button
              onClick={handleCollaborate}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Collaborate
            </button>
          </div>
        </div>
      </div>
    </>
  );

};