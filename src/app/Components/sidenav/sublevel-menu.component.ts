import { fadeInOut, IMenuItem } from './../Constants/menu';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';


@Component({
  selector: 'app-sublevel-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, MaterialModule],
  styleUrls: ['./sidenav.component.scss'],
  template: `
    <ul *ngIf="collapsed && data.subs && data.subs.length > 0"
   [@submenu]="expanded
    ? {value: 'visible',
    params: {transitionParams: '400ms cubic-bezier(0.86,0,0.07,1)', height: '*'}}
    : {value: 'hidden',
    params: {transitionParams: '400ms cubic-bezier(0.86,0,0.07,1)', height: '0'}}"
    class="sublevel-nav">
      <li *ngFor="let item of data.subs" class="sublevel-nav-item"  >
        <a (click)="handleClick(item)" class="sublevel-nav-link" 
         *ngIf="item.subs && item.subs.length > 0"
         [ngClass]="getsubActiveClass(item)"  >
         <span class="material-symbols-outlined sublevel-link-icon">{{item.icon}}</span>
            <!-- <i class="sublevel-link-icon" [class]="item.icon" ></i> -->
            <span class="sublevel-link-text" @fadeInOut *ngIf="collapsed"> {{item.label}} </span>
            <i class="menu-collapsed-icon" *ngIf="item.subs && collapsed" [ngClass]="!item.expanded ? 'fa fa-angle-right':'fa fa-angle-down' "></i>
        </a>

        <a class="sublevel-nav-link" 
        [routerLink]="item.to"  
        *ngIf="!item.subs || (item.subs && item.subs.length===0)"
        routerLinkActive="active-sublevel"
        [routerLinkActiveOptions]="{exact: true}"
        >
        <span class="material-symbols-outlined sublevel-link-icon">{{item.icon}}</span>
            <!-- <i class="sublevel-link-icon" [class]="item.icon"></i> -->
            <span class="sublevel-link-text" @fadeInOut *ngIf="collapsed"> {{item.label}} </span>
        </a>

        <div *ngIf="item.subs && item.subs.length > 0">
          <app-sublevel-menu  
          [data]="item"
          [collapsed]="collapsed"
          [multiple]="multiple"
          [expanded]="item.expanded"
          ></app-sublevel-menu>

        </div>
      </li>
    </ul>
    
  `,

  animations: [
    fadeInOut,
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: "*"
      })),
      transition('visible <=> hidden', [style({ overflow: 'hidden' }),
      animate('{{transitionParams}}')
      ]),
      transition('void => *', animate(0))
    ])
  ]
})
export class SublevelMenuComponent implements OnInit {
  @Input() data: IMenuItem = {
    icon: '',
    label: '',
    to: '',
    subs: []
  }

  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;
  userLevelType = ''
  selectedValue = true

  constructor(private router: Router) { }
  ngOnInit(): void {
    const user = sessionStorage.getItem('User')
    if (user != null) {
      const _userData = JSON.parse(user)
      this.userLevelType = _userData.userLevelType

    }
  }




  handleClick(item: any): void {
    if (!this.multiple) {
      if (this.data.subs && this.data.subs.length > 0) {
        for (let modelItem of this.data.subs) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }

      }
    }
    item.expanded = !item.expanded;
  }
  getsubActiveClass(item: IMenuItem): string {
    if (this.router.url.includes(item.to)) {
      return 'active-sublevel';
    }

    if (item.subs) {
      return item.subs.some(sub => this.router.url.includes(sub.to) || this.hasActiveSubmenu(sub)) ? 'active-sublevel' : '';
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
