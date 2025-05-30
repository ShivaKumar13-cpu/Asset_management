import { Component, effect, EventEmitter, inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { LayoutService } from '../../Service/Layout-service/layout.service';
import data, { fadeInOut, IMenuItem } from '../Constants/menu';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { SublevelMenuComponent } from "./sublevel-menu.component";
import { MaterialModule } from '../../material.module';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterLink, NgForOf, NgIf, RouterModule, SublevelMenuComponent, MaterialModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  encapsulation: ViewEncapsulation.None,
  animations: [
    fadeInOut,
    trigger('rotation', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' })
          ])
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {

  layoutService = inject(LayoutService)

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  menuItems: IMenuItem[] = data;
  filteredMenuItems: any[] = [];
  loggedUser: any;
  webRoleName: any;
  moduleNames: string[] = [];
  subModuleNames: string[] = [];
  newUniqeArray: any[] = [];
  loggedInUser: any;
  collapsed: boolean = false;
  screenWidth: number = 0;
  multiple: boolean = false;
  isHovered: boolean = false;

  

  constructor(private readonly router: Router) { 
    effect(()=>{
      this.menuItems = this.layoutService._filteredMenu()
    })
  }

  onMouseEnter(): void {
    if (!this.collapsed) {
      this.isHovered = true;
    }
  }
  
  onMouseLeave(): void {
    this.isHovered = false;
  }


  ngOnInit(): void {
    this.screenWidth = window.innerWidth
    this.loggedUser = sessionStorage.getItem('User');


    this.loggedInUser = JSON.parse(this.loggedUser)
   const roleId = this.loggedInUser.roleIds[0]
    
    this.getAllAccessPolicyByUserId(roleId);
   
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  }
  closeSideNav(): void {
    this.collapsed = false
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  }


  selectedMenu: string | null = null;

  toggleMenu(menuLabel: string): void {
    this.selectedMenu = this.selectedMenu === menuLabel ? null : menuLabel;
  }


  setActiveLink(event: Event): void {
    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(link => link.classList.remove('is-active'));
    (event.target as HTMLElement).classList.add('is-active');
  }

 


// getAllAccessPolicyByUserId(userId: string | number): void {
//   this.layoutService.getAllMenuAccessPolicyBasedOnRole(userId).subscribe((res: any[]) => {
//     // Create a Map: menu label -> Set of allowed subMenu labels
//     const accessMap = new Map<string, Set<string>>();

//     res.forEach(menu => {
//       const menuLabel: string = menu.label?.trim?.() || '';
//       const subLabels: string[] = menu.subMenus?.map((sub: any) => sub.subMenuLabel?.trim?.()) || [];
//       accessMap.set(menuLabel, new Set<string>(subLabels));
//     });

//     // Filter static menu data
//     const filteredMenu: IMenuItem[] = data
//       .map(menu => {
//         const allowedSubs = accessMap.get(menu.label.trim());
//         if (!allowedSubs) return null; // Skip menu if no access

//         const newMenu: IMenuItem = { ...menu };

//         if (!menu.subs || menu.subs.length === 0) {
//           newMenu.subs = [];
//         } else {
//           newMenu.subs = menu.subs
//             .filter(sub => allowedSubs.has(sub.label.trim()))
//             .map(sub => {
//               if (!sub.subs) return sub;
//               return {
//                 ...sub,
//                 subs: sub.subs.filter(nested => allowedSubs.has(nested.label.trim()))
//               };
//             });
//         }

//         return newMenu;
//       })
//       .filter((menu): menu is IMenuItem => menu !== null); // Type-safe filter

//     this.menuItems = filteredMenu;
//     console.log('Filtered Menu Items:', this.menuItems);
//   });
// }
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

    this.menuItems = filteredMenu;
    console.log('Filtered Menu Items:', this.menuItems);
  });
}




  handleClick(item: IMenuItem): void {
    if (!this.multiple) {
      for (let modelItem of this.menuItems) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded
  }

  getActiveClass(menu: IMenuItem): string {
    if (this.router.url.includes(menu.to)) {
      return 'active';
    }

    if (menu.subs) {
      return menu.subs.some(sub => this.router.url.includes(sub.to) || this.hasActiveSubmenu(sub)) ? 'active' : '';
    }

    return '';
  }

  hasActiveSubmenu(submenu: IMenuItem): boolean {
    if (this.router.url.includes(submenu.to)) {
      return true;
    }

    if (submenu.subs) {
      return submenu.subs.some(sub => this.hasActiveSubmenu(sub));
    }

    return false;
  }


}

