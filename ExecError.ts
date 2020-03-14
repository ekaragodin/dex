export class ExecError extends Error {
  code: number;

  constructor(code: number, ...params: any[]) {
    super(...params);
    this.code = code;
  }
}
