import { designLedPrograms } from '@/lib/homeContent';
import ProgramsSection from '@/components/Programs/ProgramsSection';

/**
 * "Design-Led Undergraduate Programs" — reference/assets/include/home-card.php:418-1309.
 * Fourteen ISDI cards (twelve B.Des, two B.Tech) on the #e12a7b accent, white buttons. Structurally
 * identical to the career block, so it reuses the same shell and slider.
 */
export default function DesignLedPrograms() {
  return <ProgramsSection section={designLedPrograms} />;
}
