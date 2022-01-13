const { Translator } = require('@azizka/i18n');

const enValues = require('../../locales/en');
const ruValues = require('../../locales/ru');
const kzValues = require('../../locales/kz');

module.exports = {
  en: Translator.create(enValues),
  ru: Translator.create(ruValues),
  kz: Translator.create(kzValues)
};
