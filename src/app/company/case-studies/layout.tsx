
import type { Metadata } from "next";

const siteUrl = "https://akoratechnologies.vercel.app";

export const metadata: Metadata = {
  title:
    "Case Studies | Software, Website & App Development Projects | AKORA Technologies",

  description:
    "Explore AKORA Technologies case studies featuring website development, custom software, web applications, mobile app development, UI/UX design and digital transformation projects. Discover our technology solutions, project strategies and real business outcomes.",

  keywords: [
    // Brand keywords
    "AKORA Technologies",
    "AKORA Technologies Case Studies",
    "AKORA Projects",
    "AKORA Technologies Portfolio",
    "AKORA Technologies Projects",
    "AKORA Development Portfolio",

    // Case study keywords
    "Software Development Case Studies",
    "Website Development Case Studies",
    "Web Development Projects",
    "Mobile App Development Case Studies",
    "IT Project Case Studies",
    "Technology Case Studies",
    "Software Company Portfolio",
    "Web Development Portfolio",
    "Digital Transformation Case Studies",
    "Successful Software Projects",
    "Business Technology Case Studies",
    "Real World Software Projects",

    // Website development
    "Custom Website Development Projects",
    "Business Website Development",
    "Ecommerce Website Development",
    "Corporate Website Projects",
    "Responsive Website Development",
    "Professional Website Design",
    "SEO Friendly Website Development",
    "Dynamic Website Development",
    "Next.js Website Development",
    "React Website Projects",

    // Software development
    "Custom Software Development Projects",
    "Enterprise Software Development",
    "Business Software Solutions",
    "Web Application Development Projects",
    "SaaS Application Development",
    "Full Stack Development Projects",
    "Software Engineering Projects",
    "Scalable Software Solutions",
    "Custom Business Applications",

    // Mobile application
    "Android App Development Projects",
    "Mobile Application Development",
    "Custom Mobile App Development",
    "Cross Platform App Development",
    "Application Development Portfolio",

    // Design and technology
    "UI UX Design Case Studies",
    "Modern Web Design Projects",
    "Technology Innovation Projects",
    "Digital Product Development",
    "Frontend Development Projects",
    "Backend Development Projects",
    "API Integration Projects",
    "Cloud Based Software Solutions",

    // Business growth
    "Business Digital Transformation",
    "Digital Solutions for Businesses",
    "Business Automation Projects",
    "Online Business Solutions",
    "Digital Growth Solutions",
    "Technology Consulting Projects",
    "IT Solutions for Businesses",
    "Software Development Company India",
    "Web Development Company India",
  ],

  authors: [
    {
      name: "AKORA Technologies",
      url: siteUrl,
    },
  ],

  creator: "AKORA Technologies",
  publisher: "AKORA Technologies",
  category: "Technology",

  alternates: {
    canonical: `${siteUrl}/resources/case-studies`,
  },

  openGraph: {
    title:
      "Our Case Studies & Technology Projects | AKORA Technologies",

    description:
      "Discover how AKORA Technologies builds websites, applications and custom software solutions through innovative technology and strategic development.",

    url: `${siteUrl}/resources/case-studies`,
    siteName: "AKORA Technologies",

    images: [
      {
        url: `${siteUrl}/akoralogopngfinal.png`,
        width: 1200,
        height: 630,
        alt: "AKORA Technologies Software Development Case Studies",
      },
    ],

    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Case Studies & Projects | AKORA Technologies",

    description:
      "Explore our software development, website development and digital innovation projects.",

    images: [
      `${siteUrl}/akoralogopngfinal.png`,
    ],
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

export default function CaseStudiesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
