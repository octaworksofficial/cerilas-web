import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get all projects for statistics
    const allProjects = await prisma.project.findMany();
    
    // Calculate total R&D budget
    const totalBudget = allProjects.reduce((sum, project) => {
      if (project.budget) {
        // Handle both formatted strings and plain numbers
        let budgetValue = project.budget.toString().trim();
        
        // If it's already a plain number string, use it directly
        if (/^\d+$/.test(budgetValue)) {
          return sum + parseInt(budgetValue, 10);
        }
        
        // Otherwise, extract numeric value (remove currency symbols, commas, etc.)
        const numericBudget = parseFloat(budgetValue.replace(/[^\d.,]/g, '').replace(/,/g, ''));
        return sum + (isNaN(numericBudget) ? 0 : numericBudget);
      }
      return sum;
    }, 0);

    // Count projects by status
    const totalProjects = allProjects.length;
    const activeProjects = allProjects.filter(p => p.status === 'Active').length;
    const completedProjects = allProjects.filter(p => p.status === 'Completed').length;
    
    // Count total partners from all projects
    const allPartners = new Set<string>();
    allProjects.forEach(project => {
      if (project.partners) {
        const projectPartners = project.partners.split(',').map(p => p.trim()).filter(p => p);
        projectPartners.forEach(partner => allPartners.add(partner.toLowerCase()));
      }
    });
    
    // Count total universities from all projects
    const allUniversities = new Set<string>();
    allProjects.forEach(project => {
      if (project.universities) {
        const projectUniversities = project.universities.split(',').map(u => u.trim()).filter(u => u);
        projectUniversities.forEach(university => allUniversities.add(university.toLowerCase()));
      }
    });
    
    // Count total academic staff from all projects
    const allStaff = new Set<string>();
    allProjects.forEach(project => {
      if (project.staff) {
        const projectStaff = project.staff.split(',').map(s => s.trim()).filter(s => s);
        projectStaff.forEach(staff => {
          // Normalize: lowercase, remove extra spaces, remove titles
          const normalized = staff.toLowerCase()
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .replace(/^(dr\.?|prof\.?|doç\.?|yrd\.?doç\.?)\s*/i, '') // Remove academic titles
            .trim();
          if (normalized) {
            allStaff.add(normalized);
          }
        });
      }
    });

    // Additional statistics
    const onHoldProjects = allProjects.filter(p => p.status === 'On Hold').length;
    const postponedProjects = allProjects.filter(p => p.status === 'Postponed').length;
    const passiveProjects = allProjects.filter(p => p.status === 'Passive').length;
    const notStartedProjects = allProjects.filter(p => p.status === 'Not Started').length;

    // Calculate average budget per project
    const averageBudget = totalProjects > 0 ? Math.round(totalBudget / totalProjects) : 0;

    const statistics = {
      // Main statistics
      totalBudget: Math.round(totalBudget),
      totalProjects,
      activeProjects,
      completedProjects,
      totalPartners: allPartners.size,
      totalUniversities: allUniversities.size,
      totalStaff: allStaff.size,
      
      // Additional statistics
      onHoldProjects,
      postponedProjects,
      passiveProjects,
      notStartedProjects,
      averageBudget,
      
      // Formatted values for display
      formatted: {
        totalBudget: totalBudget > 0 ? `$${(totalBudget / 1000000).toFixed(1)}M` : '$0',
        averageBudget: averageBudget > 0 ? `$${(averageBudget / 1000000).toFixed(1)}M` : '$0',
      },
      
      // Metadata
      lastUpdated: new Date().toISOString(),
      calculatedAt: Date.now()
    };

    return NextResponse.json(statistics);
    
  } catch (error) {
    console.error('Error calculating statistics:', error);
    
    // Return default values in case of error
    const defaultStats = {
      totalBudget: 0,
      totalProjects: 0,
      activeProjects: 0,
      completedProjects: 0,
      totalPartners: 0,
      totalUniversities: 0,
      totalStaff: 0,
      onHoldProjects: 0,
      postponedProjects: 0,
      passiveProjects: 0,
      notStartedProjects: 0,
      averageBudget: 0,
      formatted: {
        totalBudget: '₺0',
        averageBudget: '₺0',
      },
      lastUpdated: new Date().toISOString(),
      calculatedAt: Date.now(),
      error: 'Failed to calculate statistics'
    };

    return NextResponse.json(defaultStats, { status: 500 });
  }
}
