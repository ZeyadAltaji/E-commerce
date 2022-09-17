import { IPropertyBase } from "./IPropertyBase";

export class Property implements IPropertyBase{
    id: number;
    SellRent: number;
    Name: string;
    propertyTypeId: number;
    Ptype: string;
    BHK: number;
    furnishingTypeId: number;
    Ftype: string;
    price: number;
    builtArea: number;
    carpetArea?: number;
    address: string;
    address2?: string;
    CityId: number;
    city: string;
    floorNo?: string;
    totalFloors?: string;
    ReadyToMove: boolean;
    age?: string;
    mainEntrance?: string;
    Security?: number;
    gated?: boolean;
    maintenance?: number;
    estPossessionOn?: string;

    description?: string;
    // photos?: Photo[];
    Image?: string;

}
