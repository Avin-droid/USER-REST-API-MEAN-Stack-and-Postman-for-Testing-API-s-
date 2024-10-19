import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,CanActivateFn,CanActivate,Router,RouterStateSnapshot} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class authenticateGuard implements CanActivate {
  helper=new JwtHelperService()
  constructor(private routerobj:Router){}
  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean
  {
    let token:any
    token=localStorage.getItem('token')
    const isValid=this.helper.isTokenExpired(token)
    console.log('Current Status of token:'+isValid)
    if(!isValid)
    {
      return true
    }
    else
    {
      alert('Session Expired Please Login Again....')
      this.routerobj.navigate(['Login'])
      return false
    }

  }
};
