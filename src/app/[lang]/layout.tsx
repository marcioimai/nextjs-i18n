import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next.js with i18n",
  description: "Next.js app with internationalization based on user preference",
};

export const generateStaticParams =
  process.env.NODE_ENV !== "development"
    ? async () => {
        return [{ lang: "en-US" }, { lang: "pt-BR" }, { lang: "es-ES" }];
      }
    : undefined;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
