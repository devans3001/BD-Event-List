import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./TanProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Birthday Party Guest Manager',
  description: 'Guest arrival management system',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>

        {children}
         <Toaster theme="dark"/>
        </Providers>
      </body>
    </html>
  );
}
