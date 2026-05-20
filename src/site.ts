export const site = {
  name: 'Jerry Chen',
  tagline: 'Full-stack Developer',
  description: 'Personal site of Jerry Chen',
} as const;

export type Site = typeof site;
