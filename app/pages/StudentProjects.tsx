import React, { useState } from 'react';
import { Filter, Upload, Code, Clock, Book, Users, Plus } from 'lucide-react';

const ProjectCard = ({ project }: any) => (
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
        <button className="btn-primary text-sm py-2">
          Collaborate
        </button>
      </div>
    </div>
  </div>
);

const UploadProjectModal = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1E293B] rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6">Upload Project</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Project Title</label>
            <input
              type="text"
              className="w-full bg-[#0F172A] p-3 rounded-lg text-white"
              placeholder="Enter project title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Project Description</label>
            <textarea
              className="w-full bg-[#0F172A] p-3 rounded-lg text-white h-32"
              placeholder="Describe your project"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Domain</label>
              <select className="w-full bg-[#0F172A] p-3 rounded-lg text-white">
                <option>Web Development</option>
                <option>Mobile Development</option>
                <option>AI/ML</option>
                <option>Blockchain</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Level</label>
              <select className="w-full bg-[#0F172A] p-3 rounded-lg text-white">
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
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Framework</label>
              <input
                type="text"
                className="w-full bg-[#0F172A] p-3 rounded-lg text-white"
                placeholder="e.g., React, Flutter"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Project Cover</label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400">Drag and drop or click to upload</p>
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-400">Student Projects</h1>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="btn-primary"
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