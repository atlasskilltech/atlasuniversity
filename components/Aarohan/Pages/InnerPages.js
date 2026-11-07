/* about.php, the speaker pages and the 2025 guideline pages of each Aarohan year. */
import { About } from '../Sections';
import { Guideline, PageBanner, People, Quote, SpeakerProfile } from '../Pages';

export function AboutPage({ site, about, year }) {
  const a = site.assets;
  return (
    <>
      <PageBanner title={about.banner} year={year} image={a.pageBanner} assets={a} />
      <About data={about.about} year={year} />
      <People data={about} year={year} />
      {about.quote && <Quote data={about.quote} />}
    </>
  );
}

export function SpeakerPage({ site, sp, year }) {
  const a = site.assets;
  return (
    <>
      <PageBanner title={sp.banner} year={year} image={a.speakerHeader} position="inherit" assets={a} />
      <SpeakerProfile sp={sp} year={year} assets={a} />
    </>
  );
}

export function GuidelinePage({ site, page, year }) {
  const a = site.assets;
  return (
    <>
      <PageBanner title={page.banner} year={year} image={a.pageBanner} v2 assets={a} />
      <Guideline data={page} year={year} />
    </>
  );
}
