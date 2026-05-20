export const site = {
  name: 'Jerry Chen',
  tagline: 'Full-stack Developer',
  description: 'Personal site of Jerry Chen',
  social: {
    email: 'jerry258038@gmail.com',
    github: 'https://github.com/Sigma945',
    rss: '/rss.xml',
  },
} as const;

export type Site = typeof site;
