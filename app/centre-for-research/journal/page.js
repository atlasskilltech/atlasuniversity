import RevealOnView from '@/components/Journal/RevealOnView';
import { JournalHero, JournalBody, JournalDetails, JournalAim, JournalPublisher, JournalPapers } from '@/components/Journal/Sections';
import { hero, journal, aim, publisher, editor, desk, board, review, assistant, papers } from '@/lib/journalContent';

/* ref journal/index.php `$title` / `$description` / `$keywords` (production renders the same) */
const TITLE = 'Academic Journal | Atlas University Mumbai';
const DESCRIPTION =
  'What happens when finance meets AI? Study BBA in finance with AI and emerging technologies at Atlas ISME — apply fintech to financial planning strategy.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'atlas, contact',
  alternates: { canonical: 'https://atlasuniversity.edu.in/journal/' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /journal — the ATLAS Innovation Review (reference/new pages/journal.zip -> journal/index.php;
 * production serves it at /journal/). Inside the page's own `#body` wrapper (max 1920px, Poppins over
 * Bootstrap's 16px/1.5 #212529): hero · Journals · Aim and Scope · Name and Address of Publisher (the
 * publisher card, Editor-in-Chief with the profile tabs, Editorial Desk, Board, Review Committee,
 * Assistant) · Research Papers (8 PDFs). `journal/old.php` is an obsolete draft and is not ported.
 * `font-poppins-library` is the self-hosted Poppins 200-700 family /library already uses for the same
 * template (this page @imports every Poppins weight and renders 400 / 500 / 600 / 700).
 */
export default function JournalPage() {
  return (
    <div data-journal-root className="mx-auto max-w-[1920px] font-poppins-library text-[16px] leading-[1.5] text-[#212529]">
      <JournalHero data={hero} />
      <JournalBody>
        <JournalDetails data={journal} />
        <JournalAim data={aim} />
        <JournalPublisher
          heading={publisher.heading}
          publisher={publisher.items}
          editor={editor}
          desk={desk}
          board={board}
          review={review}
          assistant={assistant}
        />
        <JournalPapers data={papers} />
      </JournalBody>
      <RevealOnView />
    </div>
  );
}
