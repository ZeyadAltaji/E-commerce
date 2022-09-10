import { Component, OnInit } from '@angular/core';
import { HousingService } from '../services/housing.service'
 import { ActivatedRoute, Router } from '@angular/router';
import { IPropertyBase } from '../model/IPropertyBase';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  // Properties: IPropertyBase[];
  Properties: IPropertyBase[];
  Today = new Date();
  city = '';
  SearchCity = '';
  SortbyParam = '';
  SortDirection = 'asc';

  constructor(private route :ActivatedRoute, private housingService: HousingService) { }

  ngOnInit(): void {
    if (this.route.snapshot.url.toString() ) {
      this.SellRent = 2;
    }
     this.housingService.getallProp( ).subscribe(
       data => {
         this.Properties = data;
         console.log(data);
       }, error => {
         console.log('http errors');
         console.log(Error);
      }
    )

  }
  onCityFilter() {
    this.SearchCity = this.city;

  }
  onCityFilterClear() {
    this.SearchCity = '';
    this.city = '';

  }
  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
  } else {
      this.SortDirection = 'desc';
  }
  }
}

