import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import "@/styles/globals.css";
import { defaultLocale } from "@/utils/config";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Alegreya, Exo_2 } from "next/font/google";

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-alegreya",
  display: "swap",
});
const exo_2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-exo_2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await getLocale()) || defaultLocale;
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full">
      <head>
        <meta
          name="google-site-verification"
          content="CImznmAXTPxjKZYXpQ8wPadZfNYcpTnUpHsaqgKQfyI"
        />
      </head>
      <body
        className={`${alegreya.variable} ${exo_2.variable} bg-white font-alegreya text-black h-full flex flex-col`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1  ">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
