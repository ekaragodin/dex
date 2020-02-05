export class ExecError extends Error {
  code: number;

  constructor(code: number, ...params) {
    super(...params);
    this.code = code;
  }
}
