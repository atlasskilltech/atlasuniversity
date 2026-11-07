/*
 * What differs between the four "Experience The Extraordinary" pages: the school list (content.js)
 * and the lead-form slot. Read off each page's PRODUCTION DOM (2026-11-07), not the PHP — production
 * matches the archived index.php of each.
 *
 * Desktop slot (`#getInfo`, >= 768) / mobile slot (`#getInfoM`, < 768):
 *   lp23, lp24, lp25  desktop: ATLAS CRM loader `crm.atlasskilltech.app/widgets/6a8e77cc…/embed.js`
 *                     (`data-atlas-width="100%" data-atlas-height="720"`).
 *                     mobile: upstream is an iframe on the UAT host
 *                     (`uat-crm.atlasskilltech.app/widgets/6a8e77cc…/embed`, utm_* forwarded) — a
 *                     UAT endpoint is never published here. The SAME public widget id is live on the
 *                     production CRM host (it is what the desktop slot loads), so the mobile slot
 *                     renders that production widget in the same 600px frame. To restore a bare
 *                     placeholder instead, set `mobile: { kind: 'placeholder' }`.
 *   lp25/ismeug       NoPaperForms on both: desktop `370be7ce…` (data-height 520px), mobile
 *                     `7af8c79c…` (530px). The widget's iframe is inline, so its box measures the
 *                     frame + a 5px descender (525 / 535); `box` holds that height before the script
 *                     arrives (and on localhost, where NoPaperForms refuses the referrer).
 *
 * lp23 additionally embeds the ERP chatbot (`atlasskilltech.app/erp/assets/chatbot/chatbot.js` with a
 * hidden `.my_chatbot` key div). It is a third-party script this project does not integrate, so it is
 * NOT loaded — recorded in the migration report.
 *
 * Every page's `#enquire-form-modal` (posting to submit.php) is commented out upstream on all four,
 * so there is no modal to port.
 */
const CRM_ID = '6a8e77cc8da6fec8fd623ff5';

const CRM_FORMS = {
  desktop: { kind: 'crm-script', id: CRM_ID, attrs: { 'data-atlas-width': '100%', 'data-atlas-height': '720' } },
  mobile: { kind: 'crm-iframe', id: CRM_ID, height: 600 },
};

export const VARIANTS = {
  lp23: { key: 'lp23', forms: CRM_FORMS },
  lp24: { key: 'lp24', forms: CRM_FORMS },
  lp25: { key: 'lp25', forms: CRM_FORMS },
  ismeug: {
    key: 'ismeug',
    forms: {
      desktop: { kind: 'npf', widget: '370be7cef59b0556ff2f4c602236a5ae', height: '520px', box: 'min-h-[525px]' },
      mobile: { kind: 'npf', widget: '7af8c79cb041b0a2c1f3fa7d4c01a466', height: '530px', box: 'min-h-[535px]' },
    },
  },
};
