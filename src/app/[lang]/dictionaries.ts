export const getDictionary = async (locale: "pt-BR" | "en-US" | "es-ES") => {
  return import(`@/dictionaries/${locale}.json`).then(
    (module) => module.default
  );
};
