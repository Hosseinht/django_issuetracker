import React from "react";

import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "@/app/NavBar";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import QueryClientProvider from "@/app/QueryClientProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of issues",
};

export default async function RootLayout({
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
            <ToastContainer />
            <main className="p-5">
              <Container>{children}</Container>{" "}
            </main>
            <ReactQueryDevtools />
            {/*<ThemePanel />*/}
          </Theme>
        </QueryClientProvider>
      </body>
    </html>
  );
}
