import { IPropertyBase } from "./IPropertyBase";

export class Property implements IPropertyBase{
  id: number;
  sellRent: number;
  name: string;
  propertyTypeId: number;
  ptype: string;
  bhk: number;
  furnishingTypeId: number;
  ftype: string;
  price: number;
  builtArea: number;
  CarpetArea?: number;
  address: string;
  address2?: string;
  CityId: number;
  city: string;
  floorNo?: string;
  totalFloors?: string;
  readyToMove: boolean;
  age?: string;
  mainEntrance?: string;
  security?: number;
  gated?: boolean;
  maintenance?: number;
  estPossessionOn?:string;
  photo?: string;
  description?: string;
  // photos?: Photo[];

}
