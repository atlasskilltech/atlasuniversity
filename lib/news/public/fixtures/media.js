/**
 * ATLAS News — Stage 2 sample media.
 *
 * Every photograph is a file the site already ships: each path below is listed in
 * assets.manifest.json, so it is already in the public S3 bucket and nothing new is uploaded. Width and
 * height are the files' own pixel dimensions (read from the files), which is what reserves each image's
 * box before it loads.
 *
 * Shape = one `atlasnews_media` row as the repository will map it: { src, width, height, alt, caption }.
 */
const m = (src, width, height, alt, caption = null) => ({ src, width, height, alt, caption });

const CONVOCATION = '/assets/convocation/images';
const ISME = '/assets/lp/isme-ug-programs-2027/assets/campus';
const ISME_V2 = '/assets/lp/isme-ug-programs-2027v2/assets';

export const MEDIA = Object.freeze({
  convocationHall: m(`${CONVOCATION}/hero/convocation-hall-2400.webp`, 2400, 1200, 'Rows of graduates in royal-blue gowns seated in a convocation hall under a lit ceiling'),
  graduatesCelebrating: m(`${CONVOCATION}/hero/graduates-celebrating-2400.webp`, 2400, 1200, 'Graduates in blue gowns cheering together after the ceremony'),
  audienceInHall: m(`${CONVOCATION}/gallery/audience-in-hall.webp`, 1400, 932, 'Families and guests filling the convocation hall'),
  classmatesTogether: m(`${CONVOCATION}/gallery/classmates-together.webp`, 1400, 932, 'A group of classmates in caps and gowns posing beneath gold and white balloons'),
  degreeConferred: m(`${CONVOCATION}/gallery/degree-conferred.webp`, 1400, 932, 'A graduate receives a degree certificate on stage'),
  familiesGathered: m(`${CONVOCATION}/gallery/families-gathered.webp`, 1400, 932, 'Families gathered around graduates after the ceremony'),
  familyPortrait: m(`${CONVOCATION}/gallery/family-portrait.webp`, 1400, 932, 'A graduate posing for a family portrait'),
  friendsAtPhotoWall: m(`${CONVOCATION}/gallery/friends-at-photo-wall.webp`, 1400, 932, 'Friends posing together at the convocation photo wall'),
  graduateWithFamily: m(`${CONVOCATION}/gallery/graduate-with-family.webp`, 1400, 932, 'A graduate standing with family members'),
  balloonArch: m(`${CONVOCATION}/gallery/graduates-balloon-arch.webp`, 1400, 932, 'Graduates under a balloon arch at the venue entrance'),
  graduatesCheering: m(`${CONVOCATION}/gallery/graduates-cheering.webp`, 1400, 932, 'Graduates laughing and cheering, holding rolled certificates'),
  graduationDayArch: m(`${CONVOCATION}/gallery/graduation-day-arch.webp`, 1400, 932, 'Graduates and families in front of a "Graduation Day" arch'),

  campusBkc: m(`${ISME}/01-atlas-isme-campus-bkc.webp`, 1400, 933, 'The ATLAS SkillTech University building in Mumbai, a glass-fronted tower behind a row of trees'),
  smartClassroom: m(`${ISME}/03-smart-classroom.webp`, 1400, 1127, 'An empty smart classroom with curved desks, ring lights and a bright circuit-board mural'),
  guestSession: m(`${ISME}/04-guest-session.webp`, 1400, 1127, 'A guest speaker addressing students seated around long tables'),
  discussionRoom: m(`${ISME_V2}/campus/05-discussion-room.webp`, 1400, 1128, 'Four students in formal wear in discussion around a table'),
  collaborativeWorkspace: m(`${ISME}/09-collaborative-workspace.webp`, 1400, 1128, 'Students working in small groups in an open collaborative workspace'),
  studentsLaptops: m(`${ISME_V2}/hero/hero-banner-desktop.webp`, 2000, 1333, 'Five students gathered around laptops at a desk, one pointing at a screen'),

  roboticsBench: m('/assets/lp/ugdx-ug-programs-2027/assets/hero/btech-banner.jpg', 1440, 960, 'A student adjusting a multi-legged robot with a controller at a lab bench'),
  campusExterior: m('/assets/lp/ugdx-ug-programs-2027v2/assets/hero/atlas-campus.jpg', 1440, 810, 'The ATLAS campus building seen from the road at dusk'),
  roboticsSolo: m('/assets/lp/btech/assets/images/section-four/slider/2.webp', 5472, 3648, 'A student assembling a small wheeled robot in an engineering lab'),
  roboticsPair: m('/assets/lp/btech/assets/images/section-four/slider/4.webp', 5472, 3648, 'Two students soldering and wiring robot parts on a lab table'),
  vrStudent: m('/assets/lp2022/ugprograms/Atlas-UG_01.webp', 1400, 772, 'A student wearing a virtual-reality headset'),

  runwayCourtyard: m('/assets/sensorium/2022-12-final-1st-3-1105.webp', 1105, 656, 'A model in a sculpted gold gown walks a night-time runway lined with trees and lights'),
  runwayStage: m('/assets/sensorium/2022-12-J-test-1-1105.webp', 1105, 656, 'Two models on stage at a fashion show with the audience seated around the runway'),
  redShoe: m('/assets/sensorium/2020-04-port-single-big-1-1300.webp', 1300, 700, 'A glossy red sculptural high-heeled shoe displayed on a black plinth'),
  editorialPortrait: m('/assets/sensorium/2020-04-port-single-big-2-1300.webp', 1300, 700, 'A model in a red leather jacket seated in a green velvet chair'),
  stillLife: m('/assets/sensorium/2020-04-port-single-big-3-1300.webp', 1300, 700, 'A styled still life of a bottle in an ice bucket beside ceramic cups'),
  editorialPortraitWide: m('/assets/sensorium/2020-04-port-single-masonry-img-01.jpg', 1300, 650, 'A model in a red jacket and patterned skirt lounging in a lounge chair'),
  leatherBag: m('/assets/sensorium/2020-04-port-single-masonry-img-04.jpg', 1300, 650, 'Close-up of a teal textured leather bag with a metal clasp'),

  libraryStudy: m('/assets/lp2x/university/banner.webp', 1440, 834, 'Students reading and laughing together around a table in the library'),
  facultyGroup: m('/assets/aarohan/common/images/slider-1.webp', 3840, 2192, 'Students in business wear gathered around two faculty members looking at a laptop'),
  seminarRoom: m('/assets/aarohan/common/images/header-image-speaker-page.webp', 3840, 2192, 'A speaker standing among students seated at tables during a seminar'),
  wellnessCentre: m('/assets/green-campus/hf-1.jpeg', 4032, 3024, 'A student consults a doctor at a desk in the campus health centre'),
});
