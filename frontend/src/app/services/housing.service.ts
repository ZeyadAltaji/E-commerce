import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import{IProperty} from '../Property_interface/IProperty.interface'
import { Observable } from 'rxjs';
import { Property } from '../model/property';
import { environment } from 'src/environments/environment';
import { IKeyValuePair } from '../model/IKeyValuePair';
@Injectable({
  providedIn: 'root'
})
export class HousingService {
  baseUrl = environment.baseUrlGetProp;
  baseUrlTy = environment.baseURlpropType;
  baseUrlFurnishingType = environment.baseUrlFurnishingType;
  baseadd = environment.baseUrladd;
  constructor(private http: HttpClient) { }

  getallcities(): Observable<string[]> {
    return this.http.get<string[]>('https://localhost:44369/api/City');
  }
  getPropType(): Observable<IKeyValuePair[]> {
    return this.http.get<IKeyValuePair[]>(this.baseUrlTy+'/PropertyTypeRepository/list');
  }
  getFurnishingType(): Observable<IKeyValuePair[]> {
    return this.http.get<IKeyValuePair[]>(this.baseUrlFurnishingType+'/FurnishingType/list');
  }
  getProperty(id: number) {
    // return this.http.get<Property>(this.baseUrl + 'Property/Detail/' + id.toString());
    return this.http.get<Property>(this.baseUrl + '/Property/Detail/'+id.toString());


  }
  getallProp(SellRent?: number): Observable<Property[]> {
      return this.http.get<Property[]>(this.baseUrl+'/Property/List/'+SellRent.toString());
  // return this.http.get('data/Properties.json').pipe(
  //   map(data => {
  //     const propertiesArray: Array<Property> = [];
  //     const localproperties = JSON.parse(localStorage.getItem('newprop'));
  //     if (localproperties) {
  //        for (const id in localproperties) {
  //         if (SellRent) {
  //           if (localproperties.hasOwnProperty(id) && localproperties[id].SellRent === SellRent) {
  //             propertiesArray.push(localproperties[id]);
  //           }
  //         }else {
  //           propertiesArray.push(localproperties[id]);
  //         }
  //       }
  //     }
  //     for (const id in data) {
  //       if (SellRent) {
  //         if (data.hasOwnProperty(id) && data[id].SellRent===SellRent) {
  //           propertiesArray.push(data[id]);
  //         }
  //       } else {
  //         propertiesArray.push(data[id]);

  //      }

  //     }
  //     return propertiesArray;
  //   })
  // );
  // return this.http.get<Property[]>('data/Properties,json');
}
  addProperty(property: Property) {
    // const httpOptions = {
    //   Headers: new HttpHeaders({
    //     Authorization: 'Bearer' + localStorage.getItem('token')
    //   })

    // };
    // return this.http.post(this.baseadd + '/Property/add', property, httpOptions);
    // let newProp = [property];
    // if (localStorage.getItem('newProp')) {
    //   newProp = [property,
    //     ...JSON.parse(localStorage.getItem('newProp'))];
    // }
    // localStorage.setItem('newProp', JSON.stringify(newProp));
    const httpOptions = {
      headers: new HttpHeaders({
          Authorization: 'Bearer'+ localStorage.getItem('token')
      })
  };
  return this.http.post(this.baseadd + '/property/add', property, httpOptions);
  }

  newPropID() {
    if (localStorage.getItem('PID')) {
      localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
      return +localStorage.getItem('PID');

    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
  getPropertyAge(dateofEstablishment: string): string
  {
      const today = new Date();
      const estDate = new Date(dateofEstablishment);
      let age = today.getFullYear() - estDate.getFullYear();
      const m = today.getMonth() - estDate.getMonth();

      // Current month smaller than establishment month or
      // Same month but current date smaller than establishment date
      if (m < 0 || (m === 0 && today.getDate() < estDate.getDate())) {
          age --;
      }

      // Establshment date is future date
      if(today < estDate) {
          return '0';
      }

      // Age is less than a year
      if(age === 0) {
          return 'Less than a year';
      }

      return age.toString();
  }
}


