import Header from '@/components/Header/Header';
import HeaderSpacer from '@/components/Header/HeaderSpacer';
import Footer from '@/components/Footer/Footer';

/*
 * reference/schools/isme/note.php — an upstream placeholder. It includes the ATLAS root
 * header.php / footer.php (not ISME's) around the single word "test".
 *
 * DEVIATION: production serves it unstyled — the ATLAS includes run without the ATLAS page sheet,
 * so the menu is a run of raw links, the footer starts 40px from the top and the map embed sits
 * bare in the flow (verified by screenshot at 1440). That breakage is not reproduced: the authored
 * intent — the ATLAS chrome, then "test" — is. The ISME layout steps its own chrome aside for this
 * path (components/Schools/ISME/ISMEChromeOnly). Flagged in MIGRATION-ISME.md as a page that
 * probably should not be public.
 */
export const metadata = {
  title: 'ATLAS SkillTech University',
  description: 'Get in touch with Atlas Skilltech.',
  keywords: 'atlas, contact',
};

export default function NotePage() {
  return (
    <>
      <Header />
      <main>
        <HeaderSpacer />
        test
      </main>
      <Footer />
    </>
  );
}
