import { UserDTO } from '@swagger/model/userDTO';

export namespace User {
  export class Set {
    static type = '[User] Set User';
    constructor(public value: UserDTO) {}
  }
}
