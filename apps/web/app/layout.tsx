import "../styles/globals.css";
import "@repo/ui/styles.css";
import { Header } from "@repo/ui/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="ui-h-full ui-w-full ui-overflow-y-auto">
        <Header />
        {children}
      </body>
    </html>
  );
}
