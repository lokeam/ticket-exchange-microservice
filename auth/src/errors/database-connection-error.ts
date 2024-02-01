export class DatabaseConnectionError extends Error {
  // test: hardcoded reason
  reason = 'Error connecting to database';

  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
