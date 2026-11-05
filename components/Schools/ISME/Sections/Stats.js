import StatBand from '@/components/ui/StatBand';
import { cx } from '@/lib/cx';

/*
 * The ISME `.top-cards-wrapper` figures band — `.head-top-card.bg6/7/8` tones over their artwork,
 * mint labels — shared by the page-level band and the ones authored inside a section (9 Core
 * Advantages' research figures). 60px of bottom padding unless `.padbtm0` / `.mrgbtm0`.
 */
export const STAT_TONE = {
  bg6: { background: '#0c1f4b', image: '/assets/images/schools/isme/bba/eligible-bg-1.png' },
  bg7: { background: '#103380', image: '/assets/images/mission/mission-bg.png' },
  bg8: { background: '#00277d', image: '/assets/images/schools/isme/bba/eligible-bg-3.png' },
};

export default function IsmeStats({ b, block }) {
  return (
    /* `.wrap-patent` (Success Snapshot) paints #011136 behind the band; its `.mrgbtm0.mrgtp` adds 56px on top */
    <div data-block={block} className={cx(b.padBottom && 'pb-[60px]', b.patentWrap && 'bg-[#011136]', b.padTop && 'pt-14')}>
      <StatBand
        variant={b.lpGap ? 'defaultAutoLp' : 'defaultAuto'}
        data={b.cards.map((c) => ({
          label: c.label,
          value: c.value,
          note: c.note,
          small: c.small,
          labelColor: '#07f6a0',
          labelFixed: c.labelKind === 'isme-2',
          valueSize: b.valueSize,
          imagePosition: '100% 50%',
          ...(STAT_TONE[c.tone] ?? STAT_TONE.bg7),
        }))}
      />
    </div>
  );
}
