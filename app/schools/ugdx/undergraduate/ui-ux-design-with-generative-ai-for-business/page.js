import UgdxProgramPage from '@/components/Schools/Ugdx/ProgramPage';
import * as data from '@/lib/schools/ugdx/programs/ui-ux-design-with-generative-ai-for-business';

export const metadata = {
  title: data.meta.title,
  description: data.meta.description,
  alternates: { canonical: data.url },
};

/* reference/ugdx/undergraduate/ui-ux-design-with-generative-ai-for-business.php */
export default function Page() {
  return <UgdxProgramPage data={data} />;
}
