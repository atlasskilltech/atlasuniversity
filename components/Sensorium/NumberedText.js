/* Eona numbered text (eona_core_numbered_text, alignment left): the number in the theme's HenriDidot at
 * 112px / line-height .7 in #dbb570, the h4 title pulled 29px up over it and indented 29px. */
import { DIDOT, H4 } from '@/lib/sensorium/ui';

export default function NumberedText({ number, title }) {
  return (
    <div className="text-left">
      <div className={`${DIDOT} text-[112px] leading-[0.7] text-[#dbb570]`}>{number}</div>
      <h4 className={`${H4} relative -top-[29px] mb-[14px] pl-[29px]`}>{title}</h4>
    </div>
  );
}
