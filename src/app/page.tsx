import React from 'react';
import Link from 'next/link';
import prisma from '@/libs/prisma';
import dynamic from 'next/dynamic';

// AnimationController bileşenini client-side olarak dinamik import ediyoruz
const AnimationController = dynamic(() => import('@/components/AnimationController'), {
  ssr: false,
  loading: () => null,
});

// Newsletter bileşenini import ediyoruz
import NewsletterSubscription from '@/components/NewsletterSubscription';

type Project = {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  status: string;
  researchTopics: string | null;
  date: string | null;
};

type Partner = {
  id: number;
  name: string;
  logoUrl: string;
  website: string | null;
  category: string | null;
  isActive: boolean;
};

// Function to get statistics from API
async function getStatistics() {
  try {
    // Use absolute URL for server-side API calls
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/statistics`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch statistics');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return {
      totalBudget: 0,
      totalProjects: 0,
      activeProjects: 0,
      completedProjects: 0,
      totalPartners: 0,
      totalUniversities: 0,
      totalStaff: 0,
      formatted: {
        totalBudget: '₺0',
        averageBudget: '₺0',
      }
    };
  }
}

export default async function LandingPage() {
  // Get latest 3 projects for preview
  const featuredProjects: Project[] = await prisma.project.findMany({ 
    orderBy: { createdAt: 'desc' },
    take: 3
  });

  // Get active partners
  const partners: Partner[] = await prisma.partner.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' }
  });

  // Get statistics from API
  const stats = await getStatistics();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        {/* Interactive Particle Animations */}
        <AnimationController />
        
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-ping"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Cerilas Logo */}
            <div className="flex justify-center mb-8">
              <img 
                src="https://static.wixstatic.com/media/8c1ac7_85ebb6e3dc2e43f4bbd835e9aabd7b17~mv2.png" 
                alt="Cerilas Logo" 
                className="h-24 md:h-32 w-auto"
              />
            </div>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
              Dream, Design, <span className="text-yellow-300">Disrupt</span>
            </h1>
            <h2 className="text-xl md:text-3xl font-medium mb-8 text-blue-100">
              Tech Beyond Limits, Powered by Innovation
            </h2>
            <p className="max-w-3xl mx-auto mb-10 text-lg md:text-xl leading-relaxed text-blue-100">
              At Cerilas, we delve into advanced AI research, harnessing machine learning and deep learning to develop intelligent systems that solve complex real-world problems and drive business innovation.
            </p>
            
            {/* Innovation Showcase Preview */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl mx-auto w-full max-w-5xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Live Metrics Preview */}
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">15+</div>
                  <div className="text-blue-200 text-sm">Active Projects</div>
                </div>
                
                {/* Innovation Labs */}
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center animate-bounce">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">AI Labs</div>
                  <div className="text-blue-200 text-sm">Innovation Centers</div>
                </div>
                
                {/* Global Impact */}
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center animate-ping">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">€5M+</div>
                  <div className="text-blue-200 text-sm">Research Funding</div>
                </div>
              </div>
              
              {/* Interactive Preview Text */}
              <div className="text-center mt-6 pt-6 border-t border-white/20">
                <p className="text-white font-semibold text-lg mb-2">🚀 Interactive Innovation Showcase</p>
                <p className="text-blue-200 text-sm">Live demos • Real-time metrics • Success stories</p>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link 
                href="/projects"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Explore Projects
              </Link>
              <a 
                href="#contact"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 transform hover:scale-105 border border-white/20"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Innovation Showcase Section - Enhanced for Better Retention */}
      <section id="innovation-showcase" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Cerilas Innovation Showcase
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                Discover our breakthrough innovations and see how our research translates into real-world impact. From AI-powered solutions to sustainable technologies.
              </p>
            </div>

            {/* Live Innovation Metrics */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-300 group">
                <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">15+</div>
                <div className="text-gray-700 font-medium">Research Projects</div>
                <div className="text-sm text-gray-500 mt-1">Active & Completed</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-300 group">
                <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform">50+</div>
                <div className="text-gray-700 font-medium">Global Partners</div>
                <div className="text-sm text-gray-500 mt-1">Universities & Companies</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-300 group">
                <div className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">€5M+</div>
                <div className="text-gray-700 font-medium">Grant Funding</div>
                <div className="text-sm text-gray-500 mt-1">Research Investment</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 hover:border-orange-300 group">
                <div className="text-3xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform">12</div>
                <div className="text-gray-700 font-medium">Countries</div>
                <div className="text-sm text-gray-500 mt-1">Global Impact</div>
              </div>
            </div>

            {/* Technology Stack Showcase */}
            <div className="bg-white rounded-3xl p-8 shadow-xl mb-16 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Our Innovation Stack</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">AI & Machine Learning</h4>
                  <p className="text-sm text-gray-600">TensorFlow • PyTorch • Computer Vision • NLP</p>
                  <div className="mt-3 inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Active Projects: 8
                  </div>
                </div>
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Data Science</h4>
                  <p className="text-sm text-gray-600">Big Data • Predictive Analytics • Deep Learning</p>
                  <div className="mt-3 inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    Active Projects: 5
                  </div>
                </div>
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">IoT & Automation</h4>
                  <p className="text-sm text-gray-600">Smart Systems • Industry 4.0 • Edge Computing</p>
                  <div className="mt-3 inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Active Projects: 4
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Demo Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white mb-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="relative z-10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-4">Experience Our Innovation Live</h3>
                    <p className="text-blue-100 mb-6 text-lg">
                      Step into our virtual lab and interact with cutting-edge prototypes. See how our research transforms ideas into reality.
                    </p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-4 animate-pulse"></div>
                        <span className="text-blue-100">AI-Powered Analytics Dashboard</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-4 animate-pulse"></div>
                        <span className="text-blue-100">Smart Automation Simulator</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-4 animate-pulse"></div>
                        <span className="text-blue-100">Real-time Data Visualization</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 transform hover:scale-105">
                        Try Live Demo
                      </button>
                      <button className="border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200">
                        Watch Video Tour
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                      <div className="aspect-video bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-xl flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                        <div className="text-center z-10">
                          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="text-white font-semibold">Interactive Innovation Lab</p>
                          <p className="text-white/60 text-sm mt-1">Click to explore our virtual workspace</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Stories */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Innovation Success Stories</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border-l-4 border-blue-500 pl-6 hover:bg-blue-50 p-4 rounded-r-xl transition-colors duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">Smart Manufacturing Revolution</h4>
                      <p className="text-sm text-gray-600">AI-Driven Industrial IoT</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    "Cerilas implemented our AI-driven predictive maintenance system that revolutionized our operations. We achieved 35% reduction in downtime and saved €2.1M annually while improving worker safety."
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-blue-600 font-medium">
                      Partner: European Manufacturing Consortium
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      2023 Project
                    </div>
                  </div>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-6 hover:bg-purple-50 p-4 rounded-r-xl transition-colors duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">Green Energy Optimization</h4>
                      <p className="text-sm text-gray-600">Renewable Energy AI Platform</p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    "Our machine learning algorithms optimized wind farm operations across 3 countries, increasing energy output by 22% while reducing maintenance costs by €800K annually. A true game-changer for sustainable energy."
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-purple-600 font-medium">
                      Partner: Nordic Renewable Energy Initiative
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      2024 Project
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Link 
                  href="/projects"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Explore All Innovation Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our latest innovations and breakthrough research projects
            </p>
          </div>
          
          {featuredProjects.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
                {featuredProjects.map((project) => (
                  <div key={project.slug} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                    <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {project.title}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-3 flex-shrink-0 ${
                          project.status === 'Active' ? 'bg-green-100 text-green-800' :
                          project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                          project.status === 'On Hold' ? 'bg-yellow-100 text-yellow-800' :
                          project.status === 'Postponed' ? 'bg-red-100 text-red-800' :
                          project.status === 'Passive' ? 'bg-gray-100 text-gray-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      
                      {project.subtitle && (
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                          {project.subtitle}
                        </p>
                      )}
                      
                      {project.researchTopics && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.researchTopics.split(',').slice(0, 3).map((tag, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200">
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                        <Link 
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                        >
                          Learn More
                          <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <Link 
                  href="/projects"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  View All Projects
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Exciting Projects Coming Soon</h3>
              <p className="text-gray-600 mb-8">We're working on innovative research projects. Stay tuned for updates!</p>
              <Link 
                href="/projects/manage"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
              >
                Add First Project
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Cerilas Means Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Cerilas Means</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <span className="text-blue-800 font-semibold">RPA for R&D</span>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <span className="text-green-800 font-semibold">Data for R&D</span>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-orange-800 font-semibold">Upcycling for R&D</span>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-purple-800 font-semibold">Community for R&D</span>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            We Believe in The Power of Collaboration for <span className="text-blue-600 font-bold">Destructive Innovation</span>
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">About Us</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Almost all the R&D projects we've been involved in are partnered with other institutions, private companies, universities, and even communities in the spirit of open innovation. We really believe in the power of integrity and collaboration for disruptive innovation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center group">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Team Member 1</h4>
                <p className="text-gray-600">Innovation Lead</p>
              </div>
              
              <div className="text-center group">
                <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Team Member 2</h4>
                <p className="text-gray-600">Research Director</p>
              </div>
              
              <div className="text-center group">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Team Member 3</h4>
                <p className="text-gray-600">Technology Lead</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey in Numbers Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Our Journey in Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Total Budget */}
              <div className="group">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                    {stats.formatted?.totalBudget || '₺0'}
                  </div>
                  <div className="text-lg font-semibold text-gray-800">Project Budgets</div>
                  <div className="text-gray-600 mt-1 text-sm">Investment in innovation</div>
                </div>
              </div>
              
              {/* Total Projects */}
              <div className="group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">{stats.totalProjects}</div>
                  <div className="text-lg font-semibold text-gray-800">Number of R&D Projects</div>
                  <div className="text-gray-600 mt-1 text-sm">Research initiatives</div>
                </div>
              </div>
              
              {/* Active Projects */}
              <div className="group">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">{stats.activeProjects}</div>
                  <div className="text-lg font-semibold text-gray-800">Active Projects</div>
                  <div className="text-gray-600 mt-1 text-sm">Currently running</div>
                </div>
              </div>
              
              {/* Completed Projects */}
              <div className="group">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">{stats.completedProjects}</div>
                  <div className="text-lg font-semibold text-gray-800">Completed Projects</div>
                  <div className="text-gray-600 mt-1 text-sm">Successfully completed</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {/* Total Partners */}
              <div className="group">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-3">{stats.totalPartners}</div>
                  <div className="text-lg font-semibold text-gray-800">Total Partners</div>
                  <div className="text-gray-600 mt-1 text-sm">Collaboration network</div>
                </div>
              </div>
              
              {/* Total Universities */}
              <div className="group">
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-6 border border-cyan-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-3">{stats.totalUniversities}</div>
                  <div className="text-lg font-semibold text-gray-800">Academic Partners</div>
                  <div className="text-gray-600 mt-1 text-sm">Academic partnerships</div>
                </div>
              </div>
              
              {/* Total Academic Staff */}
              <div className="group">
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-3">{stats.totalStaff}</div>
                  <div className="text-lg font-semibold text-gray-800">Academic Staff</div>
                  <div className="text-gray-600 mt-1 text-sm">Research team members</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Ready to Reshape <span className="text-yellow-300">Your Products?</span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
              Let's collaborate to bring your innovative ideas to life with cutting-edge technology
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="#contact" 
                className="inline-flex items-center px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-2xl"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Get Started Today
              </a>
              <Link 
                href="/projects"
                className="inline-flex items-center px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-xl hover:bg-white/20 transition-all duration-200 transform hover:scale-105 border border-white/20"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Explore Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Our Partners</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We collaborate with leading institutions, universities, and innovative companies to drive research and development forward through strategic partnerships.
              </p>
            </div>
            
            {partners.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {partners.map((partner) => (
                  <div key={partner.id} className="group">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-40 flex flex-col">
                      <div className="flex-1 flex items-center justify-center mb-3">
                        {partner.website ? (
                          <a href={partner.website} target="_blank" rel="noopener noreferrer" className="block w-full h-16">
                            <img 
                              src={partner.logoUrl} 
                              alt={partner.name}
                              className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                            />
                          </a>
                        ) : (
                          <img 
                            src={partner.logoUrl} 
                            alt={partner.name}
                            className="w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                          />
                        )}
                      </div>
                      <div className="text-center mt-auto">
                        <h4 className="text-xs font-medium text-gray-800 mb-2 line-clamp-2 leading-tight">{partner.name}</h4>
                        {partner.category && (
                          <span className="inline-block px-2 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs rounded-full border border-blue-200 line-clamp-1">
                            {partner.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Building Strategic Partnerships</h3>
                <p className="text-gray-600 mb-8">We're actively seeking collaboration opportunities with innovative institutions and companies.</p>
                <a 
                  href="mailto:hi@cerilas.com?subject=Partnership%20Opportunity&body=Hello%20Cerilas%20Team,%0A%0AWe%20are%20interested%20in%20exploring%20a%20partnership%20opportunity%20with%20your%20organization.%0A%0ACompany%20Name:%20%0AContact%20Person:%20%0APartnership%20Type:%20%0A%0APlease%20let%20us%20know%20how%20we%20can%20collaborate.%0A%0AThank%20you!"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Become a Partner
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSubscription />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Contact Us</h2>
              <p className="text-xl text-gray-600">
                Ready to start your next innovation project? Let's talk!
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Address</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Camtepe Mah. Mahmut Tevfik Atay Bul. No 4D<br />
                      Sahinbey/GAZIANTEP, TURKIYE
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Email</h4>
                    <div className="space-y-1">
                      <a href="mailto:hi@cerilas.com?subject=General%20Inquiry&body=Hello%20Cerilas%20Team,%0A%0A" className="text-blue-600 hover:text-blue-700 transition-colors block">hi@cerilas.com</a>
                      <a href="mailto:info@cerilas.com?subject=Information%20Request&body=Hello%20Cerilas%20Team,%0A%0A" className="text-blue-600 hover:text-blue-700 transition-colors block">info@cerilas.com</a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">LinkedIn</h4>
                    <a href="https://www.linkedin.com/company/cerilas/" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-700 transition-colors">
                      Follow us on LinkedIn
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">BiGG Portal</h4>
                    <a href="https://bigg.tubitak.gov.tr/tr/girisim/mobilap-akilli-telefonlari-dizustu-bilgisayarlara-donusturen-donanim-kiti" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-700 transition-colors">
                      Find us on BiGG Portal
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Ready to Innovate?</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Whether you're looking to collaborate on research, need advanced AI solutions, or want to explore automation possibilities, we're here to help turn your vision into reality.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-700">Free consultation available</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-700">Expert R&D team</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-700">Proven track record</span>
                  </div>
                </div>
                
                <a 
                  href="mailto:hi@cerilas.com?subject=Innovation%20Project%20Inquiry&body=Hello%20Cerilas%20Team,%0A%0AI%20am%20interested%20in%20learning%20more%20about%20your%20services%20and%20would%20like%20to%20discuss%20a%20potential%20collaboration.%0A%0APlease%20let%20me%20know%20the%20best%20time%20for%20a%20consultation.%0A%0AThank%20you!"
                  className="inline-flex items-center justify-center w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg mt-8"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send us an Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
