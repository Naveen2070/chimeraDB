/**
 * Represents a document in the database.
 *
 * @interface Document
 * @export
 */
/**
 * Represents a document in the database.
 *
 * @interface Document
 * @export
 * @example
 * const document: Document = {
 *   id: 'unique-id',
 *   name: 'John Doe',
 *   age: 30,
 *   email: 'john.doe@example.com'
 * };
 */
export interface Document {
  /**
   * The unique identifier of the document.
   * @type {string}
   * @example
   * 'unique-id'
   */
  id: string;

  /**
   * The data stored in the document.
   * @type {Record<string, any>}
   * @example
   * {
   *   name: 'John Doe',
   *   age: 30,
   *   email: 'john.doe@example.com'
   * }
   */
  [key: string]: any;
}
