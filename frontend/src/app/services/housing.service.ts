import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import{IProperty} from '../Property_interface/IProperty.interface'
import { Observable } from 'rxjs';
import { Property } from '../model/property';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HousingService {
  baseUrl = environment.baseUrlGetProp;
  constructor(private http: HttpClient) { }

  getallcities(): Observable<string[]> {
    return this.http.get<string[]>('https://localhost:44369/api/City');
  }
  getprop(id: number) {
    return this.getallProp(1).pipe(
      map(propertiesArray => {
        // throw new Error('some error');
        return propertiesArray.find(p => p.id === id);
      }
      )
    );
  }
  getallProp(sellRent?: number): Observable<Property[]> {
    return this.http.get<Property[]>(this.baseUrl+'Property/Type/'+sellRent.toString());
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
    let newProp = [property];
    if (localStorage.getItem('newProp')) {
      newProp = [property,
        ...JSON.parse(localStorage.getItem('newProp'))];
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
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
}
// for (const id in localproperties) {
//   if (localproperties.hasOwnProperty(id) && localproperties[id].SellRent === SellRent) {
//    propertiesArray.push(localproperties[id])
//  }
// }
