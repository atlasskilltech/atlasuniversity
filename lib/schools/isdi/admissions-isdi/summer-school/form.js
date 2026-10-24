/*
* The `#smr-form` block — `.form-wrapper.isdi > .container.dflex >
 * (.left-fm, .right-fm > .npf_wgts)`. The target of the "Know more" button in
 * "Dates & Registration".
 *
 * **The right half is a live NoPaperForms widget**, the same integration the brochure
 * popups use: an empty `div.npf_wgts[data-w]` that `widgets.in5.nopaperforms.com/emwgts.js`
 * fills with its own iframe. It is reproduced rather than flattened — on production the
 * script really does run on load and paints a 500px enquiry form inside a 700px container
 * (verified: `.npf_wgts` computes 700px tall and holds one iframe at `height="500px"`).
 *
 * Unlike the brochure popups, this widget is **not** deferred behind a click: the
 * reference injects the script inline, so the port loads it when the block mounts. That
 * makes `widgets.in5.nopaperforms.com` the one remote host this page contacts, and it is
 * the reference's own.
 */
export const isdiAdmSummerSchoolForm = {
  id: 'smr-form',
  title: 'Empowering Futures, Transforming Leaders',
  text: 'The ATLAS | ISDI Management Summer School is dedicated to ensuring students derive joy from their learning experience while fostering their holistic academic and personal growth.',
  /* ref `.form-wrapper.isdi` — #173a87 under `footer-vector.png`, already on disk */
  image: '/assets/images/schools/isdi/footer/footer-vector.png',
  widget: {
    /* ref `data-w` on the `.npf_wgts` div */
    id: 'ec5936cdcd3f8d6dfcc968e99d13fd44',
    /* ref `data-height` — the attribute the widget script reads for its iframe */
    height: '500px',
  },
};
