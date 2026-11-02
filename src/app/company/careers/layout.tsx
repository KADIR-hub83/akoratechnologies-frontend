
import type { Metadata } from "next";

const siteUrl = "https://akoratechnologies.vercel.app";

export const metadata: Metadata = {
  title:
    "Careers at AKORA Technologies | IT Jobs, Software Jobs & Internships",

  description:
    "Explore career opportunities at AKORA Technologies. Discover software developer jobs, web developer jobs, frontend and backend developer roles, IT jobs, technology careers and internship opportunities. Join our team and grow with innovation.",

  keywords: [
    // Brand keywords
    "AKORA Technologies Careers",
    "AKORA Technologies Jobs",
    "AKORA Technologies Internship",
    "Careers at AKORA Technologies",
    "Join AKORA Technologies",

    // General career keywords
    "Software Company Jobs",
    "IT Jobs in India",
    "Technology Jobs in India",
    "Software Development Jobs",
    "IT Company Careers",
    "Technology Careers",
    "Jobs in Software Companies",
    "Software Engineer Jobs",
    "Developer Jobs in India",

    // Web development jobs
    "Web Developer Jobs",
    "Frontend Developer Jobs",
    "Backend Developer Jobs",
    "Full Stack Developer Jobs",
    "React Developer Jobs",
    "Next.js Developer Jobs",
    "Node.js Developer Jobs",
    "JavaScript Developer Jobs",
    "Website Developer Jobs",

    // App and software development
    "Mobile App Developer Jobs",
    "Android Developer Jobs",
    "Application Developer Jobs",
    "Custom Software Development Careers",

    // Internship keywords
    "Software Development Internship",
    "Web Development Internship",
    "IT Internship for Students",
    "Computer Science Internship",
    "Frontend Developer Internship",
    "Backend Developer Internship",
    "Full Stack Developer Internship",
    "Technology Internship Opportunities",
    "Internship for Freshers",

    // Employment keywords
    "Freshers Jobs in IT",
    "Entry Level Software Developer Jobs",
    "Remote Software Developer Jobs",
    "Work From Home IT Jobs",
    "Developer Job Opportunities",
    "Digital Technology Careers",
    "Engineering Career Opportunities",
  ],

  authors: [
    {
      name: "AKORA Technologies",
      url: siteUrl,
    },
  ],

  creator: "AKORA Technologies",
  publisher: "AKORA Technologies",

  category: "Careers",

  alternates: {
    canonical: `${siteUrl}/company/careers`,
  },

  openGraph: {
    title:
      "Careers at AKORA Technologies | Explore Jobs & Internships",

    description:
      "Build your future with AKORA Technologies. Explore software development jobs, IT career opportunities, developer positions and technology internships.",

    url: `${siteUrl}/company/careers`,
    siteName: "AKORA Technologies",

    images: [
      {
        url: `${siteUrl}/akoralogopngfinal.png`,
        width: 1200,
        height: 630,
        alt: "Careers at AKORA Technologies",
      },
    ],

    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Careers at AKORA Technologies",
    description:
      "Explore software development careers, IT jobs and internship opportunities at AKORA Technologies.",

    images: [`${siteUrl}/akoralogopngfinal.png`],
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

export default function CareersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
