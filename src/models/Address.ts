export class Address {
  id: number;
  street: string;
  number: number;
  complement: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;

  constructor(obj: any) {
    this.id = obj.id;
    this.street =  obj.street;
    this.number =  obj.number;
    this.district =  obj.district;
    this.complement =  obj.complement;
    this.city =  obj.city;
    this.state =  obj.state;
    this.zipCode =  obj.zipCode;
  }
}
