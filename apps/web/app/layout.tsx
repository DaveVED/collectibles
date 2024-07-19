import "../styles/globals.css";
import "@repo/ui/styles.css";
import { Header } from "@repo/ui/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body className="h-full w-full">
        <Header />
        <div className="flex flex-col h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
