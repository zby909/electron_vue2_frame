/*
 * @Description:
 * @Author: zby
 * @Date: 2022-03-10 17:57:35
 * @FilePath: \tfl-client\src\lang\index.js
 * @LastEditors: zby
 * @Reference:
 */
import Vue from 'vue';
import VueI18n from 'vue-i18n';
// 引入element-ui的组件国际化
import ElementLocale from 'element-ui/lib/locale';
import elementEnLocale from 'element-ui/lib/locale/lang/en';
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN';
// 引入vxe-table的组件国际化
import { VXETable } from 'vxe-table';
import vxeTableZh from 'vxe-table/lib/locale/lang/zh-CN.js';
import vxeTableEn from 'vxe-table/lib/locale/lang/en-US.js';
// 引入本地自定义的国际化字典
import enLocale from './en';
import zhLocale from './zh';

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale,
    ...vxeTableEn,
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale,
    ...vxeTableZh,
  },
};

export function getLanguage() {
  const chooseLanguage = localStorage.getItem('language');
  if (chooseLanguage) return chooseLanguage;

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }
  return 'en';
}

const i18n = new VueI18n({
  locale: getLanguage(),
  messages,
});

ElementLocale.i18n((key, value) => i18n.t(key, value));
VXETable.setup({
  i18n: (key, value) => i18n.t(key, value),
});

export default i18n;
