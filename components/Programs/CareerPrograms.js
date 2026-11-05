import { careerPrograms } from '@/lib/homeContent';
import ProgramsSection from '@/components/Programs/ProgramsSection';

/**
 * "Career-Focused Undergraduate Programs" — reference/index.php:248-618.
 * Eight ISME undergraduate cards on the #009fe0 accent, white buttons.
 * Layout and behaviour live in ProgramsSection / ProgramSlider.
 */
export default function CareerPrograms() {
  return <ProgramsSection section={careerPrograms} />;
}
