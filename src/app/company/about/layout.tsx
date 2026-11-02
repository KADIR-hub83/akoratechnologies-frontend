
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "About AKORA Technologies | Software Development & IT Solutions",

  description:
    "Discover AKORA Technologies, a software development and IT solutions company specializing in custom website development, web applications, mobile app development, digital transformation and innovative technology solutions for businesses.",

  keywords: [
    "AKORA Technologies",
    "About AKORA Technologies",
    "Software Development Company",
    "IT Solutions Company",
    "Web Development Company",
    "Website Development Services",
    "Custom Website Development",
    "Custom Software Development",
    "Web Application Development",
    "Mobile App Development",
    "Business Software Solutions",
    "Digital Transformation Services",
    "Technology Consulting",
    "Software Company in India",
    "IT Company in India",
    "Professional Web Developers",
    "Enterprise Software Solutions",
    "Digital Innovation Company",
    "Scalable Software Solutions",
    "Business Technology Solutions",
  ],

  authors: [
    {
      name: "AKORA Technologies",
      url: "https://akoratechnologies.vercel.app",
    },
  ],

  creator: "AKORA Technologies",
  publisher: "AKORA Technologies",

  alternates: {
    canonical: "https://akoratechnologies.vercel.app/company/about",
  },

  openGraph: {
    title: "About Us | AKORA Technologies",
    description:
      "Learn about AKORA Technologies, our vision, mission and commitment to delivering innovative software development, website development and IT solutions.",
    url: "https://akoratechnologies.vercel.app/company/about",
    siteName: "AKORA Technologies",
    images: [
      {
        url: "https://akoratechnologies.vercel.app/akoralogopngfinal.png",
        width: 1200,
        height: 630,
        alt: "AKORA Technologies - Software Development Company",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "About AKORA Technologies",
    description:
      "Discover our vision, mission and innovative software development and IT solutions.",
    images: [
      "https://akoratechnologies.vercel.app/akoralogopngfinal.png",
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

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
