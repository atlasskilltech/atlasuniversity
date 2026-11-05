import UgdxProgramPage from '@/components/Schools/Ugdx/ProgramPage';
import * as data from '@/lib/schools/ugdx/programs/b-tech-in-quantum-technology';

export const metadata = {
  title: data.meta.title,
  description: data.meta.description,
  alternates: { canonical: data.url },
};

/* reference/ugdx/undergraduate/b-tech-in-quantum-technology.php */
export default function Page() {
  return <UgdxProgramPage data={data} />;
}
