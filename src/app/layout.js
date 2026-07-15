import { Geist, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeProvider";
import { CartProvider } from "@/context/CartProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | Luxe Fashion",
    default: "Luxe | Premium Fashion E-Commerce",
  },
  description: "Discover a meticulously curated collection of perfectly tailored essentials. The ultimate destination for modern luxury fashion.",
  keywords: ["luxury", "fashion", "e-commerce", "clothing", "premium"],
  authors: [{ name: "Luxe Team" }],
  creator: "Luxe Fashion",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://luxe-fashion.com",
    title: "Luxe | Premium Fashion E-Commerce",
    description: "Discover a meticulously curated collection of perfectly tailored essentials.",
    siteName: "Luxe Fashion",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxe | Premium Fashion E-Commerce",
    description: "Discover a meticulously curated collection of perfectly tailored essentials.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
