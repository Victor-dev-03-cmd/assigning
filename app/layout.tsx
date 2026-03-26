import Header from "@/components/Header";
import NavbarWrapper from "@/components/NavbarWrapper";
import type { Metadata } from "next";
import { Outfit, Inter, Poppins } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Assigne.app",
  description: "Secure assignments and task management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${inter.variable} ${poppins.variable} antialiased font-sans`}
      >
        <NavbarWrapper>
          <Header />
        </NavbarWrapper>
        {children}
      </body>
    </html>
  );
}
