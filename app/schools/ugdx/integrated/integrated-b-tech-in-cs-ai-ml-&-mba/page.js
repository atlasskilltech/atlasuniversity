import UgdxProgramPage from '@/components/Schools/Ugdx/ProgramPage';
import * as data from '@/lib/schools/ugdx/programs/integrated-b-tech-in-cs-ai-ml-mba';

export const metadata = {
  title: data.meta.title,
  description: data.meta.description,
  alternates: { canonical: data.url },
};

/* reference/ugdx/integrated/integrated-b-tech-in-cs-ai-ml-&-mba.php */
export default function Page() {
  return <UgdxProgramPage data={data} />;
}
