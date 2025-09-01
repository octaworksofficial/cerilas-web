"use client";
import { useState, useCallback } from 'react';

type Project = {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  overview: string | null;
  applications: string | null;
  usp: string | null;
  technology: string | null;
  sustainability: string | null;
  researchTopics: string | null;
  date: string | null;
  grants: string | null;
  universities: string | null;
  staff: string | null;
  partners: string | null;
  budget: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

interface ProjectManagerProps {
  initialProjects: Project[];
}

const INITIAL_FORM_STATE = {
  slug: '',
  title: '',
  subtitle: '',
  description: '',
  overview: '',
  applications: '',
  usp: '',
  technology: '',
  sustainability: '',
  researchTopics: '',
  date: '',
  grants: '',
  universities: '',
  staff: '',
  partners: '',
  budget: '',
  status: 'Not Started',
};

const PROJECT_STATUSES = [
  'Not Started',
  'Active', 
  'On Hold',
  'Postponed',
  'Completed',
  'Passive'
];

export default function ProjectManager({ initialProjects }: ProjectManagerProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const resetForm = useCallback(() => {
    setForm({ ...INITIAL_FORM_STATE });
    setEditingProject(null);
  }, []);

  const handleEdit = useCallback((project: Project) => {
    setForm({
      slug: project.slug,
      title: project.title,
      subtitle: project.subtitle || '',
      description: project.description || '',
      overview: project.overview || '',
      applications: project.applications || '',
      usp: project.usp || '',
      technology: project.technology || '',
      sustainability: project.sustainability || '',
      researchTopics: project.researchTopics || '',
      date: project.date || '',
      grants: project.grants || '',
      universities: project.universities || '',
      staff: project.staff || '',
      partners: project.partners || '',
      budget: project.budget || '',
      status: project.status || 'Not Started',
    });
    setEditingProject(project);
    setShowForm(true);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Failed to ${editingProject ? 'update' : 'create'} project: ${errorData}`);
      }
      
      const result = await res.json();
      setSuccess(`Project ${editingProject ? 'updated' : 'created'} successfully!`);
      
      // Update projects list with functional update
      if (editingProject) {
        setProjects(prevProjects => 
          prevProjects.map(p => p.id === editingProject.id ? result : p)
        );
      } else {
        setProjects(prevProjects => [result, ...prevProjects]);
      }
      
      resetForm();
      setShowForm(false);
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [form, editingProject, resetForm]);

  const handleDelete = useCallback(async (projectId: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const res = await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete project');
      
      // Use functional update to prevent stale closure
      setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
      setSuccess('Project deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  return (
    <div id="project-form" className="bg-white rounded-2xl shadow-xl border border-gray-100">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Project Management</h2>
            <p className="text-gray-600 mt-1">Manage your research projects</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) resetForm();
            }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            {showForm ? (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Project
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {(success || error) && (
        <div className="px-8 py-4">
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
        </div>
      )}

      {/* Project Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="px-8 py-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold mb-6 text-gray-800">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug (Unique ID) *
              </label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                disabled={!!editingProject}
                placeholder="project-slug"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title *
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Project Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <input
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                placeholder="Project subtitle"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <input
                name="date"
                value={form.date}
                onChange={handleChange}
                placeholder="Start - End Date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Research Topics
              </label>
              <input
                name="researchTopics"
                value={form.researchTopics}
                onChange={handleChange}
                placeholder="AI, Robotics, Machine Learning (comma separated)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget
              </label>
              <input
                name="budget"
                value={form.budget}
                onChange={handleChange}
                placeholder="$200,000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Status *
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                {PROJECT_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Brief project description"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overview
              </label>
              <textarea
                name="overview"
                value={form.overview}
                onChange={handleChange}
                rows={3}
                placeholder="Detailed project overview"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Applications
              </label>
              <textarea
                name="applications"
                value={form.applications}
                onChange={handleChange}
                rows={3}
                placeholder="Project applications and use cases"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unique Selling Points
              </label>
              <textarea
                name="usp"
                value={form.usp}
                onChange={handleChange}
                rows={3}
                placeholder="Unique selling points (comma separated)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technology
              </label>
              <textarea
                name="technology"
                value={form.technology}
                onChange={handleChange}
                rows={3}
                placeholder="Technologies and tools used"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sustainability Focus
              </label>
              <textarea
                name="sustainability"
                value={form.sustainability}
                onChange={handleChange}
                rows={3}
                placeholder="Environmental and sustainability aspects"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grants & Funds
              </label>
              <input
                name="grants"
                value={form.grants}
                onChange={handleChange}
                placeholder="Funding sources and grants"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                University Partners
              </label>
              <input
                name="universities"
                value={form.universities}
                onChange={handleChange}
                placeholder="Partner universities"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Staff
              </label>
              <input
                name="staff"
                value={form.staff}
                onChange={handleChange}
                placeholder="Academic staff involved"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry Partners
              </label>
              <input
                name="partners"
                value={form.partners}
                onChange={handleChange}
                placeholder="Industry and research partners"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {editingProject ? 'Update Project' : 'Create Project'}
                </>
              )}
            </button>
            
            {editingProject && (
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-200"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      )}

      {/* Projects List */}
      <div className="px-8 py-6">
        <h3 className="text-lg font-semibold mb-6 text-gray-800">Existing Projects</h3>
        
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-gray-500">No projects found. Create your first project!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={`project-${project.id}-${project.slug}`} className="flex items-center justify-between p-6 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{project.title}</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.status === 'Active' ? 'bg-green-100 text-green-800' :
                      project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'On Hold' ? 'bg-yellow-100 text-yellow-800' :
                      project.status === 'Postponed' ? 'bg-red-100 text-red-800' :
                      project.status === 'Passive' ? 'bg-gray-100 text-gray-800' :
                      'bg-purple-100 text-purple-800' // Not Started
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>Slug: {project.slug}</span>
                    <span>•</span>
                    <span>{project.date}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 ml-4">
                  <button
                    type="button"
                    onClick={() => handleEdit(project)}
                    className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleDelete(project.id)}
                    className="inline-flex items-center px-3 py-2 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
