import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { cn, constructMetadata } from "@/lib/utils";
import { Inter } from "next/font/google";
import "./globals.css";

import "react-loading-skeleton/dist/skeleton.css";
import "simplebar-react/dist/simplebar.min.css";

import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        <script src="/web-agent.js" />
        <Script
          id="imqa"
          dangerouslySetInnerHTML={{
            __html: `
          ((w, c, _wv, _w, _wk, _mh, _b) => {
            w[c] = w[c] || {};
            function imqaConf(key, value){w[c][key]=value};
            
            imqaConf("imqaAgentUse", true);
            imqaConf("projectKey", "사용자 프로젝트키"); // TODO: 프로젝트 키 변경

            imqaConf("SPARootDom", "#root"); // SPA ROOT DOM
            
            w[_w](w);
          })(window, 'imqaClientConfig', 'IMQAWebviewMain', 'IMQAWebMain', 'webkit', 'messageHandlers', 'ImqaBridge')
          `,
          }}
        />
      </head>
      <Providers>
        <body
          id="root"
          className={cn(
            "min-h-screen font-sans antialiased grainy",
            inter.className
          )}
        >
          <Toaster />
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
