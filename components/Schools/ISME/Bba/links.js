/*
 * The footer's `navigationMap` (reference/schools/isme/assets/include/footer.php): each major tab
 * id on a BBA page navigates to that major's own page and section. Transcribed as production
 * serves it (the commented-out `bba-hons/…` variant above it in the file is dead).
 */
const BBA = '/schools/isme/programs/undergraduate/bba-hons-major';

export const MAJOR_LINKS = {
  'cards-marketing-bba': `${BBA}/majoring-in-marketing#marketing-section`,
  'cards-finance-bba': `${BBA}/majoring-in-finance#finance-section`,
  'cards-ba-bba': `${BBA}/majoring-in-business-analytics#ba-section`,
  'cards-ba-ai-em': `${BBA}/majoring-in-ai-emerging-technologies#ai-section`,
  'cards-ba-dba': `${BBA}/majoring-in-digital-branding-advertising#dba-section`,
  'cards-ba-bp': `${BBA}/majoring-in-business-psychology#bp-section`,
  'cards-hyper-mba': '/schools/isme/programs/postgraduate/mba-hyper/mba-with-specialisation#hyper-mba-selection',
  'cards-dual-mba': '/schools/isme/programs/postgraduate/dual-specialisation/marketing-finance#dual-mba-selection',
};
