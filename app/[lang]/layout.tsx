import { Inter } from "next/font/google";
import { languages, type Locale } from "@/app/i18n/settings";
import { I18nProvider } from "@/app/i18n/providers";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return languages.map((lng) => ({ lang: lng }));
}

export const metadata = {
  title: "DevTools Hub",
  description: "Discover and explore the best developer tools",
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}