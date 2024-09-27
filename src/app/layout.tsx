import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import TitleBar from "@/components/ui/titleBar";
import { UserProvider } from "@/components/UserContext";

export const metadata: Metadata = {
  title: "Chat app",
  description: "Built by DreoX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <TitleBar />
            {children}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
