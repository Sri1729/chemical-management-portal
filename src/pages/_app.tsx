import { useStore } from "@/store";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

import { useRouter } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

import { useEffect } from "react";
import "./globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore();
  const router = useRouter();
  useEffect(() => {
    store.setNavigationRoute(router);
  }, [router]);
  return (
    <div className={`${inter.className} `}>
      <Component {...pageProps} />
    </div>
  );
}
