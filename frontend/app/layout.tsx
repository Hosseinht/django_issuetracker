import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/app/NavBar";
import { Theme, ThemePanel } from "@radix-ui/themes";
import QueryClientProvider from "@/app/QueryClientProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <Theme accentColor="orange">
            <NavBar />
            <main className="p-5">{children}</main>
            <ReactQueryDevtools />
            <ThemePanel />
          </Theme>
        </QueryClientProvider>
      </body>
    </html>
  );
}
