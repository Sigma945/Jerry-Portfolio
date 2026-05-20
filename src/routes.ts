import type { TKey } from './i18n';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a path with the site's configured base. Accepts paths with or without leading slash. */
export function path(p: string): string {
  return `${base}${p.startsWith('/') ? p : `/${p}`}`;
}

export interface RouteDef {
  href: string;
  i18nKey: TKey;
}

export const routes = {
  home:     { href: path('/'),         i18nKey: 'nav.home' },
  projects: { href: path('/projects'), i18nKey: 'nav.projects' },
  blog:     { href: path('/blog'),     i18nKey: 'nav.blog' },
  about:    { href: path('/about'),    i18nKey: 'nav.about' },
} as const satisfies Record<string, RouteDef>;

export type RouteKey = keyof typeof routes;

/** Order used to render the navigation bar. */
export const navOrder: RouteKey[] = ['home', 'projects', 'blog', 'about'];
