/**
 * Footer content — transcribed 1:1 from reference/assets/include/footer.php.
 */

export const campus = {
  logo: { src: '/assets/logos/atlas-logo-footer.png', width: 102, height: 46, alt: 'Atlas Logo' },
  copyright: '© 2026. ATLAS SkillTech University. All Rights Reserved.',
  address:
    'ATLAS SkillTech University, Equinox Business Park - Tower 1, Off Bandra-Kurla Complex (BKC) Kurla West, Mumbai - 400070 Maharashtra',
  email: 'info@atlasuniversity.edu.in',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.836832625515!2d72.8759417!3d19.0709103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c92bc9049be3%3A0x6e303efe77de54ed!2sATLAS%20SkillTech%20University!5e0!3m2!1sen!2sin!4v1763718371037!5m2!1sen!2sin',
  mapTitle: 'ATLAS SkillTech University location on Google Maps',
};

export const socialLinks = [
  { label: 'Visit ATLAS University on X', href: 'https://x.com/atlasskilltech', icon: '/assets/icons/social-x.svg' },
  { label: 'Visit ATLAS University on Instagram', href: 'https://www.instagram.com/atlasskilltechuniversity/', icon: '/assets/icons/social-instagram.svg' },
  { label: 'Visit ATLAS University on YouTube', href: 'https://www.youtube.com/@atlasskilltechuniversity', icon: '/assets/icons/social-youtube.svg' },
  { label: 'Visit ATLAS University on LinkedIn', href: 'https://www.linkedin.com/school/atlasuniversity/', icon: '/assets/icons/social-linkedin.svg' },
];

/*
 * Programme phone directory (footer column 2).
 *   kind: 'heading' -> non-link <div>
 *   kind: 'spacer'  -> the reference's empty <div class="ft-link-at">
 *   otherwise       -> tel: link; `strong` is the bold lead-in
 */
export const phoneColumns = [
  [
    { kind: 'heading', strong: 'UG Degree Programs' },
    { strong: 'BBA', text: ' : +91 84339 10206', tel: '+918433910206' },
    // reference has href="#" here; pointed at the number it displays
    { strong: 'B.Sc. Finance ', text: ' : +91 84339 10206', tel: '+918433910206' },
    { strong: 'B.Des', text: ' : +91 77188 65341', tel: '+917718865341' },
    { strong: 'B.Tech', text: ' : +91 89768 70842', tel: '+918976870842' },
    { strong: 'BBA LLB ', text: ': +91 98917 51888', tel: '+919891751888' },
  ],
  [
    { kind: 'heading', strong: 'Summer School' },
    { strong: 'Design', text: ' : +91 80975 20607', tel: '+918097520607' },
    { strong: 'Management', text: ' : +91 89767 67157', tel: '+918976767157' },
    { strong: 'Technology', text: ' : +91 89768 70842', tel: '+918976870842' },
    { kind: 'spacer' },
    { kind: 'heading', strong: 'PG Degree Programs' },
    { text: '+91 73044 64621', tel: '+917304464621' },
    { text: '+91 7304464514', tel: '+917304464514' },
    { kind: 'spacer' },
    { kind: 'heading', strong: 'PhD Program' },
    // reference links tel:+918976870842 while displaying +917304464621;
    // the displayed number is used for both.
    { text: '+917304464621', tel: '+917304464621' },
  ],
];

/* Statutory / compliance links (footer column 3). */
export const complianceColumns = [
  [
    { label: 'NIRF', href: '/nirf' },
    { label: 'NAAC', href: 'https://atlasuniversity.edu.in/errorpages', external: true },
    { label: 'Examination', href: '/examination' },
    { label: 'Mandatory Disclosures', href: '/mandatory_disclosures' },
    { label: 'Centre for Distance & Online Education', href: 'https://atlasonline.edu.in', external: true, newTab: true },
    { label: ' Mandatory Disclosures CDOE ', href: 'https://atlasonline.edu.in/disclosure', external: true },
    { label: 'UGC Learning Resource', href: 'https://ugceresources.in/', external: true },
    { label: 'Internal Complaints Committee', href: '/internal-complaint-committee' },
    { label: 'Women Development Cell', href: '/women-development-cell' },
  ],
  [
    { label: 'Library', href: 'https://www.atlasuniversity.edu.in/library', external: true },
    { label: 'Ombudsperson', href: '/ombudsperson' },
    // reference has href="#" — no destination exists yet; left unchanged
    { label: 'NEP Coordinator', href: '#', external: true },
    { label: 'Student Grievance', href: '/grievance-redressal' },
    { label: 'Grievance Redressal Committee', href: '/mandatory-disclosure/policies/policies11' },
    { label: 'Anti Ragging Committee', href: '/anti-ragging-committee' },
  ],
];
