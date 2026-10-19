import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../../components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://akoratechnologies.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default:
      "AKORA Technologies | Website Development, Software & Digital Solutions",
    template: "%s | AKORA Technologies",
  },

  description:
    "AKORA Technologies provides professional website development, software development, mobile app development, UI/UX design, and digital solutions to help businesses grow.",

  applicationName: "AKORA Technologies",

  keywords: [
    "AKORA Technologies",
    "Akora Technologies",
    "AKORA",
    "Akora",
    "Akora Tech",
    "AKORA Technologies website",
    "website development company",
    "software development company",
    "mobile app development",
    "web design",
    "UI UX design",
    "digital solutions",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "AKORA Technologies",
    title:
      "AKORA Technologies | Website Development & Software Solutions",
    description:
      "Build your business online with AKORA Technologies — website development, software, mobile apps, and digital design.",
    images: [
      {
        url: "/akoralogopngfinal.png",
        alt: "AKORA Technologies Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AKORA Technologies | Digital Solutions",
    description:
      "Website development, software development, mobile apps, and design by AKORA Technologies.",
    images: ["/akoralogopngfinal.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}