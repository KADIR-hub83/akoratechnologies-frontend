
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology Webinars & Online Sessions | AKORA Technologies",
  description:
    "Explore expert-led webinars by AKORA Technologies covering AI, software development, web technologies, digital innovation and emerging technology trends. Learn, grow and innovate.",
  keywords: [
    "AKORA Technologies Webinars",
    "Technology Webinars",
    "Software Development Webinars",
    "AI Webinars",
    "Web Development",
    "Artificial Intelligence",
    "Digital Innovation",
    "Online Technology Sessions",
  ],
  openGraph: {
    title: "Technology Webinars | AKORA Technologies",
    description:
      "Learn, explore and innovate with expert-led technology webinars from AKORA Technologies.",
    type: "website",
    siteName: "AKORA Technologies",
    url: "https://akoratechnologies.vercel.app/resources/webinars",
  },
  alternates: {
    canonical: "https://akoratechnologies.vercel.app/resources/webinars",
  },
};

export default function WebinarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
