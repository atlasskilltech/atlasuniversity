/* Shown on the Key Dates admin pages when the database cannot be read: the pages still list every table
   as the website was built, but changes cannot be saved until the database is back. */
export default function DbNotice({ dbError }) {
  if (!dbError) return null;
  return (
    <div role="status" className="mb-5 rounded-xl border border-[#f5d48a] bg-[#fff8e6] px-4 py-3 text-[14px] text-[#6b4e00]">
      {dbError === 'not_configured'
        ? 'The database is not configured on this server, so the tables below are shown as the website was built and changes cannot be saved here.'
        : 'The database could not be reached. The tables below are shown as the website was built; saving will work again once the database is back.'}
    </div>
  );
}
