/* Eona portfolio-category archive: page title "Archive" with Home / <category> breadcrumbs, then the
 * archive's portfolio list - "fixed" masonry (square items, images covering), 3 columns (2 at <=768,
 * 1 at <=680, the theme's predefined responsive set), newest first, info-on-hover "fade-in-invert"
 * (black .72 panel, white title and category). Production enables "load more" pagination but every
 * archive fits on one page (posts_per_page -1), so no button is printed - none here either. */
import { GRID } from '@/lib/sensorium/ui';
import PageTitle from './PageTitle';
import PortfolioList from './PortfolioList';

const PRE3 = [[Infinity, 3], [768, 2], [680, 1]];

export default function PortfolioCategory({ cat }) {
  return (
    <>
      <PageTitle title={cat.pageTitle} crumbs={[{ name: 'Home', href: '/sensorium' }, { name: cat.crumb }]} />
      <div className={`${GRID} py-[120px]`}>
        <PortfolioList items={cat.items} cols={PRE3} fixed variant="fade-in-invert" sizes="(max-width: 680px) 100vw, (max-width: 768px) 50vw, 33vw" />
      </div>
    </>
  );
}
