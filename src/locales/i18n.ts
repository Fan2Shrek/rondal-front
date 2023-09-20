/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { fr } from './translations/fr';

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
  },
  lng: 'fr',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
