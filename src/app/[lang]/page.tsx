import { headers } from "next/dist/client/components/headers";
import Link from "next/link";
import { getDictionary } from "./dictionaries";
import { US, BR, ES } from "country-flag-icons/react/3x2";

const locales = [
  {
    label: "en-US",
    icon: <US height={12} width={18} />,
  },
  {
    label: "pt-BR",
    icon: <BR height={12} width={18} />,
  },
  {
    label: "es-ES",
    icon: <ES height={12} width={18} />,
  },
];

export default async function Home({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as "pt-BR" | "en-US"); // en
  const acceptLanguage = headers().get("accept-language");
  const userlang = acceptLanguage?.split(";")[0]?.split(",")[0];

  return (
    <div className="max-w-sm flex flex-col items-center mx-auto my-8">
      <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
        {locales.map((locale) => {
          const styles =
            params.lang === locale.label
              ? "text-blue-500 bg-white shadow-sm"
              : "text-gray-500 hover:text-gray-700";
          return (
            <Link key={locale.label} href={`/${locale.label}`} passHref>
              <button
                className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm focus:relative ${styles}`}
              >
                {locale.icon}
                {locale.label}
              </button>
            </Link>
          );
        })}
      </div>
      <p className="text-center mt-8">
        {dict.welcome}
        <br />
        <br />
        {dict.description}
        <br />
        <br />
        {dict.userlang}: {userlang}
        <br />
        {dict.currlang}: {params.lang}
      </p>
    </div>
  );
}
