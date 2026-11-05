import { IMG } from './paths';

const L = `${IMG}/stats`;

/*
 * 14. Figures band + recruiter logos — index.php:3233-3259. `spaced` marks the
 * logos authored with `._50-r-m` (the right margin); the last three have none.
 */
export const isdiStats = {
  stats: [
    { value: '1,200', label: 'On Campus Interviews' },
    { value: '100', label: 'Companies where students work' },
    { value: '100+', label: 'CXO Masterclasses' },
    { value: '50+', label: 'Recruiters on Campus' },
    { value: '20+', label: 'Industry\nDomains' },
  ],
  logos: [
    { src: `${L}/nykaa-fashion.png`, width: 153, height: 86, alt: 'Nykaa Fashion Logo', spaced: true },
    { src: `${L}/mckinsey.png`, width: 183, height: 59, alt: 'McKinsey and Company Logo', spaced: true },
    { src: `${L}/gaurav-gupta.png`, width: 189, height: 48, alt: 'Gaurav Gupta signature logo', spaced: true },
    { src: `${L}/delloite.png`, width: 124, height: 57, alt: 'Deloitte Digital Logo', spaced: true },
    { src: '/assets/images/success/recruiters/landor.png', width: 174, height: 48, alt: 'Landor Logo', spaced: true },
    { src: `${L}/creo.png`, width: 168, height: 57, alt: 'Creo logo', spaced: true },
    { src: `${L}/kunal-rawal.png`, width: 192, height: 85, alt: 'Kunal Rawal Logo', spaced: true },
    { src: `${L}/ibm.png`, width: 120, height: 49, alt: 'IBM Logo', spaced: true },
    { src: `${L}/masaba.png`, width: 147, height: 69, alt: 'Masaba logo', spaced: true },
    { src: `${L}/leo.png`, width: 302, height: 85, alt: 'Leo Burnett signature logo.' },
    { src: `${L}/infosys.png`, width: 128, height: 51, alt: 'Infosys Logo' },
    { src: `${L}/jimmy-choo.png`, width: 209, height: 73, alt: 'Jimmy Choo logo' },
  ],
};
