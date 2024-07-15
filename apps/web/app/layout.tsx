import { UserProvider } from '@auth0/nextjs-auth0/client';
import "../styles/globals.css";
import "@repo/ui/styles.css";
import { Header } from '@repo/ui/header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider loginUrl="/api/auth/login" profileUrl="/api/auth/me">
        <body className="ui-h-full ui-w-full ui-overflow-y-auto"> 
          <Header />
          {children} 
        </body>
      </UserProvider>
    </html>
  );
}
