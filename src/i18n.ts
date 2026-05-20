export type Lang = 'zh' | 'en';
export const defaultLang: Lang = 'zh';

export const translations = {
  zh: {
    'nav.home': '首頁',
    'nav.about': '關於',
    'nav.projects': '作品',
    'nav.blog': '文章',
    'nav.experiments': '實驗',
    'nav.resume': '履歷',
    'home.viewProjects': '查看作品',
    'home.viewResume': '我的履歷',
    'projects.read': '查看 →',
    'page.about': '關於',
    'page.projects': '作品',
    'page.blog': '文章',
    'page.experiments': '實驗',
    'page.resume': '履歷',
    'lang.label': '切換語言',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.experiments': 'Experiments',
    'nav.resume': 'Resume',
    'home.viewProjects': 'View Projects',
    'home.viewResume': 'View Resume',
    'projects.read': 'Read →',
    'page.about': 'About',
    'page.projects': 'Projects',
    'page.blog': 'Blog',
    'page.experiments': 'Experiments',
    'page.resume': 'Resume',
    'lang.label': 'Toggle language',
  },
} as const;

export type TKey = keyof typeof translations.zh;

export function t(key: TKey, lang: Lang = defaultLang): string {
  return translations[lang][key];
}
