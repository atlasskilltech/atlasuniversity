/* An Aarohan year's index.php, section by section in the order production renders it. */
import Hero from '../Hero';
import Register from '../Register';
import SpeakerGroups from '../SpeakerGroups';
import Schedule from '../Schedule';
import Counter from '../Counter';
import { About, Features, Sponsors, StickyCta } from '../Sections';

export default function HomePage({ site, home, year }) {
  const a = site.assets;
  return (
    <>
      <Hero hero={home.hero} year={year} assets={a} />
      <Register data={home.register} assets={a} />
      <SpeakerGroups groups={home.speakerGroups} year={year} />
      <Schedule data={home.schedule} year={year} assets={a} />
      {home.sponsors && <Sponsors data={home.sponsors} year={year} />}
      <About data={home.about} year={year} />
      <Counter data={home.counter} year={year} />
      <Features data={home.features} year={year} assets={a} />
      <StickyCta data={home.stickyCta} />
    </>
  );
}
