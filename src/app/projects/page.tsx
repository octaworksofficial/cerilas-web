export const dynamic = "force-dynamic";

import Link from 'next/link';
import prisma from '@/libs/prisma';

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

export default async function ProjectsPage() {
  const projects: Project[] = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center px-4 py-2 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-200 shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Ana Sayfa
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Explore Projects
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our innovative research and development projects that push the boundaries of technology
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project) => (
            <div key={project.slug} className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 h-[420px] flex flex-col">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1 pr-2">
                    {project.title}
                  </h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
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
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3 flex-grow-0">
                  {project.description || 'No description available.'}
                </p>
                
                {project.researchTopics && (
                  <div className="flex flex-wrap gap-2 mb-4 min-h-[2rem]">
                    {project.researchTopics.split(',').slice(0, 3).map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                  <div className="text-xs text-gray-500">
                    {project.date || 'Date not specified'}
                  </div>
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  >
                    View Details
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add New Project Card */}
          <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 border-dashed h-[420px] flex flex-col">
            <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500"></div>
            <div className="p-6 text-center flex flex-col items-center justify-center flex-1">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">More Projects Coming</h3>
              <p className="text-gray-600 text-sm mb-4">Stay tuned for exciting new research projects</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
