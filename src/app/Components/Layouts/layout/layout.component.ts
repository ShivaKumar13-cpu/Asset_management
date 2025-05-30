import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { SidenavComponent } from "../../sidenav/sidenav.component";
import { BodyComponent } from "../../body/body.component";
import { HeaderComponent } from "../../header/header.component";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidenavComponent, RouterModule, BodyComponent, HeaderComponent],
  templateUrl: './layout.component.html',
  schemas: [],
  styleUrl: './layout.component.scss',

})
export class LayoutComponent {

  isSideNavCollapsed = false;
  screenwidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenwidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  ngOnInit() {
    this.preventBackToLogin();
  }

  preventBackToLogin() {
    setTimeout(() => {
      window.history.replaceState({}, '', window.location.href);
    }, 0);
  }
  selectedOption: any;

  onHeaderSelectionChanged(option: any) {
    this.selectedOption = option;
  }

}
