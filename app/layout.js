import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import PageLoader from '@/components/ui/PageLoader';

export const metadata = {
  title: 'ATLAS SkillTech University in Mumbai – Explore Programs & Admissions',
  description:
    'Explore programs, admissions, campus life, multidisciplinary courses and industry-focused learning designed to build future-ready skills and career pathways.',
  metadataBase: new URL('https://atlasuniversity.edu.in'),
  icons: {
    icon: '/assets/logos/favicon-32x32.png',
    apple: '/assets/logos/atlas-256.png',
  },
  openGraph: {
    siteName: 'ATLAS SKILLTECH UNIVERSITY',
    title: "ATLAS SkillTech University: India's 1st Urban Multidisciplinary University",
    url: 'https://atlasuniversity.edu.in/',
    type: 'website',
    locale: 'en_US',
    description:
      'Degree Courses: Improve your knowledge & multidisciplinary skills with #1 university ATLAS SkillTech University in India. Check out our various specialisation courses. Enroll Now!',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ATLAS SkillTech University: India's 1st Urban Multidisciplinary University",
    description:
      'Degree Courses: Improve your knowledge & multidisciplinary skills with #1 university ATLAS SkillTech University in India. Check out our various specialisation courses. Enroll Now!',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/assets/fonts/manrope-latin.woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        <Header />

        {/*
          No spacer here on purpose. The header bars are position:fixed, and the
          reference lets full-bleed sections (the homepage hero) start at y=0 so
          the translucent header floats over them. Pages that open with ordinary
          content should render <HeaderSpacer /> as their first element.
        */}
        {children}

        <Footer />

        {/*
          The route-transition overlay. A direct child of <body> on purpose:
          it is `position: fixed; z-2000`, and every other ancestor in this tree
          (`CONTAINER` carries `relative z-[1]`) would clamp it below the fixed
          header bars at z-1090/1100. Last in DOM order so it also wins against
          equal z-index siblings.
        */}
        <PageLoader />
      </body>
    </html>
  );
}
