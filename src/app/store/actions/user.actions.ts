import { UserVO } from '@swagger/model/userVO';

export namespace User {
  export class Set {
    static type = '[User] Set User';
    constructor(public value: UserVO) {}
  }
}
