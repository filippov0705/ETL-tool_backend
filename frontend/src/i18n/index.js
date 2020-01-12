import { addLocaleData } from "react-intl";
import enLocaleData from "react-intl/locale-data/en";
import ruLocaleData from "react-intl/locale-data/ru";
import enWording from "./translations/en";
import ruWording from "./translations/ru";
import locale from "browser-locale";

const currentLocale = locale();
const languageWithoutRegionCode = currentLocale.toLowerCase().split(/[_-]+/)[0];

addLocaleData([...enLocaleData, ...ruLocaleData]);
const localeWordings = { en: enWording, ru: ruWording };

const messages =
  localeWordings[languageWithoutRegionCode] ||
  localeWordings[currentLocale] ||
  localeWordings.en;

const localeToUse =
  localeWordings[currentLocale] || localeWordings[currentLocale]
    ? currentLocale
    : "en";

export default {
  currentLocale: localeToUse,
  localeWording: messages
};
