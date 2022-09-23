import { DatePipe } from '@angular/common';
import { Component, OnInit,ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { IKeyValuePair } from '../model/IKeyValuePair';
import { IPropertyBase } from '../model/IPropertyBase';
import { Property } from '../model/property';
import { AlertifyService } from '../services/alertify.service';
import { HousingService } from '../services/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
   //@ViewChild('Form') AddPropertyForm: NgForm;

  @ViewChild('formTabs') formTabs: TabsetComponent;
  nextClicked: boolean;
  addPropertyForm: FormGroup;
  // will come from masters
  PropertyType:  IKeyValuePair[];
  furnishTypes: IKeyValuePair[];
  property = new Property();
   cityList: any[];
  propertyView: IPropertyBase = {
    id: null,
    name: '',
    price: null,
    sellRent: null,
    ftype: null,
    ptype: null,
    bhk: null,
    builtArea: null ,
    city: '',

    readyToMove: null
  };

  constructor(
    private fb: FormBuilder,
    private housingService: HousingService,
    private alertify: AlertifyService,
    private router: Router,
    private datePipe: DatePipe
    ) { }


  ngOnInit() {

    this.CreateAddPropertyForm();
    this.housingService.getallcities().subscribe(data => {
      this.cityList = data;
      console.log(data);
    })
    this.housingService.getPropType().subscribe(data => {
      this.PropertyType = data;
    });
    this.housingService.getFurnishingType().subscribe(data => {
      this.furnishTypes = data;
    });


  }


  CreateAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
        BasicInfo: this.fb.group({
            SellRent: ['1' , Validators.required],
            BHK: [null, Validators.required],
            Ptype: [null, Validators.required],
            Ftype: [null, Validators.required],
            Name: [null, Validators.required],
            city: [null, Validators.required]
        }),

        PriceInfo: this.fb.group({
            price: [null, Validators.required],
            builtArea: [null, Validators.required],
            CarpetArea: [null],
            Security: [0],
            Maintenance: [0],
        }),

        AddressInfo: this.fb.group({
            FloorNo: [null],
            TotalFloor: [null],
            Address: [null, Validators.required],
            LandMark: [null],
        }),

        OtherInfo: this.fb.group({
            RTM: [null, Validators.required],
            PossessionOn: [null, Validators.required],
            AOP: [null],
            Gated: [null],
            MainEntrance: [null],
            Description: [null]
        })
    });
  }


  OnSubmit() {
    this.nextClicked = true;
    if (this.alltabsvild()) {
      this.mapProperty();
      this.housingService.addProperty(this.property).subscribe(() => {
        this.alertify.success('Congrats, your property listed successfully on our website');
        console.log(this.addPropertyForm);
        if (this.sellRent.value === '2') {
          this.router.navigate(['/rent-propety']);
        } else {
          this.router.navigate(['/']);
        }
      });

    }
    else {
      this.alertify.error('Please review the form and provide all valid entries');
    }
  }
  mapProperty(): void {
    this.property.id = this.housingService.newPropID();
     this.property.sellRent = +this.sellRent.value;
    this.property.bhk = this.bhk.value;
    this.property.propertyTypeId = this.Ptype.value;
    this.property.name = this.Name.value;
    this.property.CityId = this.city.value;
    this.property.furnishingTypeId = this.Ftype.value;
    this.property.price = this.price.value;
    this.property.security = this.Security.value;
    this.property.maintenance = this.maintenance.value;
    this.property.builtArea = this.builtArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.floorNo = this.FloorNo.value;
    this.property.totalFloors = this.TotalFloors.value;
    this.property.address = this.address.value;
    this.property.address2 = this.landMark.value;
    this.property.readyToMove = this.readyToMove.value;
    this.property.gated = this.Gated.value;
    this.property.mainEntrance = this.maintenance.value;
    this.property.estPossessionOn =
    this.datePipe.transform(this.PossessionOn.value,'MM/dd/yyyy');
      this.property.description = this.Description.value;
    // this.property.estPossessionOn= new Date().toString();
}
  selectTab(tabId: number, IsCurrentTabValid: boolean) {
    this.nextClicked = true;
    if(IsCurrentTabValid){
      this.formTabs.tabs[tabId].active = true;
    }

  }
  alltabsvild(): boolean{
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
  }

  if (this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
  }

  if (this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
  }

  if (this.OtherInfo.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
  }
    return true;
  }
   // #region <Getter Methods>
    // #region <FormGroups>


get BasicInfo() {
  return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
}

  get PriceInfo() {
    return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
}

get AddressInfo() {
    return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
}

get OtherInfo() {
    return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
}
  // #endregion
// #endregion


    // #region <Form Controls>
    get sellRent() {
      return this.BasicInfo.controls['SellRent'] as FormControl;
    }
    get price() {
      return this.PriceInfo.controls['price'] as FormControl;
    }
    get bhk() {
      return this.BasicInfo.controls['BHK'] as FormControl;
  }

  get Ptype() {
      return this.BasicInfo.controls['Ptype'] as FormControl;
  }

  get Ftype() {
      return this.BasicInfo.controls['Ftype'] as FormControl;
  }

  get Name() {
      return this.BasicInfo.controls['Name'] as FormControl;
  }

  get city() {
      return this.BasicInfo.controls['city'] as FormControl;
  }
  get builtArea() {
    return this.PriceInfo.controls['builtArea'] as FormControl;
}

get CarpetArea() {
    return this.PriceInfo.controls['CarpetArea'] as FormControl;
}

get Security() {
    return this.PriceInfo.controls['Security'] as FormControl;
}

get maintenance() {
    return this.PriceInfo.controls['Maintenance'] as FormControl;
}

get FloorNo() {
    return this.AddressInfo.controls['FloorNo'] as FormControl;
}

get TotalFloors() {
    return this.AddressInfo.controls['TotalFloor'] as FormControl;
}

get address() {
    return this.AddressInfo.controls['Address'] as FormControl;
}

get landMark() {
    return this.AddressInfo.controls['LandMark'] as FormControl;
}

get readyToMove() {
    return this.OtherInfo.controls['RTM'] as FormControl;
}

get PossessionOn() {
    return this.OtherInfo.controls['PossessionOn'] as FormControl;
}

get AOP() {
    return this.OtherInfo.controls['AOP'] as FormControl;
}

get Gated() {
    return this.OtherInfo.controls['Gated'] as FormControl;
}

get mainEntrance() {
    return this.OtherInfo.controls['MainEntrance'] as FormControl;
}

get Description() {
    return this.OtherInfo.controls['Description'] as FormControl;
}
}
