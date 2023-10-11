"use client";
import { useStore } from "@/store";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useStore();
  const router = useRouter();
  useEffect(() => {
    store.setNavigationRoute(router);
  }, [router]);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
