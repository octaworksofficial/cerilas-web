import '../../../styles/global.css';

export const metadata = {
  title: 'Newsletter Subscribers Admin | Cerilas',
  description: 'Admin panel for managing newsletter subscribers',
};

export default function NewsletterAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
