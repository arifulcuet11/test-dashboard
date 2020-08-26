import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  isAdmin: boolean;

  constructor(private router: Router, public userService: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token') != null) {
      var dash_name = next.data;
      if (dash_name.dash == "admin") {
        this.isAdmin = this.userService.isAdmin();
        if (this.isAdmin)
          return true;
        else {
          this.router.navigateByUrl('/error403');
          return false;
        }
      }
      return true;
    }
    else if (localStorage.getItem('tv_token') == null) {     
      var dash_name = next.data;
      if (dash_name.dash == "admin") {
        this.router.navigateByUrl('/error403');
        return false
      }
      else if (dash_name.dash == "home") {
        this.router.navigateByUrl('/error403');
        return false
      }
      else if (dash_name.dash == "carousel") {
        this.router.navigateByUrl('/error403');
        return false
      }
      return true;
    }
  }
}
