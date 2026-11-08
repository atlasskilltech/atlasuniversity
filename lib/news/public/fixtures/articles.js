/**
 * ATLAS News — Stage 2 sample articles.
 *
 * ILLUSTRATIVE CONTENT. These stories were written for the Stage 2 design preview: they describe the
 * kind of work ATLAS publishes, quote people by ROLE rather than by invented names, and carry no
 * statistics. They are not imported from WordPress and must be replaced by real posts (Stage 3 editor /
 * Stage 4 import) before the public pages are indexed — see NEWS_PUBLIC_SOURCE in ../repository.js.
 *
 * Shape = one `atlasnews_posts` row as the repository will map it, plus its relations:
 *   slug, title, excerpt, contentHtml (sanitised-HTML vocabulary, see ./html.js), status, publishedAt
 *   (UTC ISO), featuredMedia (an atlasnews_media row), primaryCategory + categories
 *   (atlasnews_post_categories), authorName (default 'ATLAS News Desk'), seoTitle, seoDescription.
 */
import { MEDIA } from './media.js';
import { body, figure, gallery, h2, ol, p, quote, ul } from './html.js';

const post = (fields) => ({ status: 'published', authorName: 'ATLAS News Desk', seoTitle: null, seoDescription: null, ...fields });

export const ARTICLES = Object.freeze([
  post({
    slug: 'a-graduating-class-steps-into-a-world-still-being-written',
    title: 'A graduating class steps into a world that is still being written',
    excerpt: 'At this year’s convocation the loudest cheers were not for the degrees themselves, but for everything the graduates built on the way to them.',
    publishedAt: '2026-11-06T06:30:00.000Z',
    featuredMedia: { ...MEDIA.convocationHall, caption: 'Graduates take their seats before the ceremony begins.' },
    primaryCategory: 'student-life',
    categories: ['student-life', 'achievements'],
    contentHtml: body(
      p('The hall went quiet for exactly one moment — the instant before the first name was read — and then it did not go quiet again for three hours. Parents stood on chairs. Classmates who had shared studios, labs and late-night case discussions shouted each other’s names as if they were announcing a cricket score.'),
      p('Convocation is, on paper, an administrative ritual: a register of names, a sequence of certificates, a procession in robes that nobody will ever wear again. In practice it is the one day a university gets to see itself the way its students do — as a set of years that changed them, rather than a set of courses they completed.'),
      h2('The work behind the walk'),
      p('Ask a graduate what they will remember and very few mention an exam. They talk about the first prototype that fell apart in front of a jury, the internship that turned into an offer, the group project that nearly ended a friendship and then made it stronger. A degree certifies the learning; the stories are where the learning actually happened.'),
      quote('I walked in thinking I would collect a certificate. I walked out realising I had collected a hundred people who believed in me.', 'A graduating student'),
      p('Faculty members who addressed the class returned to the same theme: the world the graduates are entering is unfinished. Industries are being redesigned around new tools, and careers increasingly look less like ladders and more like portfolios. The graduates, one speaker said, have been trained for exactly that — not to fit a role, but to keep reinventing one.'),
      p('That message landed differently depending on where you sat. For graduates of the design school, it echoed years of studio reviews in which a finished project was only ever the starting point for the next question. For engineering graduates, it sounded like the iterative habits of the lab. For management graduates, it described the case discussions where the most valuable answer was often a better question.'),
      h2('Three schools, one stage'),
      p('One of the quieter pleasures of the day was watching the schools mingle. Students who had spent years in different buildings and timetables found themselves in the same rows, comparing notes on internships, swapping contact details and promising to collaborate on whatever comes next. A university built around multidisciplinary learning rarely gets a better advertisement than a design graduate and a management graduate arguing happily about the same start-up idea.'),
      p('Families, too, brought their own stories. Many had travelled from other cities, some were attending a university ceremony for the first time, and more than a few spent the event recording every second on a phone held carefully above the heads in front of them.'),
      gallery(
        [
          [MEDIA.graduatesCheering, 'The moment after the final name was read.'],
          [MEDIA.degreeConferred, 'A degree conferred on stage.'],
          [MEDIA.classmatesTogether, 'Classmates, one last time in the same frame.'],
        ],
        { cols: 3 },
      ),
      h2('What comes next'),
      p('For some, next week means a first day at work. For others it is a master’s programme abroad, a family business with fresh ideas, or a start-up that began as a class assignment. The paths are different, but the instruction they were given on stage was the same: stay curious, stay generous, and come back to tell the next class what you learned.'),
      quote('Come back. Mentor the people sitting where you sat. That is how a university becomes a community.', 'A faculty member, addressing the graduates'),
      p('The invitation to return was not rhetorical. Alumni already lead masterclasses, mentor studio projects and help current students find their first opportunities. The class that walked out of the hall this year will, in time, walk back into classrooms as guests — and the cycle that made their own education possible will turn once more.'),
      p('As the hall emptied, the photo wall outside became the most crowded place in the building. Caps went into the air, gowns were adjusted for one more picture, and a few graduates lingered at the door — as if leaving the room meant the day was really over.'),
    ),
  }),

  post({
    slug: 'sensorium-when-a-courtyard-became-a-runway',
    title: 'Sensorium: when a courtyard became a runway',
    excerpt: 'ISDI’s graduate showcase turned an open-air courtyard into a stage for collections that had been months in the making — and a few that were finished the night before.',
    publishedAt: '2026-11-03T13:00:00.000Z',
    featuredMedia: { ...MEDIA.runwayCourtyard, caption: 'A gown built around sculpted gold layers opens the evening.' },
    primaryCategory: 'student-life',
    categories: ['student-life', 'achievements'],
    contentHtml: body(
      p('By the time the first model stepped out under the trees, most of the designers had been awake for a very long time. Backstage was a choreography of steamers, safety pins and whispered corrections, while out front the audience settled in on either side of a runway lit by strings of light.'),
      p('Sensorium is the moment ISDI’s design students stop being students in the eyes of the public. Each collection is the end of a long arc: research, mood boards, toiles, fittings, reviews — and the uncomfortable, necessary conversations with mentors about what to cut.'),
      figure(MEDIA.runwayStage, 'Collections were shown in pairs, letting contrasting ideas sit side by side.', { wide: true }),
      h2('Craft first, spectacle second'),
      p('What stood out this year was restraint. Several designers built entire collections around a single technique — hand pleating, layered organza, re-worked denim — and let that technique carry the story rather than adding ornament for its own sake.'),
      quote('The jury kept asking us why. Why this fabric, why this silhouette, why now. By the end, every answer was in the garment.', 'A final-year fashion design student'),
      p('Industry guests in the front rows were candid afterwards. The work, one said, felt less like a graduation show and more like a first season — collections with a point of view, made by people who already know what they want to say.'),
      h2('Months of work, minutes on the runway'),
      p('Each look on the runway lasts a few seconds. Behind it sit months of process that the audience never sees: sourcing trips, sampling that goes wrong, fittings that send a design back to the drawing board, and long critiques in which mentors ask whether every element is earning its place.'),
      p('Several designers spoke about the discipline of editing. Collections that began with twenty ideas were reduced to a handful of looks that told one clear story. Fabrics were tested for how they moved under light, not just how they looked on a hanger. Styling, hair and make-up were planned with the same care as the garments themselves.'),
      figure(MEDIA.editorialPortraitWide, 'Styling was treated as part of each collection’s story, not an afterthought.'),
      h2('After the lights'),
      p('When the runway cleared, the courtyard became a gallery. Garments were examined up close, seams turned inside out, makers asked about sourcing and finishing. For many designers, those quiet conversations mattered more than the applause: they were the first real conversations with the industry they are about to join.'),
      p('Sensorium also belongs to the students who are not yet graduating. First- and second-year students volunteered backstage, managed the audience and watched closely, already imagining the collections they will one day send out under the same trees. For them, the evening was less a finale than a preview.'),
    ),
  }),

  post({
    slug: 'in-the-robotics-lab-first-years-build-before-they-theorise',
    title: 'In the robotics lab, first-years build before they theorise',
    excerpt: 'The B.Tech studio at uGDX flips the usual order of engineering education: students meet the motor, the sensor and the bug long before they meet the textbook chapter.',
    publishedAt: '2026-11-01T07:15:00.000Z',
    featuredMedia: { ...MEDIA.roboticsBench, caption: 'Tuning gait patterns on a multi-legged robot.' },
    primaryCategory: 'academic',
    categories: ['academic'],
    contentHtml: body(
      p('The first assignment arrives in week two and it is deliberately unreasonable: make something move. There is no lecture on kinematics beforehand, no worked example on the board — just a kit of parts, a bench, and a deadline.'),
      p('The idea, faculty explain, is to make theory arrive as an answer rather than a requirement. A student who has watched a robot drift off course because one motor runs faster than the other is suddenly very interested in feedback control. The textbook chapter stops being an obstacle and becomes a tool.'),
      h2('Learning in the order things go wrong'),
      p('A typical studio week moves through three rhythms:'),
      ul([
        '<strong>Build</strong> — teams prototype quickly with whatever works, accepting that the first version will be ugly.',
        '<strong>Break</strong> — the prototype is tested against a brief it will probably fail, and the failure is documented.',
        '<strong>Explain</strong> — only then does the theory session begin, built around the failures the class actually produced.',
      ]),
      figure(MEDIA.roboticsPair, 'Wiring and soldering in the B.Tech studio.'),
      quote('The bug teaches you more than the lecture ever could. The lecture just tells you the name of what you already discovered.', 'A first-year B.Tech student'),
      p('The approach is not anti-theory. By the end of the year, students cover the same mathematics and physics any engineering programme would expect. What changes is the motivation: every equation comes attached to a problem the student has already met with their own hands.'),
      h2('Teams, not lone geniuses'),
      p('Every build is a team build. Roles rotate through the term so that each student takes a turn at mechanical design, electronics, programming and documentation. The rotation is deliberately uncomfortable: the strongest coder on a team spends a week holding a soldering iron, and the student who loves hardware has to write the control logic.'),
      p('Faculty see the payoff in the final projects. Teams that have learnt each other’s work communicate better, debug faster and make fewer assumptions. The robots are not always the most sophisticated, but they are almost always the most reliable — which, any working engineer will tell you, is the harder achievement.'),
      quote('We are not trying to produce people who know everything. We are trying to produce people who can figure out anything.', 'A faculty member in the B.Tech studio'),
      figure(MEDIA.roboticsSolo, 'Small builds, fast iterations: the studio’s working method.'),
    ),
  }),

  post({
    slug: 'what-a-boardroom-simulation-teaches-that-a-case-study-cannot',
    title: 'What a boardroom simulation teaches that a case study cannot',
    excerpt: 'At ISME, management students spend a week running a fictional company in real time. The hardest lessons are not about strategy.',
    publishedAt: '2026-10-29T05:45:00.000Z',
    featuredMedia: { ...MEDIA.discussionRoom, caption: 'A leadership team works through a crisis brief.' },
    primaryCategory: 'academic',
    categories: ['academic', 'insights'],
    contentHtml: body(
      p('A case study gives you the ending. You read about a company that made a decision, you debate whether it was the right one, and you go home. A simulation takes the ending away. Decisions compound, information arrives late, and a teammate who seemed decisive on Monday goes quiet by Thursday.'),
      p('That is the point of the week-long boardroom exercise ISME runs for its management students. Teams take over a fictional company and make quarterly decisions — pricing, hiring, investment — while a facilitator releases market shocks on a schedule nobody else can see.'),
      h2('Three lessons that keep repeating'),
      ol([
        '<strong>Information is never complete.</strong> Teams that wait for certainty fall behind teams that decide with what they have and adjust.',
        '<strong>Disagreement is a resource.</strong> The strongest teams formalise dissent — one member is asked to argue against every major decision.',
        '<strong>Communication is the strategy.</strong> A good plan explained badly to the “board” fails as surely as a bad plan.',
      ]),
      quote('Nobody failed because they misread the numbers. Teams struggled when they stopped talking to each other.', 'A faculty facilitator'),
      p('By the final round, the debriefs sound less like finance lectures and more like conversations about trust. That, faculty say, is the lesson worth carrying into a first job: organisations are run by people, and people need to be led as carefully as budgets.'),
    ),
  }),

  post({
    slug: 'product-leaders-on-shipping-when-the-brief-keeps-changing',
    title: 'Product leaders on shipping when the brief keeps changing',
    excerpt: 'In an industry masterclass, practitioners walked students through the unglamorous craft of product management: prioritising, saying no and learning in public.',
    publishedAt: '2026-10-27T09:30:00.000Z',
    featuredMedia: { ...MEDIA.guestSession, caption: 'An industry masterclass in session.' },
    primaryCategory: 'industry',
    categories: ['industry'],
    contentHtml: body(
      p('The first slide was a calendar with almost every day crossed out. “This,” the speaker said, “is what a roadmap looks like after it meets reality.” The room laughed, and then it took notes for two hours.'),
      p('The masterclass, part of the industry series that brings working practitioners onto campus, focused on a part of product management that rarely makes it into job descriptions: how to keep shipping useful work when priorities, budgets and even the definition of the product keep moving.'),
      h2('Prioritise the problem, not the feature'),
      p('Students were asked to rank a list of feature requests and then to throw the ranking away and rewrite each request as a user problem. The exercise was revealing: several “urgent” features solved the same underlying problem, and one solved a problem nobody actually had.'),
      quote('The most valuable sentence in product management is “not yet”. It protects the team’s attention, and attention is the only thing you never get back.', 'A visiting product leader'),
      h2('The craft behind the roadmap'),
      p('A large part of the session dealt with communication. Speakers argued that a product manager’s most important deliverable is not a document but shared understanding — between engineers who know what is possible, designers who know what is usable, and leadership who know what the business needs.'),
      p('Students were walked through an exercise built on a familiar situation: writing a one-page brief that a new engineer could read in five minutes and understand why a feature mattered. Many first drafts ran to several pages. The revised versions were shorter, sharper and, the speakers noted, far more persuasive.'),
      ul([
        'Write the problem before the solution.',
        'Name the person whose day gets better.',
        'Decide in advance how you will know it worked.',
      ]),
      h2('Learning in public'),
      p('The session closed on the habit speakers said separates good product teams from great ones: shipping small, measuring honestly and talking openly about what did not work. Students left with a short challenge — to take one of their own course projects and write the release notes for a version that is half as big, and twice as useful.'),
    ),
  }),

  post({
    slug: 'forty-eight-hours-one-brief-and-a-room-full-of-whiteboards',
    title: 'Forty-eight hours, one brief and a room full of whiteboards',
    excerpt: 'A weekend hackathon asked mixed teams of designers, engineers and management students to solve a real civic problem — and to pitch it before Sunday evening.',
    publishedAt: '2026-10-24T11:00:00.000Z',
    featuredMedia: { ...MEDIA.collaborativeWorkspace, caption: 'Teams sketching early concepts on Saturday morning.' },
    primaryCategory: 'industry',
    categories: ['industry', 'student-life'],
    contentHtml: body(
      p('The brief went up on the screen at nine on Saturday morning: improve the everyday commute for people who travel through the city’s busiest junctions. By ten, every whiteboard in the room was full.'),
      p('Teams were deliberately mixed across schools. A designer sat beside an engineer and a management student, which meant that the first hour was mostly spent learning each other’s vocabulary — and the next forty-seven were faster because of it.'),
      h2('From observation to pitch'),
      p('The organisers insisted on fieldwork. Before any solution could be proposed, teams had to spend time at a real junction, watching and talking to commuters. The best ideas that emerged were small and specific: clearer wayfinding at a single exit, a queueing system for shared autos, a timing change for a pedestrian signal.'),
      quote('We came in wanting to build an app. We left with a sign, a map and a much better understanding of why the app would not have helped.', 'A participating student'),
      p('The judging panel, which included practitioners from transport and urban design, rewarded evidence over polish. The winning pitch had the plainest slides of the day and the most photographs from the street.'),
    ),
  }),

  post({
    slug: 'why-a-university-belongs-in-the-middle-of-the-city',
    title: 'Why a university belongs in the middle of the city',
    excerpt: 'An urban campus is not a compromise on space. It is a decision about what students should be close to — and what they should never be far from.',
    publishedAt: '2026-10-22T04:30:00.000Z',
    featuredMedia: { ...MEDIA.campusBkc, caption: 'The ATLAS campus in Mumbai.' },
    primaryCategory: 'insights',
    categories: ['insights', 'academic'],
    contentHtml: body(
      p('For most of the last century, the ideal campus was a world apart: green lawns, long drives, a gate between learning and everything else. The logic was protection — from distraction, from noise, from the city.'),
      p('An urban campus makes the opposite bet. It assumes the city is not a distraction from learning but one of its most important sources. Clients, studios, offices, galleries, courts and markets are not field-trip destinations; they are the neighbourhood.'),
      h2('Proximity changes the curriculum'),
      p('When industry is a short commute away, a guest lecture can become a recurring studio, an internship can run alongside a semester instead of after it, and a live project can involve a real client meeting rather than a simulated one. The curriculum stops pretending the working world is somewhere else.'),
      p('Students notice the difference in small ways. A design student can visit a retail floor between classes to watch how customers actually move. An engineering team can test a prototype with the people who will use it. A management student can attend an industry event in the evening and bring the conversation into the next morning’s seminar.'),
      p('Faculty, too, are shaped by proximity. Many teach while staying active in practice, consulting, designing or advising, and the city makes that dual life sustainable. The result is a classroom where examples are current, contacts are real and the distance between a lesson and its application is measured in minutes rather than months.'),
      figure(MEDIA.campusExterior, 'The campus sits within reach of the city’s business and creative districts.', { wide: true }),
      quote('The city is the largest classroom we have. Our job is to make sure students know how to read it.', 'A member of the academic leadership'),
      h2('The trade-offs are real'),
      p('Urban campuses work with tighter footprints, higher costs and a pace that can be exhausting. The answer, increasingly, is design: flexible rooms that change use through the day, shared spaces that encourage chance meetings across schools, and wellbeing support that recognises how demanding city life can be.'),
      h2('A different idea of community'),
      p('Critics of urban campuses sometimes worry that students lose the sense of belonging that a self-contained campus creates. Experience on the ground suggests something different: community does not depend on distance from the city, but on the quality of the shared spaces and rituals inside it. Studios that stay open late, clubs that run across schools and events that bring families onto campus all do the work that lawns once did.'),
      p('There is also a broader civic argument. A university that sits inside the city can contribute to it — through public events, exhibitions, partnerships with local organisations and student projects that tackle the city’s own problems. The campus becomes part of the neighbourhood rather than an island within it.'),
      p('The measure of an urban campus is not how much land it has. It is how many doors it opens within an hour of the classroom.'),
    ),
  }),

  post({
    slug: 'international-faculty-bring-the-world-into-a-mumbai-classroom',
    title: 'International faculty bring the world into a Mumbai classroom',
    excerpt: 'During international faculty week, visiting professors swapped lectures for working sessions — and students saw how the same problem looks from three continents.',
    publishedAt: '2026-10-19T08:00:00.000Z',
    featuredMedia: { ...MEDIA.facultyGroup, caption: 'Visiting faculty review student work during a working session.' },
    primaryCategory: 'global',
    categories: ['global', 'academic'],
    contentHtml: body(
      p('The format was simple: no slide decks longer than ten minutes. Visiting faculty were asked to bring a problem from their own context — a market, a city, a design challenge — and to work through it with students rather than lecture about it.'),
      p('The result was a week of unusually lively rooms. A pricing problem from a European retailer was compared with the same problem in an Indian kirana network. A branding exercise looked completely different once it had to work in three languages.'),
      quote('Students here ask the question behind the question. That is the most valuable thing a visiting professor can be given.', 'A visiting professor'),
      h2('Why it matters'),
      p('International exposure is often reduced to travel. Faculty week is a reminder that perspective can travel too. For students who will spend their careers working with partners, clients and colleagues in other countries, learning to see a problem from another context is not an extra — it is part of the job.'),
    ),
  }),

  post({
    slug: 'five-ideas-from-a-global-conversation-on-management-education',
    title: 'Five ideas from a global conversation on management education',
    excerpt: 'Academics and practitioners from several countries met to ask what business schools should teach next. Here is what stood out.',
    publishedAt: '2026-10-15T06:00:00.000Z',
    featuredMedia: { ...MEDIA.seminarRoom, caption: 'A seminar session during the conference.' },
    primaryCategory: 'global',
    categories: ['global', 'insights'],
    contentHtml: body(
      p('Conferences on the future of education can drift into abstraction. This one stayed grounded, largely because so many sessions were run as workshops with students in the room. A few ideas came up again and again.'),
      ol([
        '<strong>Teach judgement, not just frameworks.</strong> Frameworks are easy to look up; knowing which one to use, and when to ignore all of them, is not.',
        '<strong>Make ethics practical.</strong> Ethical questions belong inside the case, the project and the simulation — not in a separate module at the end.',
        '<strong>Treat AI as a colleague to be questioned.</strong> Students should learn to use new tools fluently and to check their output critically.',
        '<strong>Blend disciplines early.</strong> Business problems rarely respect the boundaries between design, technology and management.',
        '<strong>Measure learning by what students can do.</strong> Portfolios, live projects and presentations reveal more than exams alone.',
      ]),
      quote('The question is no longer what students should know. It is what they should be able to do on a Monday morning.', 'A conference panellist'),
      p('None of these ideas is new on its own. What felt different was the agreement across countries and institutions that they now need to move from pilot projects to the core of the curriculum.'),
    ),
  }),

  post({
    slug: 'the-library-after-hours-the-quiet-engine-of-exam-season',
    title: 'The library after hours: the quiet engine of exam season',
    excerpt: 'In the last weeks of term the library changes character — from a reading room to a study hall, a peer-tutoring hub and, occasionally, a place to laugh off the stress.',
    publishedAt: '2026-10-12T14:30:00.000Z',
    featuredMedia: { ...MEDIA.libraryStudy, caption: 'Study groups in the library during exam season.' },
    primaryCategory: 'student-life',
    categories: ['student-life'],
    contentHtml: body(
      p('There is a particular sound to a library in exam season: pages turning, keyboards clicking, and every few minutes a burst of muffled laughter from a table that has been revising for too long.'),
      p('Students describe the library in the last weeks of term less as a building and more as a routine. A seat by the window in the morning, a group table after lunch, and a quiet corner in the evening when the notes finally start to make sense.'),
      h2('Peer learning, unofficially'),
      p('Some of the most effective teaching on campus happens without a timetable. Second-year students explain concepts to first-years, design students help management students with presentations, and everyone shares the best notes they can find.'),
      quote('I understood the topic properly only when I had to explain it to someone else at the next table.', 'A second-year student'),
      p('Library staff, for their part, see exam season as their busiest and most rewarding time — a reminder that a library is not only a collection of books but a place where a community learns together.'),
    ),
  }),

  post({
    slug: 'the-families-behind-every-degree',
    title: 'The families behind every degree',
    excerpt: 'A photo essay from convocation day, where the proudest people in the room were often the ones in the audience.',
    publishedAt: '2026-10-09T10:00:00.000Z',
    featuredMedia: { ...MEDIA.graduateWithFamily, caption: 'A graduate and family after the ceremony.' },
    primaryCategory: 'student-life',
    categories: ['student-life'],
    contentHtml: body(
      p('Every degree has more than one name on it, even if only one is printed. On convocation day, the families who made those years possible filled the hall, the corridors and every corner of the photo wall.'),
      gallery(
        [
          [MEDIA.familiesGathered, 'Families gather as the ceremony ends.'],
          [MEDIA.familyPortrait, 'A portrait years in the making.'],
          [MEDIA.graduationDayArch, 'The arch that everybody wanted a photograph under.'],
          [MEDIA.balloonArch, 'Friends, families and a great many balloons.'],
        ],
        { cols: 2, caption: 'Scenes from convocation day.' },
      ),
      quote('My parents travelled overnight to be here. Walking across that stage was for them as much as for me.', 'A graduate'),
      p('For many families it was their first time on campus; for others, the last of many visits over the years. Either way, the day belonged to them as much as to the graduates in the blue gowns.'),
    ),
  }),

  post({
    slug: 'material-first-accessory-design-students-start-with-the-hand',
    title: 'Material first: accessory design students start with the hand, not the sketch',
    excerpt: 'Before a single drawing, students spend weeks handling leather, metal and resin. The objects that result look nothing like a first-year portfolio.',
    publishedAt: '2026-10-06T07:30:00.000Z',
    featuredMedia: { ...MEDIA.redShoe, caption: 'A sculptural heel developed from material experiments.' },
    primaryCategory: 'achievements',
    categories: ['achievements', 'academic'],
    contentHtml: body(
      p('Accessory design is often taught from the outside in: a sketch, a technical drawing, then a search for materials that can deliver it. The accessory design studio at ISDI deliberately reverses that order.'),
      p('Students begin by working with materials directly — cutting, folding, moulding and finishing — until they understand how each one behaves. Only then do they design, and the designs grow out of what the materials can do rather than what a drawing demands.'),
      gallery(
        [
          [MEDIA.leatherBag, 'Texture explored through a structured bag.'],
          [MEDIA.redShoe, 'Form led by the stiffness of the material.'],
        ],
        { cols: 2 },
      ),
      quote('Once you know what the leather wants to do, the shape almost draws itself.', 'An accessory design student'),
      p('The approach produces work with an unmistakable confidence: objects that look resolved because their makers understand every seam. Several pieces from the studio went on to feature in the graduate showcase.'),
    ),
  }),

  post({
    slug: 'rethinking-the-lecture-for-an-age-of-divided-attention',
    title: 'Rethinking the lecture for an age of divided attention',
    excerpt: 'Smart classrooms are not about screens. They are about rooms that let a class switch, in minutes, from listening to arguing to building.',
    publishedAt: '2026-10-02T05:00:00.000Z',
    featuredMedia: { ...MEDIA.smartClassroom, caption: 'A reconfigurable smart classroom on campus.' },
    primaryCategory: 'insights',
    categories: ['insights', 'academic'],
    contentHtml: body(
      p('The traditional lecture theatre is built for one activity: one person speaking, many people listening. It does that well. It does almost everything else badly.'),
      p('Contemporary teaching rarely stays in one mode for long. A session might open with a short explanation, move into small-group problem solving, pause for a quick poll, and end with teams presenting to each other. Rooms either support that rhythm or fight it.'),
      h2('Design for movement'),
      ul([
        'Curved, movable desks that become group tables in seconds.',
        'Displays that any team can share to, not just the instructor.',
        'Lighting and acoustics tuned for discussion as well as listening.',
      ]),
      quote('The best room is the one you stop noticing. If the furniture is fighting the lesson, the lesson loses.', 'A faculty member'),
      p('Technology is the least interesting part of a smart classroom. What matters is that the room makes it easy for teaching to change shape as often as attention does.'),
    ),
  }),

  post({
    slug: 'learning-in-three-dimensions-where-immersive-tech-fits',
    title: 'Learning in three dimensions: where immersive tech fits in the curriculum',
    excerpt: 'Virtual and mixed reality are moving from novelty to studio tool. The challenge is using them where they genuinely help — and nowhere else.',
    publishedAt: '2026-09-28T09:00:00.000Z',
    featuredMedia: { ...MEDIA.vrStudent, caption: 'Immersive tools are increasingly part of studio work.' },
    primaryCategory: 'insights',
    categories: ['insights'],
    contentHtml: body(
      p('Every few years a technology arrives that promises to transform the classroom. Most of them end up in a cupboard. Immersive technology may be different, but only if it is used with discipline.'),
      p('Where it clearly helps is in spatial work: walking through an interior before it is built, examining a product at full scale, rehearsing a procedure that would be expensive or unsafe to repeat in reality.'),
      h2('Three questions before using it'),
      ol([
        'Does the task depend on space, scale or presence?',
        'Would a drawing, a model or a video do the job just as well?',
        'Can students reflect on what they saw once the headset comes off?',
      ]),
      p('If the answer to the first question is no, the headset is usually a distraction. If it is yes, immersive tools can compress weeks of imagination into a few minutes of experience.'),
    ),
  }),

  post({
    slug: 'why-the-wellness-centre-is-part-of-the-curriculum',
    title: 'Why the wellness centre is part of the curriculum, not an afterthought',
    excerpt: 'Demanding programmes need support that is easy to reach. On campus, counselling and medical care sit a short walk from every classroom.',
    publishedAt: '2026-09-24T06:15:00.000Z',
    featuredMedia: { ...MEDIA.wellnessCentre, caption: 'The campus health and wellness centre.' },
    primaryCategory: 'student-life',
    categories: ['student-life'],
    contentHtml: body(
      p('Intensive studio work, live client projects and a busy city all make for an exciting education. They also make for long days. Support that is hard to reach is support that students do not use.'),
      p('That is why the health and wellness centre sits inside the campus rather than across town. Students can see a doctor, speak to a counsellor or simply take a break in a quiet room without losing half a day.'),
      quote('The goal is that asking for help feels as normal as asking a question in class.', 'A member of the student support team'),
      p('Wellbeing is increasingly treated as part of learning rather than something separate from it. Students who are rested and supported take more creative risks, collaborate better and recover from setbacks faster — exactly the habits their programmes are trying to build.'),
    ),
  }),

  post({
    slug: 'placement-season-decoded',
    title: 'Placement season, decoded: mock interviews, portfolios and the follow-up email',
    excerpt: 'What recruiters notice, what students over-prepare for, and the small habits that make the biggest difference.',
    publishedAt: '2026-09-20T08:45:00.000Z',
    featuredMedia: { ...MEDIA.studentsLaptops, caption: 'Students reviewing portfolios before interviews.' },
    primaryCategory: 'industry',
    categories: ['industry', 'insights'],
    contentHtml: body(
      p('Placement season has a reputation for stress, and some of it is deserved. But conversations with career advisers and recruiters suggest that most of the difference between candidates comes down to preparation that is entirely within a student’s control.'),
      h2('What recruiters notice'),
      ul([
        '<strong>Clarity over coverage.</strong> A focused account of one project beats a list of ten.',
        '<strong>Evidence of iteration.</strong> Showing how work improved after feedback signals maturity.',
        '<strong>Curiosity about the company.</strong> Specific questions are remembered long after generic answers.',
      ]),
      h2('What students over-prepare for'),
      p('Memorised answers to common questions tend to sound memorised. Advisers recommend preparing stories instead — short, honest accounts of a challenge, a decision and an outcome — that can be adapted to whatever is asked.'),
      quote('The follow-up email is the most underrated part of an interview. Two sentences, sent the same day, can change how you are remembered.', 'A career adviser'),
      p('Mock interviews run through the term give students a chance to fail somewhere safe. The most useful feedback, students say, is often about the first thirty seconds: how they walk in, how they introduce their work, and whether they listen before they answer.'),
    ),
  }),

  post({
    slug: 'styling-the-story-a-fashion-communication-project-in-five-frames',
    title: 'Styling the story: a fashion communication project in five frames',
    excerpt: 'For their editorial project, fashion communication students had to sell a mood, not a product. The shoot became a lesson in restraint.',
    publishedAt: '2026-09-16T12:00:00.000Z',
    featuredMedia: { ...MEDIA.editorialPortrait, caption: 'An editorial frame from the student shoot.' },
    primaryCategory: 'achievements',
    categories: ['achievements', 'student-life'],
    contentHtml: body(
      p('The brief was a single line: create an editorial that makes the reader feel the season before they see a single price tag. Students had one location, a small budget and a strict limit of five final images.'),
      p('Five frames forces choices. Every prop, every colour and every angle has to earn its place. The strongest submissions treated the shoot like a short story, with an opening image, a turn and a final frame that lingered.'),
      gallery(
        [
          [MEDIA.editorialPortraitWide, 'The opening frame sets the palette.'],
          [MEDIA.stillLife, 'A still life carries the mood between portraits.'],
          [MEDIA.leatherBag, 'Detail shots slow the reader down.'],
        ],
        { cols: 3 },
      ),
      quote('We kept removing things until the picture said exactly one thing.', 'A fashion communication student'),
      p('Reviewers praised the discipline of the work — and the way several teams used colour, rather than clothing, as the thread that tied the story together.'),
    ),
  }),

  post({
    slug: 'designing-rooms-for-arguing-well',
    title: 'Designing rooms for arguing well',
    excerpt: 'The best ideas on campus often start as disagreements. Collaborative spaces are built to make those disagreements productive.',
    publishedAt: '2026-09-12T07:00:00.000Z',
    featuredMedia: { ...MEDIA.collaborativeWorkspace, caption: 'An open collaborative workspace between classes.' },
    primaryCategory: 'student-life',
    categories: ['student-life', 'academic'],
    contentHtml: body(
      p('Walk through the collaborative floors between classes and you will hear a great deal of disagreement. That is by design. Rooms built for teamwork are, in practice, rooms built for arguing well.'),
      p('Round tables put everyone at the same distance from the centre. Writable walls make an idea visible enough to be challenged. Glass partitions let groups work privately without disappearing from the community around them.'),
      figure(MEDIA.discussionRoom, 'A smaller room for focused team discussions.'),
      quote('A good argument needs a table everyone can reach and a wall everyone can see.', 'A student project lead'),
      p('Students choose spaces the way they choose collaborators: by the kind of conversation they need. Quick decisions happen standing at a high table; difficult ones happen in a closed room with the door shut and a whiteboard full of crossed-out options.'),
    ),
  }),
]);

/**
 * Homepage arrangement — the `atlasnews_homepage_slots` table (position → post). Positions 1-4 are the
 * hero (1 = lead, 2-4 = companions); 5 is the full-width spotlight.
 */
export const HOMEPAGE_SLOTS = Object.freeze([
  'a-graduating-class-steps-into-a-world-still-being-written',
  'sensorium-when-a-courtyard-became-a-runway',
  'in-the-robotics-lab-first-years-build-before-they-theorise',
  'product-leaders-on-shipping-when-the-brief-keeps-changing',
  'why-a-university-belongs-in-the-middle-of-the-city',
]);

/** "Most read" — editorially chosen for the preview; later this comes from analytics. */
export const TRENDING = Object.freeze([
  'sensorium-when-a-courtyard-became-a-runway',
  'placement-season-decoded',
  'material-first-accessory-design-students-start-with-the-hand',
  'international-faculty-bring-the-world-into-a-mumbai-classroom',
  'rethinking-the-lecture-for-an-age-of-divided-attention',
]);
