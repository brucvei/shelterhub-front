import {Address} from "./Address";

export class Shelter {
  id: number
  name: string;
  address: Address;
  items: object[];
  constructor(id: number ,name: string, address: any, items: object[]) {
    this.id = id;
    this.name = name;
    this.address = new Address(address);
    this.items = items;
  }
}
