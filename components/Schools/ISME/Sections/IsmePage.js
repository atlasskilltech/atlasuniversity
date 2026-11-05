import { Fragment } from 'react';
import Hero from '@/components/Schools/ISDI/About/Hero';
import { IsmeIconSection } from './Sections';
import Explore from './Explore';
import EventRotator from './EventRotator';
import { Article, ArticleHeader, Breadcrumbs } from './Article';
import CourseHero from '@/components/Schools/ISME/Bba/CourseHero';
import Guide from '@/components/Schools/ISME/Bba/Guide';
import Banner from '@/components/Schools/ISME/Bba/Banner';
import AnchorMenu from '@/components/Schools/ISDI/About/AnchorMenu';
import KeyDates from '@/components/Schools/ISDI/Admission/KeyDates';
import AdmEligibility from '@/components/Schools/ISME/Admission/Eligibility';
import Fees from '@/components/Schools/ISME/Admission/Fees';
import SearchQuestion from '@/components/About/SearchQuestion';
import FAQ from '@/components/Home/FAQ';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';
import LogoStrip from '@/components/Schools/ISDI/LogoStrip';
import TextHead from './TextHead';
import WfFaq from './WfFaq';
import OutcomesBook from '@/components/Schools/ISDI/Success/OutcomesBook';
import HomeHero from '@/components/Hero/Hero';
import OutcomesHeading from '@/components/Schools/ISME/Home/OutcomesHeading';
import OutcomesStack from '@/components/Schools/ISME/Home/OutcomesStack';
import HomeAwards from '@/components/Schools/ISDI/Home/Awards';
import International from '@/components/Schools/ISME/Home/International';
import { ismeHero, ismeAwards, ismeSearch } from '@/lib/schools/isme/home/hero';
import { ismeInternational } from '@/lib/schools/isme/home/international';
import Motion from '@/components/Schools/ISME/Home/Motion';
import FutureInAction from '@/components/Schools/ISME/Home/FutureInAction';
import ThoughtLeadership from '@/components/Schools/ISME/Home/ThoughtLeadership';
import Industry from '@/components/Schools/ISME/Home/Industry';
import ReadyToBuild from '@/components/Schools/ISDI/Home/ReadyToBuild';
import PinkBanner from '@/components/Schools/ISDI/Home/PinkBanner';
import { ismeFaqBanner, ismeReadyToBuild, ismeThisWeek } from '@/lib/schools/isme/home/hero';
import ThisWeek from '@/components/Schools/ISME/Home/ThisWeek';
import { ismeDifferent } from '@/lib/schools/isme/home/different';
import { ismeAdvisory } from '@/lib/schools/isme/home/advisory';
import { ismeMotion } from '@/lib/schools/isme/home/motion';
import { ismeFuture } from '@/lib/schools/isme/home/future';
import { ismePeople } from '@/lib/schools/isme/home/people';
import { ismeThoughtLeadership } from '@/lib/schools/isme/home/thoughtLeadership';
import { ismeIndustry } from '@/lib/schools/isme/home/industry';


