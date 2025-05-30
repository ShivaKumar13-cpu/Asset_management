import { MatIconModule } from '@angular/material/icon';
import { LoginAttribute } from './../../Model/Class/loginAttribute';
import { UserService } from './../../Service/User-service/user.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Service/login-service/login.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../material.module';
import { LayoutService } from '../../Service/Layout-service/layout.service';
import data, { IMenuItem } from '../../Components/Constants/menu';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  menuItems: IMenuItem[] = data;
  router = inject(Router)
  UserService = inject(UserService)
  loginService = inject(LoginService)
  layoutService = inject(LayoutService)
  loginObj: LoginAttribute = new LoginAttribute();
  
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private toastr: ToastrService) {

  }

  onLoginUser() {
    this.loginObj.username = this.loginForm.value.username;
    this.loginObj.password = this.loginForm.value.password;
    // this.router.navigateByUrl('dashboard') // take off this when api are running

    this.loginService.onLogin(this.loginObj).subscribe((res) => {
      console.log(res);

      sessionStorage.setItem('token', res.token)
      console.log(sessionStorage.getItem('token'));

      
      
      this.getUserByToken();
    
      
    }, (Error) => {
      this.toastr.error("Credential Doesn't match ", 'Please try again')
    })
  }

  getUserByToken() {
    this.UserService.getUserByToken().subscribe(res=> {
      console.log('API response from token:', res);
      sessionStorage.setItem('User', JSON.stringify(res));
      this.toastr.success('Login Successful', 'Success')
      this.getAllAccessPolicyByUserId(res.roleIds[0])
      this.router.navigateByUrl('dashboard')
    },error=>{
      this.toastr.warning('Dont have access for userid', 'Failed')
    })
    
  }

  ngOnInit() {
    this.clearSession();
    this.preventNavigation();
  }

  clearSession() {
    localStorage.removeItem('token'); // Remove the authentication token
    sessionStorage.clear(); // Clear session storage (if used)
  }

  preventNavigation() {
    history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      history.pushState(null, '', window.location.href);
    };
  }

  getAllAccessPolicyByUserId(userId: string | number): void {
  this.layoutService.getAllMenuAccessPolicyBasedOnRole(userId).subscribe((res: any[]) => {
    const accessMap = new Map<string, Set<string>>();

    res.forEach(menu => {
      const menuLabel = menu.label?.trim?.() || '';
      const subLabels = menu.subMenus?.map((sub: any) => sub.subMenuLabel?.trim?.()) || [];
      accessMap.set(menuLabel, new Set(subLabels));
    });

    const filteredMenu: IMenuItem[] = data
      .map(menu => {
        const menuLabel = menu.label.trim();
        const allowedSubs = accessMap.get(menuLabel);

        if (!allowedSubs) return null; // Skip if no access

        const newMenu: IMenuItem = { ...menu };

        // Filter submenus based on allowedSubs
        newMenu.subs = (menu.subs || [])
          .filter(sub => allowedSubs.has(sub.label.trim()))
          .map(sub => {
            const filteredSub: IMenuItem = { ...sub };

            if (sub.subs && sub.subs.length > 0) {
              filteredSub.subs = sub.subs.filter(nested => allowedSubs.has(nested.label.trim()));
            }

            return filteredSub;
          });

        return newMenu;
      })
      .filter((menu): menu is IMenuItem => menu !== null);

    this.layoutService._filteredMenu.set(filteredMenu)
    console.log('Filtered Menu Items:', this.menuItems);
  });
}

}


