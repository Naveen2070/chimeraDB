/**
 * Represents a table in the database.
 *
 * @interface Table
 */
export interface Table {
  /**
   * The name of the table.
   */
  name: string;

  /**
   * The array of column names.
   */
  columns: string[];

  /**
   * The array of rows, where each row is an array of values corresponding
   * to the columns.
   */
  rows: any[][];
}