import Programs from '@/components/Schools/ISME/Home/Programs';
import RingHero from '@/components/Schools/ISDI/ProgramsUg/Hero';
import LifeHero from '@/components/Life/LifeHero';
import CampusHero from '@/components/Campus/CampusHero';
import IsmeStats from './Stats';
import PeopleVoices from '@/components/Schools/ISME/Home/PeopleVoices';
import EnquiryForm from '@/components/Schools/ISDI/SummerSchool/EnquiryForm';
import { PlainSection } from './Sections';
import StoryPair from '@/components/Schools/ISDI/StoryPair';
import StudentWall from '@/components/Schools/ISDI/StudentWall';
import GridGallery from '@/components/ui/GridGallery';
import InfoBanner from '@/components/ui/InfoBanner';
import { ElectiveTabs, Journeys, StoryX } from './Pathway';
import { LpAbout, LpCards, LpDisclaimer, LpHero, LpLearn, LpStack, LpStory, LpTabs } from './PathwayLP';
import { H2, SUB_INNER, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';
import { cx } from '@/lib/cx';
import MissionVision from '@/components/About/MissionVision';
import ShapingViksitBharat from '@/components/Schools/ISDI/About/ShapingViksitBharat';
import Recognition from '@/components/Schools/ISDI/About/Recognition';
import AdvisoryBoard from '@/components/Schools/ISME/Home/AdvisoryBoard';
import HeadWrap from '@/components/Schools/ISME/HeadWrap';
import Carousel from '@/components/Carousel/Carousel';
import CardTypeE from '@/components/Schools/ISDI/CardTypeE';
import CoreCards from '@/components/Schools/ISME/Home/CoreCards';

/* `.h2-tag` margins by modifier on the ISME sheet */
const H2_MB = { mrg16: 'mb-4 max-md:mb-2', mrg32: 'mb-8', mrgtbm0: 'mb-0' };
const h2mb = (mods) => H2_MB[(mods ?? []).find((m) => H2_MB[m])] ?? 'mb-14 max-md:mb-8';

/*
 * `.grid-gallery(.h2-tag)` — the shared masonry gallery on its plain card (the ISME sheet's card
 * heights are the ATLAS ones it already encodes). `.h2-tag` on the gallery itself zeroes its top
 * margin and adds the heading's 56px below (40 / 32 at <=767) — the combination
 * /schools/isdi/success-stories/success-snapshot already records.
 */
const GALLERY_CAPTION = {
  'title-txt-grid': 'text-[18px] font-medium leading-8 text-white max-md:text-base max-md:leading-6',
  'title-txt-grid2': 'text-[18px] font-normal leading-8 text-white',
  'title-txt-grid3': 'text-[18px] font-bold leading-[1.5] text-white',
};

function Gallery({ data }) {
  const h2tag = data.galleryMods?.includes('h2-tag');
  return (
    <div data-block="gallery" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, h2mb(data.headingMods))}>{withBreaks(data.heading)}</h2>
        {data.lead && <div className={SUB_INNER}>{withBreaks(data.lead)}</div>}
        {/* `.grid-gallery.h2-tag` — the gallery's own mt56 (40 at <=767) wins over `.h2-tag`, which adds only its
            32px bottom margin at <=767 (measured on Startups and Success Snapshot) */}
        <GridGallery
          cards={data.cards}
          margin={h2tag ? 'mt-14 max-md:mt-10 max-md:mb-8' : undefined}
          wrap={data.wrapRow ? 'row' : 'column'}
          /* `.grid-card-name` 20px/24 700 mint; the caption by class (measured, Success Snapshot / Startups):
             `.title-txt-grid` 18px/32 500 white (16px/24 at <=767), `.title-txt-grid2` 18px/32 400,
             `.title-txt-grid3` 18px/27 700 (in the pin row) */
          name="text-[20px] font-bold leading-6 text-atlas-mint"
          caption={GALLERY_CAPTION[data.captionKind] ?? GALLERY_CAPTION['title-txt-grid']}
        />
        {/* Success Snapshot: the startups' `.slide-wrap` logo marquee, inside the same container */}
        {data.logos && <LogoStrip logos={data.logos} />}
      </div>
    </div>
  );
}

/*
 * `.logos-swipers > .swiper.marquee-swiper` — the footer's marquee Swiper (20px gap, linear,
 * paused on hover) over `img.ls-logo`s at their natural size with a 50px right margin; the band
 * keeps a 56px bottom padding and clips.
 */
