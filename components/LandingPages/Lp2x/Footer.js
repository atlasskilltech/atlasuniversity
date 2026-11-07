import { cx } from '@/lib/cx';
import CurrentYear from '../shared/CurrentYear';
import { COL, CONTAINER, FONT_R, MD, ROW } from './ui';

const ADDRESS = [
  'ATLAS SKILLTECH UNIVERSITY',
  'TOWER 1 - EQUINOX BUSINESS PARK,',
  'OFF BANDRA-KURLA COMPLEX (BKC),',
  'LBS MARG, KURLA WEST,',
  'MUMBAI – 400 070.',
];

function Address() {
  return ADDRESS.map((l, i) => (
    <span key={l}>
      {i > 0 && <br />}
      {l}
    </span>
  ));
}

/**
 * `footer > section.footer1` — black, 60px / 3% padding, Roboto. From 768 the address block sits in
 * the left `col-md-6` (h3 "TALK TO US", the address 4% below it, the copyright line); below 768 the
 * same copy moves into the right column's `.mobile-visible` block (20px 0 padding, the heading's
 * `.mt-4` = 15px). The copyright year is written at runtime upstream (`document.write`), so it is
 * rendered on the client here as well.
 */
export default function Footer() {
  const p = 'mb-[10px] text-[14px] font-bold leading-[1.42857] text-[#e7e7e7]';
  const h3 = 'mb-[10px] text-[24px] font-bold uppercase leading-[1.1] text-white';
  return (
    <footer className={FONT_R}>
      <section className="bg-black px-[3%] py-[60px]">
        <div className={cx(CONTAINER, 'relative')}>
          <div className={ROW}>
            <div className={cx(COL, MD[6])}>
              <h3 className={cx(h3, 'mt-0 max-md:hidden')}>TALK TO US</h3>
              <p className={cx(p, 'mt-[4%] max-md:hidden')}>
                <Address />
              </p>
              <div className="text-white max-md:hidden">
                <p className={p}>
                  ©<CurrentYear />. ATLAS SkillTech University, All Rights Reserved.
                </p>
              </div>
            </div>
            <div className={cx(COL, MD[6])}>
              <div className="relative min-h-[1px] w-full px-0 py-[20px] md:hidden">
                <h3 className={cx(h3, 'mt-[15px]')}>TALK TO US</h3>
                <p className={p}>
                  <Address />
                </p>
                <p className={p}>
                  ©<CurrentYear />. ATLAS SkillTech University, All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
