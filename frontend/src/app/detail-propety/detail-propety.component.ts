import { Component, OnInit } from '@angular/core';
import { literalMap } from '@angular/compiler';
import { HousingService } from 'src/app/services/housing.service';
import { ActivatedRoute ,Router} from '@angular/router';
import { Property } from '../model/property';

@Component({
  selector: 'app-detail-propety',
  templateUrl: './detail-propety.component.html',
  styleUrls: ['./detail-propety.component.css']
})
export class DetailPropetyComponent implements OnInit {
  public propID: number;
  property = new Property();
  constructor(private route: ActivatedRoute,
    private router: Router,
    private housingService: HousingService) { }
  ngOnInit() {
    this.propID = this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: Property) => {
        this.property = data['prp']
      }
    );


    // this.route.params.subscribe(
    //   (params) => {
    //     this.propID = +params['id'];
    //     this.housingService.getprop(this.propID).subscribe(
    //       (data:Property) => {
    //         this.property= data;
    //       },error => {
    //           this.router.navigate(['/'])
    //       }

    //     )
    //   }
    // )
  }
  OnSelectNext() {

    this.propID += 1;
    this.router.navigate(['info-propety/',this.propID])
  }
}
