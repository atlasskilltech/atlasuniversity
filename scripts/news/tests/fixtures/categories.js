/**
 * ATLAS News — Stage 2 sample categories.
 *
 * Shape = one `atlasnews_categories` row as the repository maps it (slug, name, description,
 * show_in_menu, menu_order, seo_*). The top-level sections follow the WordPress News site's own
 * navigation (Academic, Student Life, Global, Industry); "Achievements" was a Student Life
 * sub-category there and is promoted here, and "Insights" carries explainers and analysis.
 */
export const CATEGORIES = Object.freeze([
  {
    slug: 'academic',
    name: 'Academic',
    description: 'Programmes, pedagogy and the ideas shaping how ATLAS teaches — from studio-based engineering to boardroom simulations.',
    showInMenu: true,
    menuOrder: 1,
  },
  {
    slug: 'student-life',
    name: 'Student Life',
    description: 'Festivals, showcases, clubs and the everyday rhythm of a campus in the middle of Mumbai.',
    showInMenu: true,
    menuOrder: 2,
  },
  {
    slug: 'industry',
    name: 'Industry',
    description: 'Masterclasses, live projects, placements and the practitioners who bring the working world into the classroom.',
    showInMenu: true,
    menuOrder: 3,
  },
  {
    slug: 'global',
    name: 'Global',
    description: 'International faculty, partnerships, exchanges and the conversations that connect ATLAS to the world.',
    showInMenu: true,
    menuOrder: 4,
  },
  {
    slug: 'achievements',
    name: 'Achievements',
    description: 'Awards, milestones and the work our students and graduates are proud of.',
    showInMenu: true,
    menuOrder: 5,
  },
  {
    slug: 'insights',
    name: 'Insights',
    description: 'Explainers and analysis from the ATLAS News Desk on education, skills and the future of work.',
    showInMenu: true,
    menuOrder: 6,
  },
]);
