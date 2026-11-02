
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../../components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// IMPORTANT:
// Keep this domain until your custom domain is configured.
// After custom domain verification, update this URL everywhere.
const BASE_URL = "https://akoratechnologies.vercel.app";

const BRAND_NAME = "AKORA Technologies";
const LOGO_URL = `${BASE_URL}/akoralogopngfinal.png`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  applicationName: BRAND_NAME,

  title: {
    default:
      "AKORA Technologies | Software Development & Website Development Company",
    template: "%s | AKORA Technologies",
  },

  description:
    "AKORA Technologies is a software development company delivering custom website development, web applications, mobile app development, business software, UI/UX design and digital solutions to help businesses grow.",

  keywords: [
    "AKORA Technologies",
    "AKORA Technologies India",
    "Akora Technologies Software Company",
    "AKORA Software Development",
    "AKORA Web Development",
    "AKORA Custom Software",
    "AKORA Technologies Official Website",

    "Software Development Company",
    "Software Development Company in India",
    "Website Development Company",
    "Website Development Services",
    "Professional Website Development",
    "Custom Website Development",
    "Affordable Website Development",
    "Business Website Development",
    "Dynamic Website Development",
    "SEO Optimized Website Development",

    "Custom Software Development",
    "Custom Web Application Development",
    "Web Application Development Company",
    "Business Software Solutions",
    "Enterprise Software Development",
    "SaaS Application Development",
    "Software Engineering Services",

    "Mobile App Development Company",
    "Android App Development",
    "iOS App Development",
    "Custom Mobile Applications",

    "Next.js Development",
    "React Development",
    "Full Stack Development",
    "Frontend Development",
    "Backend Development",
    "API Development",
    "UI UX Design",
    "Website Redesign",

    "Digital Transformation Services",
    "IT Solutions Company",
    "Technology Consulting",
    "Business Automation Solutions",
    "Digital Innovation",
    "Ecommerce Website Development",
    "Web Design Company India",
    "Software Company for Startups",
  ],

  authors: [
    {
      name: BRAND_NAME,
      url: BASE_URL,
    },
  ],

  creator: BRAND_NAME,
  publisher: BRAND_NAME,

  category: "Technology",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/akoralogopngfinal.png",
        type: "image/png",
      },
    ],
    apple: "/akoralogopngfinal.png",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: BRAND_NAME,

    title:
      "AKORA Technologies | Custom Software, Websites & Digital Solutions",

    description:
      "Build your digital future with AKORA Technologies. We develop professional websites, custom software, mobile applications and innovative digital solutions for businesses.",

    images: [
      {
        url: LOGO_URL,
        alt: "AKORA Technologies - Software Development Company",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "AKORA Technologies | Software & Website Development",

    description:
      "Professional website development, custom software, mobile applications and digital solutions by AKORA Technologies.",

    images: [LOGO_URL],
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

  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
};

// ORGANIZATION + WEBSITE STRUCTURED DATA
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,

      name: BRAND_NAME,
      alternateName: "AKORA",

      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },

      image: LOGO_URL,

      description:
        "AKORA Technologies provides custom software development, website development, mobile application development, UI/UX design and digital technology solutions.",

      email: "akoratechnologies@gmail.com",

      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-7225878057",
        contactType: "customer support",
        email: "akoratechnologies@gmail.com",
        availableLanguage: ["English", "Hindi"],
      },

      knowsAbout: [
        "Website Development",
        "Software Development",
        "Custom Web Applications",
        "Mobile App Development",
        "UI/UX Design",
        "Digital Transformation",
        "Business Automation",
        "Technology Solutions",
      ],
    },

    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,

      url: BASE_URL,
      name: BRAND_NAME,
      alternateName: "AKORA",

      publisher: {
        "@id": `${BASE_URL}/#organization`,
      },

      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />
      </head>

      <body className="min-h-full flex flex-col overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
