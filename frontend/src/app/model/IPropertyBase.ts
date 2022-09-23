export interface IPropertyBase {
  id: number;
  sellRent: number;
  name: string;
  ptype: string;
  ftype: string;
  price: number;
  bhk: number;
  builtArea: number ;
  city: string ;
  readyToMove: boolean;
  photo?: string;
  estPossessionOn?: string;
}
