import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard';
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
import { Error403Component } from './error/error403/error403.component';
import { Error404Component } from './error/error404/error404.component';
import { Error500Component } from './error/error500/error500.component';
import { SetDelayTimeComponent } from './carousel/setdelaytime/setdelaytime.component';
import { HomelayoutComponent } from './shared/homelayout/homelayout.component';
import { LoginlayoutComponent } from './shared/loginlayout/loginlayout.component';
import { ErrorlayoutComponent } from './shared/errorlayout/errorlayout.component';
import { UsersComponent } from './admin/users/users.component';
import { TVIPsComponent } from './admin/tvips/tvips.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginlayoutComponent,
    children: [
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: '',
    component: HomelayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthenticationGuard], data: { dash: 'home' } },
      { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard], data: { dash: 'home' } },
      { path: 'revenue', component: Dashboard1Component, pathMatch: 'full', canActivate: [AuthenticationGuard] },
      { path: 'main', component: Dashboard2Component, pathMatch: 'full', canActivate: [AuthenticationGuard] },
      { path: 'ongoing-project-value', component: Dashboard3Component, pathMatch: 'full', canActivate: [AuthenticationGuard] },
      { path: 'project-preparation', component: Dashboard4Component, pathMatch: 'full', canActivate: [AuthenticationGuard] },
      { path: 'sales-by-month', component: Dashboard5Component, pathMatch: 'full', canActivate: [AuthenticationGuard] },
      { path: 'sales-by-seller', component: Dashboard6Component, pathMatch: 'full', canActivate: [AuthenticationGuard] },
      { path: 'planned-large-project', component: Dashboard7Component, pathMatch: 'full', canActivate: [AuthenticationGuard] },
      { path: 'carousel', component: CarouselComponent, pathMatch: 'full', canActivate: [AuthenticationGuard] },
      { path: 'set-delay-time', component: SetDelayTimeComponent, pathMatch: 'full', canActivate: [AuthenticationGuard], data: { dash: 'carousel' } },
      { path: 'users', component: UsersComponent, canActivate: [AuthenticationGuard], data: { dash: 'admin' } },
      { path: 'tv-ips', component: TVIPsComponent, canActivate: [AuthenticationGuard], data: { dash: 'admin' } }    
    ]
  },
  {
    path: '',
    component: ErrorlayoutComponent,
    children: [
      { path: 'error403', component: Error403Component },   
      { path: '**', component: Error404Component },        
      { path: 'error500', component: Error500Component }
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
