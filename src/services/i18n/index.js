import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';

import heLocal from '../../i18n/he.json';

// the translations
const resources = {
  he: {
    translation: heLocal,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'he',
    keySeparator: true, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });


export default i18n;
