import { advantagesContent } from '@/lib/advantagesContent';
import VideoSection from '@/components/Advantages/VideoSection';
import CareerSupportCard, { CAREER_CARD_ROW } from '@/components/ui/CareerSupportCard';
import { COMMON_WRAPPER } from '@/components/ui/ContentCardB';

/**
 * "Learning Without Borders" — port of `atlas-advantages.php:608-663`
 * (`section.section > .container > (.head-wrap.top, .sub-heading.mrgbtm,
 *   .center-image-full-wrap, .common-wrapper > .common-flex-26-wrap >
 *   3 x .career-sup-card.ugdx)`).
 *
 * Heading, button, video and three cards, on the shared `VideoSection` and
 * `CareerSupportCard`. This section's wrapper is the plain
 * `.center-image-full-wrap`, which is square, so `rounded` is not set.
 *
 * The cards carry two things /success-stories' do not: `.cr-title.isdi`, which
 * is Poppins rather than Manrope, and a circular `.btn-wrap-circular` badge
 * pinned to the photograph's top-right.
 */
export default function GlobalLearning() {
  const { global: globalLearning } = advantagesContent;

  return (
    <VideoSection
      heading={globalLearning.heading}
      subheading={globalLearning.subheading}
      button={globalLearning.button}
      embed={globalLearning.embed}
    >
      {/* ref .common-wrapper > .common-flex-26-wrap */}
      <div className={COMMON_WRAPPER}>
        <div className={CAREER_CARD_ROW}>
          {globalLearning.cards.map((card) => (
            <CareerSupportCard key={card.title} card={card} titleVariant="poppins" />
          ))}
        </div>
      </div>
    </VideoSection>
  );
}
