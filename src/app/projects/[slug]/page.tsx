
import { notFound } from 'next/navigation';
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

interface Props {
  params: { slug: string };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project: Project | null = await prisma.project.findUnique({ where: { slug: params.slug } });
  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-ping"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          {/* Navigation */}
          <div className="mb-8 flex items-center gap-4">
            <Link 
              href="/"
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Ana Sayfa
            </Link>
            <span className="text-white/60">•</span>
            <Link 
              href="/projects"
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Projeler
            </Link>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                {project.subtitle}
              </p>
            )}
            
            {/* Project Tags */}
            {project.researchTopics && (
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {project.researchTopics.split(',').map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Project Status */}
            <div className={`inline-flex items-center px-6 py-3 backdrop-blur-sm text-sm font-medium rounded-full border ${
              project.status === 'Active' ? 'bg-green-500/20 text-green-100 border-green-400/30' :
              project.status === 'Completed' ? 'bg-blue-500/20 text-blue-100 border-blue-400/30' :
              project.status === 'On Hold' ? 'bg-yellow-500/20 text-yellow-100 border-yellow-400/30' :
              project.status === 'Postponed' ? 'bg-red-500/20 text-red-100 border-red-400/30' :
              project.status === 'Passive' ? 'bg-gray-500/20 text-gray-100 border-gray-400/30' :
              'bg-purple-500/20 text-purple-100 border-purple-400/30' // Not Started
            }`}>
              <div className={`w-2 h-2 rounded-full mr-3 ${
                project.status === 'Active' ? 'bg-green-400 animate-pulse' :
                project.status === 'Completed' ? 'bg-blue-400' :
                project.status === 'On Hold' ? 'bg-yellow-400 animate-ping' :
                project.status === 'Postponed' ? 'bg-red-400' :
                project.status === 'Passive' ? 'bg-gray-400' :
                'bg-purple-400' // Not Started
              }`}></div>
              {project.status} Project
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Project Overview */}
            {project.overview && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">Project Overview</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">{project.overview}</p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Applications */}
              {project.applications && (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Applications</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{project.applications}</p>
                </div>
              )}

              {/* Technology */}
              {project.technology && (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Technology</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{project.technology}</p>
                </div>
              )}
            </div>

            {/* Unique Selling Points */}
            {project.usp && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Unique Selling Points</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.usp.split(',').map((item, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mt-1">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{item.trim()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sustainability */}
            {project.sustainability && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Sustainability Focus</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{project.sustainability}</p>
              </div>
            )}

            {/* Project Details Grid */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Project Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.date && (
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Timeline</h4>
                    <p className="text-gray-600 text-sm">{project.date}</p>
                  </div>
                )}

                {project.budget && (
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Budget</h4>
                    <p className="text-gray-600 text-sm">{project.budget}</p>
                  </div>
                )}

                {project.grants && (
                  <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Grants & Funds</h4>
                    <p className="text-gray-600 text-sm">{project.grants}</p>
                  </div>
                )}

                {project.universities && (
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 md:col-span-2 lg:col-span-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">University Partners</h4>
                    <p className="text-gray-600 text-sm">{project.universities}</p>
                  </div>
                )}

                {project.staff && (
                  <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 md:col-span-2 lg:col-span-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Academic Staff</h4>
                    <p className="text-gray-600 text-sm">{project.staff}</p>
                  </div>
                )}

                {project.partners && (
                  <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-100 md:col-span-2 lg:col-span-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2H6a2 2 0 00-2-2V4m8 0h2m-2 0v2a2 2 0 002 2v12a2 2 0 002 2h-8a2 2 0 01-2-2V8a2 2 0 012-2v-2m0 0V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 002 2h4a2 2 0 002-2V4" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Industry Partners</h4>
                    <p className="text-gray-600 text-sm">{project.partners}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Back Button */}
            <div className="text-center mt-12">
              <Link 
                href="/projects"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