function LogoMarquee({ data }) {
  if (data.slideWrap)
    return (
      /* `.logos-swipers > .slide-wrap` (career services): Webflow's a-22 marquee — a 5000px flex row,
         p40/40/20, centred, of `.swiper-slide.widthauto` boxes each holding a logo with 50px right
         margin; the project's `animate-slide-wrap` keyframe */
      <div data-block="logos" className={cx('mb-0 overflow-hidden pb-14', data.mods?.includes('mrgtp') && 'mt-14')}>
        <div className="flex w-[5000px] animate-slide-wrap items-center px-10 pb-5 pt-10 will-change-transform motion-reduce:animate-none">
          {data.logos.map((l, i) => (
            <div key={i} className="relative flex-none overflow-clip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.src} alt={l.alt} loading="lazy" decoding="async" className="mr-[50px] max-w-full align-middle" />
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <div data-block="logos" className={cx('mb-0 overflow-hidden pb-14', data.mods?.includes('mrgtp') && 'mt-14')}>
      <MarqueeTrack>
        {data.logos.map((l, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img key={i} src={l.src} alt={l.alt} loading="lazy" decoding="async" className="mr-[50px] block max-w-none" />
        ))}
      </MarqueeTrack>
    </div>
  );
}
import MarqueeTrack from '@/components/Schools/ISDI/Home/MarqueeTrack';
import { AwardCard } from '@/components/Schools/ISDI/Home/Awards';
import withBreaks from '@/lib/withBreaks';
import PrimaryButton from '@/components/ui/PrimaryButton';

/*
 * `.section > .container > .w-richtext` (Dr. Indu Shahani). Tailwind's preflight wins on these
 * pages, so `<p>` has no margin (measured); the blockquote is Webflow's — 18px/22, p 10/20, a 5px
 * #e2e2e2 left rule — and its `<strong>` / `<em>` runs are bold / italic.
 */
function RichRuns({ runs }) {
  return runs.map((r, i) =>
    typeof r === 'string' ? (
      <span key={i}>{withBreaks(r)}</span>
    ) : (
      <span key={i} className={[r.b && 'font-bold', r.i && 'italic'].filter(Boolean).join(' ')}>
        {withBreaks(r.t)}
      </span>
    )
  );
}

function Rich({ data }) {
  return (
    <div data-block="rich" className={SECTION}>
      <div className={CONTAINER}>
        <div>
          {data.blocks.map((b, i) =>
            b.tag === 'blockquote' ? (
              <blockquote key={i} className="m-0 border-0 border-l-[5px] border-solid border-[#e2e2e2] px-5 py-2.5 text-[18px] leading-[22px]">
                <RichRuns runs={b.runs} />
              </blockquote>
            ) : (
              <p key={i} className="m-0">
                <RichRuns runs={b.runs} />
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* ref .head-top-card.bg6/7/8 — colour and wash are the stylesheet's (as on the programme pages) */

/* the page's CRM brochure widget (`script[src*=crm.atlasskilltech.app/widgets]` in its popup) */
function brochureFor(page) {
  const s = page.brochure;
  return s ? { kind: 'script', src: s.src, height: s.height, title: 'Download Brochure', closeLeading: 'tight' } : null;
}

const ISME_FAQ_ARROW = '/assets/images/schools/isme/icons/isme-down-arrow.svg';

/* a run list that holds only text collapses to the string the shared renderers expect */
const flat = (r) => (Array.isArray(r) && r.every((x) => typeof x === 'string') ? r.join('') : r);

function keyDates(b) {
  const head = { heading: b.heading, id: b.id, headingMb: b.headingMods?.includes('mrg32') ? 'mrg32' : undefined };
  if (b.kind === 'keyTable') return { ...head, rows: b.rows, trailingBreaks: false };
  const lead = b.cards.find((c) => c.lead);
  return {
    ...head,
    strip: {
      lead: { title: flat(lead.title), value: lead.value, image: lead.image },
      cards: b.cards.filter((c) => !c.lead).map((c) => ({ label: flat(c.label), value: c.value })),
    },
  };
}

/*
 * An ISME one-off page rendered from lib/schools/isme/pages/<key>.json, the data the page extractor
 * took out of its production markup. Blocks render in the page's own order; `extra` lets a page
 * slot in a block of its own (keyed by the block's index) where the generic kinds do not cover it.
 */
/* `.container-16` (Non-Mumbai) — Webflow's 1366px container, not the ISME ladder */
const WIDE_CONTAINER = 'relative z-[1] mx-auto max-w-[1366px] px-[62px] max-lg:px-[30px] max-md:px-[22px]';

export default function IsmePage({ page, extra = {} }) {
  const brochure = brochureFor(page);
  return (
    /* `data-no-tw` — a page that does not load the Tailwind CDN (Student Council): see CONTAINER */
    <main data-no-tw={page.noTw ? '' : undefined}>
      {page.blocks.map((b, i) => {
        if (extra[i]) return <Fragment key={i}>{extra[i]}</Fragment>;
        if (b.kind === 'hero') {
          return (
            <Hero
              key={i}
              data={{ id: b.id, height: b.height, eyebrow: b.eyebrow, title: b.title, name: b.name, position: b.position, image: b.image, video: b.video ?? undefined, text: b.text, buttons: b.buttons ?? undefined }}
              brochure={brochure}
              /* Success Snapshot: the CRM "Download ISME Outcomes Book" widget beside the heading */
              widget={b.widget ? <OutcomesBook label={b.widget.label} src={b.widget.src} tone="mint" height={b.widget.height} /> : undefined}
            />
          );
        }
        if (b.kind === 'iconSection') return <IsmeIconSection key={i} data={b} block={`section-${i}`} />;
        /* the partner-pathway landing pages (Northeastern, LSE) — ./PathwayLP */
        if (b.kind === 'lpHero') return <LpHero key={i} data={b} variant={page.lpVariant} />;
        if (b.kind === 'lpStory') return <LpStory key={i} data={b} />;
        if (b.kind === 'lpStack') return <LpStack key={i} data={b} variant={page.lpVariant} />;
        if (b.kind === 'lpLearn') return <LpLearn key={i} data={b} variant={page.lpVariant} />;
        if (b.kind === 'lpTabs') return <LpTabs key={i} data={b} variant={page.lpVariant} />;
        if (b.kind === 'lpCards') return <LpCards key={i} data={b} variant={page.lpVariant} />;
        if (b.kind === 'lpAbout') return <LpAbout key={i} data={b} />;
        if (b.kind === 'lpDisclaimer') return <LpDisclaimer key={i} data={b} variant={page.lpVariant} />;
        if (b.kind === 'explore') return <Explore key={i} data={b} />;
        if (b.kind === 'rotator') return <EventRotator key={i} data={b} />;
        if (b.kind === 'articleHeader') return <ArticleHeader key={i} data={b} />;
        if (b.kind === 'breadcrumbs') return <Breadcrumbs key={i} data={b} />;
        if (b.kind === 'article') return <Article key={i} data={b} />;
        if (b.kind === 'stats') return <IsmeStats key={i} b={b} block="stats" />;
        if (b.kind === 'awardsMarquee')
          return (
            /* ref .awards > .swiper.marquee-swiper — #193e90 band, py22 */
            <div key={i} data-block="awards" className="block overflow-hidden bg-[#193e90] py-[22px]">
              <MarqueeTrack>
                {b.items.map((a, j) => (
                  <AwardCard key={j} award={{ ...a, imageWidth: 110 }} variant={a.variant} />
                ))}
              </MarqueeTrack>
            </div>
          );
        if (b.kind === 'rich') return <Rich key={i} data={b} />;
        if (b.kind === 'hidden') return null; /* `.hide` — display: none upstream */
        if (b.kind === 'storyX') return <StoryX key={i} data={b} block={`story-${i}`} />;
        if (b.kind === 'journeys') return <Journeys key={i} data={b} />;
        if (b.kind === 'electiveTabs') return <ElectiveTabs key={i} data={b} block={`electives-${i}`} />;
        if (b.kind === 'infoBanner' && b.law)
          return (
            /* `div.section > .container > .info-banner-law` (department-of-finance) — the ATLAS band, rounded
               32 / 0, inside the container; its "law" buttons are the mint pill */
            <div key={i} data-block="banner">
              <InfoBanner
                banner={{ ...b, buttons: b.buttons.map((bt) => ({ ...bt, variant: bt.variant === 'law' ? 'mint' : bt.variant })) }}
                skin="law"
                titleClassName="max-md:mb-4 max-sm:mb-3.5"
                /* the page's own `.info-banner-sub-text { width: 55% }` follows the sheet's <=991 rule */
                subWidth="keep-767"
              />
            </div>
          );
        if (b.kind === 'infoBanner')
          return (
            /* ref div.section > .info-banner-blue — full bleed; `.no-bar` title mb16 (14 at <=479) */
            <div key={i} data-block="banner">
              <InfoBanner
                banner={b}
                fullBleed
                skin="isme"
                titleClassName={b.titleBare ? 'max-md:mb-8' : 'max-md:mb-4 max-sm:mb-3.5'}
                /* every ISME banner's `.container(.blue-3)` follows the Tailwind ladder (measured 768 at 992,
                   1280 at 1440, 1536 at 1920 on Entrepreneurship, Campus and Life) */
                containerClassName={cx(CONTAINER, 'relative z-[1]')}
                mobileAt={b.mobileAt}
                pad26={!page.lpVariant && !b.mobileAt}
                {...(page.lpVariant ? { buttonTextSize: 'inherit', subWidth: 'keep-767' } : {})}
              />
            </div>
          );
        if (b.kind === 'gallery') return <Gallery key={i} data={b} />;
        if (b.kind === 'logoMarquee') return <LogoMarquee key={i} data={b} />;
        if (b.kind === 'textHead') return <TextHead key={i} data={b} />;
        if (b.kind === 'coverHero')
          return (
            /* `.inner-cover-section` (Job Openings) — 85% of the viewport, the photo cover; `.course-hero-wrapper`
               the lower half under #0000 -> #0006, p 0 0 64 64 (32 at <=991; 0 22 32 at <=767); the hero text
               and buttons are ATLAS Campus/CampusHero's */
            <div key={i} data-block="hero" className="relative h-[85vh] w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.image.src} srcSet={b.image.srcSet} sizes={b.image.sizes} alt={b.image.alt || ''} className="block h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex h-1/2 items-end bg-[linear-gradient(#0000,#0006)] pb-16 pl-16 max-lg:pb-8 max-lg:pl-8 max-md:px-[22px]">
                <div className="max-w-[840px] max-sm:max-w-[704px]">
                  <h1 className="m-0 text-[56px] font-normal leading-[1.2] text-white max-lg:text-[44px] max-md:text-[28px] max-md:font-semibold max-md:leading-[1.5]">
                    {withBreaks(b.title)}
                  </h1>
                  <div className="flex items-center gap-4 pt-[30px] max-lg:gap-2 max-md:flex-col max-md:items-start max-md:justify-start max-md:pt-6 max-sm:pt-[14px]">
                    {b.buttons.map((bt) => (
                      <PrimaryButton key={bt.label} href={bt.href} variant={bt.variant}>
                        {bt.label}
                      </PrimaryButton>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        /* UG / PG overviews: ISDI ProgramsUg/Hero's ring carousel, driven by data */
        if (b.kind === 'ringHero') return <RingHero key={i} data={b} />;
        /* the ATLAS sheet's four-column photo marquee (Life) — ATLAS Life/LifeHero, driven by data */
        if (b.kind === 'lifeHero')
          return (
            <div key={i} data-block="hero">
              <LifeHero data={b} />
            </div>
          );
        /* Campus: ATLAS Campus/CampusHero over a background video */
        if (b.kind === 'campusHero')
          return (
            <div key={i} data-block="hero">
              <CampusHero data={b} />
            </div>
          );
        if (b.kind === 'logoStripTop')
          return (
            /* a `.slide-wrap` logo marquee authored straight in the page (Parents Corner): ISDI LogoStrip,
               clipped by the page */
            <div key={i} data-block="logo-strip" className="overflow-hidden">
              <LogoStrip logos={b.logos} />
            </div>
          );
        if (b.kind === 'story')
          return <StoryPair key={i} data={b} imageRounded={false} skin="isme" textClassName={page.noTw ? 'font-medium' : undefined} />;
        if (b.kind === 'transferWall')
          return (
            <StudentWall
              key={i}
              skin="isme"
              headingMargin={b.headingMods?.includes('mrg16') ? 'mrg16' : 'base'}
              data={{ heading: b.heading, lead: b.lead, people: b.people }}
            />
          );
        if (b.kind === 'plainSection') return <PlainSection key={i} data={b} block={`section-${i}`} />;
        if (b.kind === 'voices')
          return (
            <PeopleVoices
              key={i}
              block="voices"
              data={{
                heading: b.heading,
                /* upstream spells it both ways — `.mrgtbm0` and `.mrgbtm0` — and both zero the margin */
                headingMb: b.headingMods?.includes('mrgtbm0') || b.headingMods?.includes('mrgbtm0') ? 'mrgtbm0' : undefined,
                swiperPt0: b.swiperMods?.includes('mrgtp0'),
                sub: b.sub,
                subVariant: b.subMods?.includes('sub-heading-4') ? 'sub4' : undefined,
                inContainer: b.inContainer,
                bgImage: b.cards[0]?.bgImage,
                cards: b.cards.map((c) => ({ ...c, role: c.course })),
              }}
            />
          );
        if (b.kind === 'enquiry')
          return (
            <EnquiryForm
              key={i}
              skin="isme"
              data={{ id: b.id, title: b.title, text: b.text, image: '/assets/images/schools/isme/pages/form-bg.png', widget: { id: b.widget, height: b.height } }}
            />
          );
        /* the Admissions pages (BBA, B.Sc, MBA) */
        if (b.kind === 'courseHero') return <CourseHero key={i} data={b} />;
        /* the About page */
        if (b.kind === 'missionVision') return <MissionVision key={i} data={b} skin="isme" block="mission" />;
        if (b.kind === 'shaping') return <ShapingViksitBharat key={i} data={b} skin="isme" />;
        if (b.kind === 'recognition')
          return (
            <Recognition
              key={i}
              skin="isme"
              data={{ ...b, tabs: b.tabs.map((t, j) => ({ ...t, currentWeight: 500, smallText: j > 0 })) }}
            />
          );
        if (b.kind === 'advisory') return <AdvisoryBoard key={i} data={b} />;
        if (b.kind === 'headStats')
          return (
            /* a heading row (optional) over a full-width figures band (Entrepreneurship's 3H approach) */
            <section key={i} data-block="head-stats" className={SECTION}>
              {b.heading && (
                <div className={CONTAINER}>
                  <HeadWrap
                    heading={b.heading}
                    sub={b.sub}
                    align="top"
                    headingMb="mb-4 max-md:mb-2"
                    subClass={(b.subMods || []).includes('mrgbtm') ? SUB_INNER_MRGBTM : undefined}
                  />
                </div>
              )}
              <IsmeStats b={b.stats} />
            </section>
          );
        if (b.kind === 'coreCards') return <CoreCards key={i} data={b} block="core-cards" />;
        if (b.kind === 'management')
          return (
            /* `div.section#isme-faculty > .container > (.head-wrap, .swiper.common-swiper-full)` — the
               ISDI `.card-type-e` on the ISME skin */
            <div key={i} id={b.id || undefined} data-block="management" className={SECTION}>
              {/* Non-Mumbai (`wide`): heading AND carousel inside Webflow's 1366px `.container-16` */}
              <div className={b.wide ? WIDE_CONTAINER : CONTAINER}>
                {b.bareHead ? (
                  /* h2 + `.sub-heading` straight in the container, no `.head-wrap` (Internationalisation) */
                  <>
                    <h2 className={cx(H2, b.headingMb0 ? 'mb-0 mt-0' : 'mb-4 mt-0 max-md:mb-2')}>{b.heading}</h2>
                    {b.sub && (
                      <div
                        className={
                          (b.subMods || []).includes('sub-heading-1')
                            ? /* `.sub-heading-1` (Parents Corner) — 18px/1.8 300, pr50; pr0 and 1.5 at <=767 */
                              'pr-[50px] text-[18px] font-light leading-[1.8] max-md:pr-0 max-md:leading-[1.5]'
                            : (b.subMods || []).includes('mrgbtm')
                              ? SUB_INNER_MRGBTM
                              : SUB_INNER
                        }
                      >
                        {b.sub}
                      </div>
                    )}
                  </>
                ) : (
                  <HeadWrap heading={b.heading} sub={b.sub} button={b.button} align="top" headingMb="mb-4 max-md:mb-2" />
                )}
              </div>
              {b.grid ? (
                /* `.common-flex-26-wrap` (Student Council) — a centred wrapping row, gap 24 */
                <div className={cx(CONTAINER, 'flex flex-wrap items-start justify-center gap-6')}>
                  {b.people.map((p, j) => (
                    <CardTypeE key={j} person={p} skin="isme" />
                  ))}
                </div>
              ) : (
              <div className={b.wide ? WIDE_CONTAINER : undefined}>
              {/* `.common-swiper-full` — pt56 (20 at <=767), its dots overlaid below 569; the plain
                  `.common-swiper` is pt56 (40 at <=767) with its dots in flow, 20px under the track */}
              <Carousel
                bleed={!b.wide}
                autoplay={false}
                arrowStyle="isme"
                bullets={(b.swiperMods || []).includes('common-swiper-full') ? 'inline-overlay' : 'inline'}
                className={(b.swiperMods || []).includes('common-swiper-full') ? 'pt-14 max-md:pt-5' : 'pt-14 max-md:pt-10'}
              >
                {b.people.map((p, j) => (
                  <CardTypeE key={j} person={p} skin="isme" />
                ))}
              </Carousel>
              </div>
              )}
            </div>
          );
        if (b.kind === 'anchorMenu') return <AnchorMenu key={i} links={b.links} centered={b.centered} />;
        // an authored empty <p> carrying only an inline style (life@atlas-isme/test.php's 300vh red-bordered
        // scroll-test box); `mb-2.5` is Webflow's own `p { margin-bottom: 10px }`, which Preflight zeroes
        if (b.kind === 'spacer') return <p key={i} data-block="spacer" className="mb-2.5" style={b.style} />;
        if (b.kind === 'guide') return <Guide key={i} data={b} />;
        if (b.kind === 'keyTable' || b.kind === 'keyStrip') return <KeyDates key={i} data={keyDates(b)} skin="isme" />;
        if (b.kind === 'admEligibility') return <AdmEligibility key={i} data={b} />;
        if (b.kind === 'fees') return <Fees key={i} data={b} />;
        if (b.kind === 'banner') return <Banner key={i} data={b} />;
        if (b.kind === 'wfFaq') return <WfFaq key={i} data={b} />;
        /* imarticus29012026 repeats four ISME homepage blocks: the hero (its own copy over the homepage video),
           the outcomes heading, and the awards and "Think International" blocks byte-identical to the
           homepage's (compared), so they take the homepage data */
        if (b.kind === 'homeHero')
          return (
            <div key={i} data-block="hero">
              <HomeHero data={{ ...ismeHero, heading: b.heading, ismeDuration: b.ismeDuration, ismeDesc: b.ismeDesc, buttons: b.buttons }} />
            </div>
          );
        if (b.kind === 'outcomesHeading') return <OutcomesHeading key={i} heading={b.heading} />;
        if (b.kind === 'outcomesStack') return <OutcomesStack key={i} cards={b.cards} />;
        if (b.kind === 'homeAwards') return <HomeAwards key={i} data={ismeAwards} variant="base" />;
        /* a section whose production markup is identical to an ISME homepage section: the homepage's
           component and data, exactly as app/schools/isme/page.js renders them */
        if (b.kind === 'homeSection') {
          const HOME = {
            different: () => <CoreCards data={ismeDifferent} />,
            advisory: () => <AdvisoryBoard data={ismeAdvisory} />,
            faqBanner: () => <PinkBanner data={ismeFaqBanner} block="faq-banner" tone="blue" sectionClass={SECTION} />,
            motion: () => <Motion data={ismeMotion} />,
            future: () => <FutureInAction data={ismeFuture} />,
            people: () => <PeopleVoices data={ismePeople} />,
            thoughtLeadership: () => <ThoughtLeadership data={ismeThoughtLeadership} />,
            industry: () => <Industry data={ismeIndustry} />,
            readyToBuild: () => <ReadyToBuild data={ismeReadyToBuild} tone="blue" variant="isme" sectionClass={SECTION} />,
            /* imarticus' live EmbedSocial Instagram widget -> the project's shared Instagram feed, as the homepage */
            thisWeek: () => <ThisWeek data={ismeThisWeek} />,
          };
          return HOME[b.name] ? <Fragment key={i}>{HOME[b.name]()}</Fragment> : null;
        }
        if (b.kind === 'homeInternational') return <International key={i} data={ismeInternational} />;
        /* the ISME homepage's "Build Your Degree" tabs (department-of-finance repeats them) */
        if (b.kind === 'programTabs') return <Programs key={i} data={b} block="programs" />;
        if (b.kind === 'search')
          return (
            /* `#faq-bsc` / `#faq-mba` — the menus' "FAQs" target on those pages; the BBA page gives
               this section `id="faq"` as well as the FAQ, and only the FAQ keeps it */
            <section key={i} data-block="search" id={b.id && b.id !== 'faq' ? b.id : undefined} className={SECTION}>
              <div className={CONTAINER}>
                {/* the panel's own 40px top padding, as on the programme pages */}
                <div className="pt-10">
                  <SearchQuestion data={ismeSearch} variant="blue" />
                </div>
              </div>
            </section>
          );
        if (b.kind === 'faq')
          return (
            <div key={i} data-block="faq">
              <FAQ data={{ heading: b.heading, arrow: ISME_FAQ_ARROW, items: b.items }} />
            </div>
          );
        return null;
      })}
    </main>
  );
}
