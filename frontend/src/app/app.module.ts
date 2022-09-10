import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { Routes,RouterModule } from '@angular/router';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
 import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { HousingService } from './services/housing.service';
import { AddPropertyComponent } from './add-property/add-property.component';
import { DetailPropetyComponent } from './detail-propety/detail-propety.component';
import { UserServiceService } from './services/User-service.service';
import { AlertifyService } from './services/alertify.service';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegiserComponent } from './user/user-regiser/user-regiser.component';
import { AuthService } from './services/auth.service';
import { DetailPropetyResolverService } from './detail-propety/detail-propety-Resolver.service';
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';

const appRoutes: Routes = [

  {
    path: '',
    component: PropertyListComponent
  },
  {
    path: 'info-propety/:id',
    component: DetailPropetyComponent
  },
  {
    path: 'rent-propety',
    component: PropertyListComponent,
    resolve:
    {
      prp:DetailPropetyResolverService
    }
  },
  {
    path: 'add-propety',
    component:AddPropertyComponent
  },
  {
    path: 'user/UserRegiser',
    component:UserRegiserComponent
  },
  {
    path: 'user/User login',
    component:UserLoginComponent
  },
  {
    path: '**',
    component:PropertyListComponent
  }
]


@NgModule({
  declarations: [
    AppComponent,
      NavBarComponent,
      PropertyCardComponent,
      PropertyListComponent,
      AddPropertyComponent,
    DetailPropetyComponent,
    UserRegiserComponent,
    UserLoginComponent,
    FilterPipe,
    SortPipe

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),



  ],
  providers: [
    HousingService,
    UserServiceService,
    AlertifyService,
    AuthService,
    DetailPropetyResolverService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
