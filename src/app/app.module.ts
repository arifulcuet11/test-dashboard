import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';
import { AuthenticationInterceptor } from './authentication/authentication.interceptor';
import { UserService } from './service/user.service';
import { ApiService } from './service/api.service';
import { IpService } from './service/ip.service';
import { ChartService } from './service/chart.service';
import { CarouselService } from './service/carousel.service';
import { HeaderService } from './service/header.service';
import { LogoService } from './service/logo.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Dashboard1Component } from './dashboard/dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard/dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboard/dashboard3/dashboard3.component';
import { Dashboard4Component } from './dashboard/dashboard4/dashboard4.component';
import { Dashboard5Component } from './dashboard/dashboard5/dashboard5.component';
import { Dashboard6Component } from './dashboard/dashboard6/dashboard6.component';
import { Dashboard7Component } from './dashboard/dashboard7/dashboard7.component';
import { CarouselComponent } from './carousel/carousel/carousel.component';
import { SetDelayTimeComponent } from './carousel/setdelaytime/setdelaytime.component';
import { HomelayoutComponent } from './shared/homelayout/homelayout.component';
import { LoginlayoutComponent } from './shared/loginlayout/loginlayout.component';
import { ErrorlayoutComponent } from './shared/errorlayout/errorlayout.component';
import { UserComponent } from './admin/user/user.component';
import { UsersComponent } from './admin/users/users.component';
import { UserListComponent } from './admin/userlist/userlist.component';
import { TVIPComponent } from './admin/tvip/tvip.component';
import { TVIPsComponent } from './admin/tvips/tvips.component';
import { TVIPListComponent } from './admin/tviplist/tviplist.component';

@NgModule({
  declarations: [
    AppComponent,  
    LoginComponent,  
    HomeComponent,
    Dashboard1Component,
    Dashboard2Component,
    Dashboard3Component,
    Dashboard4Component,
    Dashboard5Component,
    Dashboard6Component,
    Dashboard7Component,
    CarouselComponent,
    SetDelayTimeComponent,
    HomelayoutComponent,
    LoginlayoutComponent,
    ErrorlayoutComponent,
    UserComponent,
    UsersComponent,
    UserListComponent,
    TVIPComponent,
    TVIPsComponent,
    TVIPListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    ToastrModule.forRoot({
      progressBar: true
    })  
  ],
  providers: [
    UserService,
    ApiService,
    IpService,
    ChartService,
    CarouselService,
    HeaderService,
    LogoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
