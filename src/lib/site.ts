import data from '../data/site.yml';

/** Shape of src/data/site.yml. Mirrored in `.pages.yml` for the CMS. */
export interface SiteData {
  name: string;
  title: string;
  tagline: string;
  roles: string[];
  location?: string;
  available: boolean;
  availability_label?: string;
  description: string;
  email?: string;
  links?: {
    github?: string;
    linkedin?: string;
  };
  home: {
    intro: string;
    actions: { label: string; href: string }[];
  };
  footer_note?: string;
}

export const site = data as SiteData;

/** The primary navigation. Order here is the order in the header. */
export const nav = [
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Writing', href: '/blog' },
  { label: 'Photography', href: '/photography' },
] as const;
