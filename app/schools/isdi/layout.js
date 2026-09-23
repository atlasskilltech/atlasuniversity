import ISDIHeader from '@/components/Schools/ISDI/Header/ISDIHeader';
import ISDIFooter from '@/components/Schools/ISDI/Footer/ISDIFooter';

// ref reference/schools/isdi/index.php — $title / $description
export const metadata = {
  title: 'ISDI School of Design & Innovation',
  description:
    'Explore design programs, careers, studios, mentors and start your journey into innovation and creativity.',
};

/**
 * Every ISDI page shares reference/schools/isdi/assets/include/header.php and
 * footer.php, so both are mounted here once rather than on each page. The ATLAS
 * header and footer step aside on /schools/* (components/Schools/MainSiteOnly).
 */
export default function ISDILayout({ children }) {
  return (
    <>
      <ISDIHeader />
      {children}
      <ISDIFooter />
    </>
  );
}
