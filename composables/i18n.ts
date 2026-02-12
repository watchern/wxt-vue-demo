import { createI18n } from 'vue-i18n';
// Use your default locale when importing the schema
import type schema from '~/assets/locales/zh.json';
import messages from '@intlify/unplugin-vue-i18n/messages';

export type I18nSchema = typeof schema;
export type I18nLocales = 'en' | 'zh';

const getInitialLocale = async () => {
  const savedLang = await storage.getItem<string>('local:user-lang');
  // @ts-expect-error
  let locale = savedLang?.value ?? browser.i18n.getUILanguage().slice(0, 2);
  console.log('Initial locale:', locale);
  await storage.setItem('local:user-lang', locale);
  return locale;
};

export default createI18n<[I18nSchema], I18nLocales>({
    legacy: false,
    // 需在vite设置 build: target: 'esnext',
    locale: await getInitialLocale(),
    fallbackLocale: 'zh',
    messages: messages as Record<I18nLocales, I18nSchema>,
});
