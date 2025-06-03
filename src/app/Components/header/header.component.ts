import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { BusinessVerticalService } from '../../Service/Business-Vertical/business-vertical.service';
import { BusinessDivisionTypeAttributes } from '../../Model/Class/BusinesVertical';
import { SharedService } from '../../Service/sharedService/shared.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  userData: any;
  businessSrv = inject(BusinessVerticalService);
  businessDivision: any;
  businessDivId = 0;
  businessVerByDivisionIdList: BusinessDivisionTypeAttributes[] = []
  selectedOption: any
  selectedOptionId: any;
  userLevelType = ''
  selectedValue = true
  userName = ''
  roleIds = 0

  constructor(private divisionService: SharedService) { }

  ngOnInit(): void {
    const userStr = sessionStorage.getItem('User');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.userName = user.name

      if (user.userLevelType === "BUSINESS_VERTICAL") {
        // Your logic here
        this.userLevelType = user.userLevelType

      } else {
        this.loadUserDataAndHeaderValues();
      }
    }


  }

  loadUserDataAndHeaderValues() {
    const user = sessionStorage.getItem('User');
    if (user) {
      const userData = JSON.parse(user);
      this.userData = userData;
      this.userLevelType = userData.userLevelType;
      this.roleIds = userData.roleIds
      this.businessDivId = userData.businessDivisionId;

      this.headerValue(this.businessDivId); // Safe to call here
    } else {
      console.warn('User not found in sessionStorage.');
    }
  }



  onSelectionChange(event: MatSelectChange) {
    this.divisionService.setDivision(event.value);
    console.log('log ',event.value);
    

  }



  // onSelectionChange(event: any): void {
  //   const selected = event.value;
  //   this.divisionService.setDivision(selected);
  //   this.selectionChanged.emit(event.value);
  // }
  @Output() selectionChanged = new EventEmitter<any>();



  @Input() collapsed = false;
  @Input() screenwidth = 0;

  getHeadClass(): string {
    let styleClass = ''
    if (this.collapsed && this.screenwidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen'
    }
    return styleClass;
  }




  fullScreenMode() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log('Error while attempting full screen');
      });
    } else {
      document.exitFullscreen();
    }
  }

  headerValue(id: number) {
    this.businessSrv.getAllBusinessDivision().subscribe((res: any) => {
      this.businessDivision = res[0];
      const defaultSelection = {
        type: 'division',
        data: this.businessDivision
      };


      this.selectedOption = defaultSelection;
      this.divisionService.setDivision(defaultSelection);
      this.selectedOptionId = this.businessDivision.id;
      this.businessSrv.getAllBusinessVerticalByBDId(this.selectedOptionId).subscribe((res: any) => {
        this.businessVerByDivisionIdList = res;
      })
    })

  }

  compareOptions = (a: any, b: any) => {
    return a && b && a.type === b.type && a.data?.id === b.data?.id;
  };

}
