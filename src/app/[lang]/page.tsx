import { headers } from "next/dist/client/components/headers";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "./dictionaries";

const locales = ["en-US", "pt-BR"];

export default async function Home({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as "pt-BR" | "en-US"); // en
  const acceptLanguage = headers().get("accept-language");
  const userlang = acceptLanguage?.split(";")[0]?.split(",")[0];
  return (
    <>
      <div>
        {locales.map((locale) => (
          <div key={locale}>
            <Link href={`/${locale}`}>{locale}</Link>
          </div>
        ))}
      </div>
      <div>
        <div>
          {dict.userlang}: {userlang}
        </div>
        <div>
          {dict.currlang}: {params.lang}
        </div>
      </div>
    </>
  );
}
