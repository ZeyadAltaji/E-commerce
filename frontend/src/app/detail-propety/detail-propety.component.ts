import { Component, OnInit } from '@angular/core';
import { literalMap } from '@angular/compiler';
import { HousingService } from 'src/app/services/housing.service';
import { ActivatedRoute ,Router} from '@angular/router';
import { Property } from '../model/property';
import { HttpClientModule} from '@angular/common/http';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryModule, NgxGalleryOptions } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-detail-propety',
  templateUrl: './detail-propety.component.html',
  styleUrls: ['./detail-propety.component.css']
})
export class DetailPropetyComponent implements OnInit {
  public propertyId: number;
  property = new Property();

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private housingService: HousingService) { }

  ngOnInit() {

    this.propertyId = +this.route.snapshot.params['id'];
    this.housingService.getProperty(this.propertyId).subscribe(
      (data: Property) => {
        this.property = data;
      }, error => {
        console.log('http errors');
        console.log(Error);
      }
    );
    this.property.age = this.housingService.getPropertyAge(this.property.estPossessionOn)



    // this.propID = this.route.snapshot.params['id'];
    // // this.route.data.subscribe(
    // //   (data: Property) => {
    // //     this.property = data['prp']
    // //   }
    // // );

    // this.housingService.getProperty(this.propID).subscribe(
    //   (data: Property) => {
    //     this.property = data['prp'];
    //     console.log(data);
    //   }, error => {
    //     console.log('http errors');
    //     console.log(Error);
    //   }
    // );


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
    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true,
        previewCloseOnEsc: true,
        previewCloseOnClick: true,
        previewAutoPlay: true,
  
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/image/villa-1.webp',
        medium: 'assets/image/villa-1.webp',
        big: 'assets/image/villa-1.webp'
      },
      {
        small: 'assets/image/villa-2.webp',
        medium: 'assets/image/villa-2.webp',
        big: 'assets/image/villa-2.webp'
      },
      {
        small: 'assets/image/villa-3.webp',
        medium: 'assets/image/villa-3.webp',
        big: 'assets/image/villa-3.webp'
      },{
        small: 'assets/image/villa-4.webp',
        medium: 'assets/image/villa-4.webp',
        big: 'assets/image/villa-4.webp'
      },
      {
        small: 'assets/image/villa-5.webp',
        medium: 'assets/image/villa-5.webp',
        big: 'assets/image/villa-5.webp'
      }
    ];
  }
  OnSelectNext() {

    this.propertyId += 1;
    this.router.navigate(['info-propety/',this.propertyId])
  }


}
