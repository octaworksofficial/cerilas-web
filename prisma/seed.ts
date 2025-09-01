import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // GIMBO projesini ekleyelim
  const gimboProject = await prisma.project.upsert({
    where: { slug: 'gimbo' },
    update: {},
    create: {
      slug: 'gimbo',
      title: 'GIMBO',
      subtitle: 'Redefining Mobile Filmmaking: AI-Powered Gimbal for Seamless, Professional-Grade Shots',
      description: 'Redefining Mobile Filmmaking: AI-Powered Gimbal for Seamless, Professional-Grade Shots',
      overview: 'GIMBO is a narrow AI-powered, wheeled gimbal designed to work with smartphones. The project focuses on enhancing smartphone camera functionalities by offering automated positioning and shot optimization, making it ideal for content creators.',
      applications: 'GIMBO is tailored for professionals, large-scale influencers, videographers, and tech enthusiasts. It provides a modular gimbal experience that optimizes camera positioning and composition, targeting the needs of creators in real-time shooting environments.',
      usp: '6 Degrees of Freedom (6 DOF): Unlike conventional gimbals limited to 3 DOF, GIMBO allows more fluid and flexible movement., AI-Powered Scene Enhancement: With narrow AI, GIMBO automatically adjusts camera settings for the best composition based on the scene, reducing the need for manual adjustments., Modular Operation Modes: GIMBO can function hands-free or on-hand, allowing creators to switch between different usage modes as needed.',
      technology: 'GIMBO utilizes hollow shaft motors, a high-capacity battery, and a gimbal mechanism optimized with AI for dynamic content creation. It also includes real-time object tracking, adaptive positioning, and modular control to deliver a versatile and high-quality filming experience.',
      sustainability: 'The project aligns with green transformation standards, particularly the European Green Deal, by repurposing smartphones and leveraging their processing power. This approach supports sustainability goals through advanced upcycling techniques.',
      researchTopics: 'AI, Robotics, Transfer Learning, Image and Video Processing',
      date: '1 Mar 2025 - 30 Haziran 2026',
      grants: '1501-2024-2',
      universities: 'Kahramanmaraş Sütçü İmam University, Hasan Kalyoncu University, Istanbul Technical University',
      staff: 'Hasan Badem, Mehmet Fatih Eminoğlu',
      partners: 'OCTA Works Teknoloji Sanayi ve Ticaret Anonim Şirketi, EFELYUM Elektronik Yazılım Sanayi ve Ticaret Limited Şirketi',
      budget: '> $200.000',
    },
  });

  console.log('Sample project created:', gimboProject);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
