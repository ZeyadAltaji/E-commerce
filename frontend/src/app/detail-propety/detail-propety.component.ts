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
  public mainPhotoUrl: string = null;
  property = new Property();

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private housingService: HousingService) { }

  ngOnInit() {
      this.propertyId = +this.route.snapshot.params['id'];
      this.route.data.subscribe(
          (data: Property) => {
              this.property = data['prp'];
              console.log(this.property.image);
          }, error => {
                  console.log('http errors');
                  console.log(Error);
                }
      );

      this.property.age = this.housingService.getPropertyAge(this.property.estPossessionOn);



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

      this.galleryImages = this.getPropertyPhotos();
  }
  getPropertyPhotos(): NgxGalleryImage[] {
    const photoUrls: NgxGalleryImage[] = [];
    for (let image of  this.property.image) {
      if (image.isPrimary) {
        this.mainPhotoUrl = image.imageUrl;
      } else {
        photoUrls.push(
          {
            small: image.imageUrl,
            medium: image.imageUrl,
            big: image.imageUrl
          }
        );
      }
    }
    return photoUrls
  }
  OnSelectNext() {

    this.propertyId += 1;
    this.router.navigate(['info-propety/',this.propertyId])
  }
}
