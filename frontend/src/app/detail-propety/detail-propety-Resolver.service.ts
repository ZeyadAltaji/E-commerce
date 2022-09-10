import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {  Observable, of } from 'rxjs';
import { Property } from 'src/app/model/property';
import { HousingService } from '../services/housing.service';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DetailPropetyResolverService implements Resolve<Property> {

constructor(private router:Router,private housingService:HousingService) { }
      resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      Observable<Property>|Property {
          const propId = route.params['id'];
          return this.housingService.getprop(+propId).pipe(
              catchError(error => {
                  this.router.navigate(['/']);
                  return of(null);
              })
          );
      }
}
