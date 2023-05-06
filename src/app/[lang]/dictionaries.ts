// import "server-only";

export const getDictionary = async (locale: "pt-BR" | "en-US") => {
  return import(`@/dictionaries/${locale}.json`).then(
    (module) => module.default
  );
};
