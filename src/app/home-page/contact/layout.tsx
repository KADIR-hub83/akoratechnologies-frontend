
import type { Metadata } from "next";
import type { ReactNode } from "react";

const BASE_URL = "https://akoratechnologies.vercel.app";
const PAGE_URL = `${BASE_URL}/home-page/contact`;

export const metadata: Metadata = {
  title: "Contact AKORA Technologies | Website & Software Development",

  description:
    "Contact AKORA Technologies for professional website development, custom software, web applications, mobile app development, UI/UX design, and digital solutions. Discuss your project with our team.",

  applicationName: "AKORA Technologies",

  keywords: [
    "AKORA Technologies",
    "Akora Technologies contact",
    "Contact AKORA Technologies",
    "AKORA Technologies contact number",
    "AKORA Technologies email",
    "Akora Technologies India",
    "website development company",
    "website development company in India",
    "website designing company",
    "custom website development",
    "dynamic website development",
    "business website development",
    "affordable website development",
    "software development company",
    "custom software development",
    "custom web application development",
    "web application development company",
    "mobile app development company",
    "Android app development",
    "iOS app development",
    "ecommerce website development",
    "SEO friendly website development",
    "UI UX design services",
    "IT solutions company",
    "digital solutions company",
    "business automation software",
    "web development services",
    "technology consulting",
    "website development services India",
  ],

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "AKORA Technologies",
    title: "Contact AKORA Technologies | Let's Build Your Digital Future",
    description:
      "Get in touch with AKORA Technologies for websites, custom software, web applications, mobile apps, and digital solutions.",
    images: [
      {
        url: "/akoralogopngfinal.png",
        width: 1200,
        height: 630,
        alt: "AKORA Technologies - Contact Our Team",
      },
    ],
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact AKORA Technologies",
    description:
      "Have a project in mind? Contact AKORA Technologies for website development, software, mobile apps, and digital solutions.",
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

export default function ContactLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
