import type { Metadata } from "next";
import { Inter, Cairo, Vazirmatn } from "next/font/google";
import "../globals.css";
import { locales } from "@/i18n/getDictionary";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Aero - Fly Beyond",
  description: "Premium Travel Booking Application",
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params;
  const dir = lang === 'ar' || lang === 'fa' ? 'rtl' : 'ltr';
  const fontVariable = lang === 'ar' 
    ? cairo.variable 
    : lang === 'fa' 
      ? vazirmatn.variable 
      : inter.variable;

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${inter.variable} ${cairo.variable} ${vazirmatn.variable} h-full antialiased`}
      style={{ '--font-sans': `var(${fontVariable})` } as React.CSSProperties}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
