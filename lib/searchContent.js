/**
 * Copy for /search (components/Search/SearchPage.js), from reference/search.php.
 *
 * Transcribed from the reference: the placeholder, the loader text, the two
 * badges, "Recent Searches", "Clear All", and the "Searching with AI…" /
 * "AI Response for:" / "Previous Search:" / "⚠️ Error" status lines.
 *
 * New, because the reference had no equivalent: the Enquire-popup wording (the
 * legacy page had a mandatory lead form instead), the idle line (the reference
 * printed a literal "Here are 0 results :"), and the error messages, which the
 * legacy page phrased for a developer ("check your API key in config.php").
 */

const IMG = '/assets/images/examination';

export const search = {
  meta: {
    title: 'AI Search – ATLAS SkillTech University',
    description:
      'Ask the ATLAS AI guide about programmes, admissions, fees, campus life and more at ATLAS SkillTech University, Mumbai.',
    canonical: 'https://atlasuniversity.edu.in/search',
  },

  /* ref img.header-image-inner — the same mandatory-disclosure photograph and
   * srcset /examination uses, with this page's own `sizes`. */
  hero: {
    src: `${IMG}/mandatory-disclosure-1.png`,
    srcSet: `${IMG}/mandatory-disclosure-1-p-500.png 500w, ${IMG}/mandatory-disclosure-1-p-800.png 800w, ${IMG}/mandatory-disclosure-1-p-1080.png 1080w, ${IMG}/mandatory-disclosure-1.png 1366w`,
    sizes: '(max-width: 1366px) 100vw, 1366px',
  },

  placeholder: 'Ask me anything... Courses, People, or Campus secrets - Your AI guide awaits',
  inputLabel: 'Ask the ATLAS AI guide',
  submitLabel: 'Search',

  loading: 'Loading AI Response...',
  aiBadge: '🤖 AI Assistant',
  atlasBadge: 'ATLAS SkillTech University',

  idle: 'Ask a question above to see an AI answer.',
  searching: 'Searching with AI...',
  resultPrefix: 'AI Response for:',
  previousPrefix: 'Previous Search:',
  errorTitle: '⚠️ Error',

  historyTitle: 'Recent Searches',
  clearLabel: 'Clear All',
  clearConfirm: 'Click again to clear',

  tooShort: 'Please type at least 3 characters.',
  genericError: 'Sorry, something went wrong. Please try again.',
  networkError: 'Network error. Please check your connection and try again.',
  retryLabel: 'Try again',

  /* the Enquire popup (ATLAS CRM widget) */
  enquireLabel: 'Enquire Now',
  continueLabel: 'Continue to AI Search',
  continueNote: 'You can use AI Search without filling in this form.',
  gateTitle: 'Your AI guide to ATLAS',
  gateText:
    'Would you like an admissions counsellor to get in touch? Use Enquire Now to share your details — or go straight to AI Search.',
};
