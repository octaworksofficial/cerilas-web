export const dynamic = "force-dynamic";

import Link from 'next/link';
import prisma from '@/libs/prisma';
import ProjectManager from '../ProjectManager';

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

export default async function ProjectManagePage() {
  const projects: Project[] = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="inline-flex items-center px-4 py-2 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-200 shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Ana Sayfa
            </Link>
            <span className="text-gray-400">•</span>
            <Link 
              href="/projects"
              className="inline-flex items-center px-4 py-2 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-200 shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Projeler
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Project Management
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Add, edit, and manage your research projects
          </p>
        </div>

        {/* Project Management Section */}
        <ProjectManager initialProjects={projects} />
      </div>
    </main>
  );
}
