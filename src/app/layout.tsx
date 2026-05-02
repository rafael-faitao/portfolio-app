export const metadata = {
  title: "Rafael Oliveira - Full-Stack Product Engineer",
  description: "Experienced Full-Stack Product Engineer specializing in React, Next.js, Node.js, and modern web technologies. Building innovative solutions with 10+ years of experience.",
  keywords: "Rafael Oliveira, Full-Stack Product Engineer, React, Next.js, Node.js, TypeScript, JavaScript, Angular, Vue.js, Portfolio, Web Developer",
  authors: [{ name: "Rafael Oliveira" }],
  creator: "Rafael Oliveira",
  publisher: "Rafael Oliveira",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rafael-oliveira.dev",
    title: "Rafael Oliveira - Full-Stack Product Engineer",
    description: "Experienced Full-Stack Product Engineer specializing in React, Next.js, Node.js, and modern web technologies. Building innovative solutions with 10+ years of experience.",
    siteName: "Rafael Oliveira Portfolio",
    images: [
      {
        url: "/images/main-pic-big.png",
        width: 1200,
        height: 630,
        alt: "Rafael Oliveira - Full-Stack Product Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafael Oliveira - Full-Stack Product Engineer",
    description: "Experienced Full-Stack Product Engineer specializing in React, Next.js, Node.js, and modern web technologies.",
    images: ["/images/main-pic-big.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

import "./globals.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/images/icons/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        ></link>
        <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&family=Manrope:wght@200..800&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet"></link>
        
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        <link rel="canonical" href="https://rafael-oliveira.dev" />
      </head>
      <body>{children}</body>
    </html>
  );
}
