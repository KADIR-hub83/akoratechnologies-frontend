
import type { Metadata } from "next";

const siteUrl = "https://akoratechnologies.vercel.app";

export const metadata: Metadata = {
  title:
    "Our Leadership Team | Founders, Directors & Management | AKORA Technologies",

  description:
    "Meet the leadership team of AKORA Technologies. Discover our founders, directors and technology leaders, their professional backgrounds, experience, vision and contributions to software development and digital innovation.",

  keywords: [
    // Brand and leadership keywords
    "AKORA Technologies",
    "AKORA Technologies Leadership",
    "AKORA Technologies Team",
    "AKORA Technologies Founder",
    "AKORA Technologies Directors",
    "AKORA Technologies Management Team",
    "AKORA Technologies Leadership Team",
    "About AKORA Technologies Leaders",
    "AKORA Technologies Management",

    // Leadership searches
    "Technology Company Leadership",
    "Software Company Leadership Team",
    "IT Company Founders",
    "Technology Company Founders",
    "Software Company Directors",
    "Technology Business Leaders",
    "IT Industry Leaders",
    "Executive Leadership Team",
    "Company Management Team",
    "Business Leadership",
    "Corporate Leadership Team",

    // Professional profile searches
    "Founder and CEO",
    "Software Company CEO",
    "Technology Company CEO",
    "IT Company CEO",
    "Software Development Founder",
    "Technology Entrepreneurs",
    "Digital Innovation Leaders",
    "Professional Leadership Profiles",
    "Technology Professionals",
    "Software Industry Professionals",

    // Software and technology
    "Software Development Company India",
    "IT Solutions Company India",
    "Web Development Company",
    "Custom Software Development",
    "Technology Innovation",
    "Digital Transformation",
    "Software Engineering Leaders",
    "Technology Management",

    // Personal profile discovery
    "AKORA Technologies Founder Profile",
    "AKORA Technologies CEO Profile",
    "AKORA Technologies Executive Profiles",
    "AKORA Technologies Team Members",
    "AKORA Technologies Leadership Profiles",
  ],

  authors: [
    {
      name: "AKORA Technologies",
      url: siteUrl,
    },
  ],

  creator: "AKORA Technologies",
  publisher: "AKORA Technologies",
  category: "Business",

  alternates: {
    canonical: `${siteUrl}/company/leadership`,
  },

  openGraph: {
    title:
      "Meet Our Leadership Team | AKORA Technologies",

    description:
      "Get to know the founders, directors and leadership team behind AKORA Technologies. Explore their experience, vision and commitment to technology and innovation.",

    url: `${siteUrl}/company/leadership`,
    siteName: "AKORA Technologies",

    images: [
      {
        url: `${siteUrl}/akoralogopngfinal.png`,
        width: 1200,
        height: 630,
        alt: "AKORA Technologies Leadership Team",
      },
    ],

    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Our Leadership Team | AKORA Technologies",

    description:
      "Meet the people behind AKORA Technologies. Discover our leadership team, professional experience and vision.",

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

export default function LeadershipLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
