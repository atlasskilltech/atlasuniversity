import { designLedPrograms } from '@/lib/homeContent';
import ProgramsSection from '@/components/Programs/ProgramsSection';

/**
 * "Design-Led Undergraduate Programs" — reference/index.php:623-949.
 * Seven ISDI B.Des cards on the #e12a7b accent, white buttons. Structurally
 * identical to the career block, so it reuses the same shell and slider.
 */
export default function DesignLedPrograms() {
  return <ProgramsSection section={designLedPrograms} />;
}
