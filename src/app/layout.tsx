export const metadata = {
  title: "Rafael Oliveira - Portfolio",
  description: "Rafael Oliveira's portfolio",
};

import "./globals.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
      <body>{children}</body>
    </html>
  );
}
