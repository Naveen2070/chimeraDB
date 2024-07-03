/**
 * Represents a document in the database.
 *
 * @interface Document
 * @export
 */
export interface Document {
  /**
   * The unique identifier of the document.
   * @type {string}
   */
  id: string;

  /**
   * The data stored in the document.
   * @type {Record<string, any>}
   */
  [key: string]: any;
}
