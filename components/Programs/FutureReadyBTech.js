import { futureReadyBTech } from '@/lib/homeContent';
import ProgramsSection from '@/components/Programs/ProgramsSection';

/**
 * "Future-Ready B.Tech Programs" — reference/index.php:952-1143.
 * Four uGDX B.Tech cards on the #ed1a3b accent, white buttons.
 *
 * With only four cards the track is 1252px wide, so above ~1280px it very
 * nearly fills the container and the carousel has almost nothing left to
 * scroll (10px at 1440px, two pagination positions). That is the reference's
 * behaviour too — it is the same slider, just with fewer slides in it.
 */
export default function FutureReadyBTech() {
  return <ProgramsSection section={futureReadyBTech} />;
}
