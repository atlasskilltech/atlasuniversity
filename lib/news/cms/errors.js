/**
 * ATLAS News CMS — the one error type the service layer throws for anything the editor should see.
 * Route handlers turn it into `{ error, code, fields }` with its status; any OTHER error becomes a
 * generic 503 that names only an error code (see lib/news/cms/http.js), so no SQL, stack or server
 * detail ever reaches a response.
 */
export class CmsError extends Error {
  /**
   * @param {number} status   HTTP status (400 validation, 404, 409 conflict …)
   * @param {string} code     machine-readable code
   * @param {string} message  sentence shown to the editor
   * @param {object} [fields] field → message, shown next to each field
   */
  constructor(status, code, message, fields = undefined) {
    super(message);
    this.name = 'CmsError';
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

/** Throw a 400 if a validator returned errors. */
export function assertValid({ errors }) {
  const keys = Object.keys(errors || {});
  if (keys.length) throw new CmsError(400, 'validation', errors._ || 'Please correct the highlighted fields.', errors);
}

export const notFound = (what = 'Item') => new CmsError(404, 'not_found', `${what} not found.`);
