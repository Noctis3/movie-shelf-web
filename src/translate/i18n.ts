import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { messages } from './languages';

const initI18n = async () => {
  const language = localStorage.getItem('language');
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    debug: false,
    defaultNS: 'translations',
    fallbackLng: language || 'pt',
    ns: ['translations'],
    resources: messages,
  });
};

initI18n();

export { i18n };
