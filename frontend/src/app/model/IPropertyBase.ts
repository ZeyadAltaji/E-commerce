export interface IPropertyBase {
  id: number;
  Name: string;
  SellRent: number;
  Ptype: string;
  Ftype: string;
  price: number;
  BHK: number;
  ReadyToMove: boolean;
  builtArea: number;
  city: string;
  Image?: string;
  estPossessionOn?: string;
}
