import { empty } from 'rxjs';
import { BusinessDivisionTypeAttributes, BusinessVerticalTypeAttributes } from './../../../Model/Class/BusinesVertical';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { BusinessVerticalService } from '../../../Service/Business-Vertical/business-vertical.service';
import { MatDialog } from '@angular/material/dialog';
import { BusinessVerticalFormComponent } from '../business-vertical-form/business-vertical-form.component';
import Swal from 'sweetalert2'
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../Service/sharedService/shared.service';
import { BusinessDivisionComponent } from '../business-division/business-division.component';
import { AddDepartmenytFormComponent } from '../Forms/add-departmenyt-form/add-departmenyt-form.component';


@Component({
  selector: 'app-business-vertical',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './business-vertical.component.html',
  styleUrl: './business-vertical.component.scss'
})
export class BusinessVerticalComponent implements OnInit, AfterViewInit {

  userLevelType = '';
  selectedValue = true;
  create = true;

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('verticalPaginator') verticalPaginator!: MatPaginator;
  @ViewChild('divisionPaginator') divisionPaginator!: MatPaginator;


  businessService = inject(BusinessVerticalService)

  businessVertical: BusinessVerticalTypeAttributes[] = [];
  businessDivision: any;

  dataVerticalSource = new MatTableDataSource<BusinessVerticalTypeAttributes>([]);
  dataDivisionSource = new MatTableDataSource<BusinessDivisionTypeAttributes>([]);

  displayedDivisionColumns: string[] = ['code', 'name', 'description', 'Action'];
  displayedVerticalColumns: string[] = ['verticalCode', 'BusinessVerticalTypeName', 'Location', 'Action'];


  constructor(private readonly dialog: MatDialog, private divisionService: SharedService) { }

  ngOnInit(): void {
    this.getAllBusinessVertical();
    this.getAllBusinessDivision();



    const userStr = sessionStorage.getItem('User');

    if (userStr) {
      const user = JSON.parse(userStr);

      if (user.userLevelType === "BUSINESS_VERTICAL") {
        // Your logic here
        this.userLevelType = user.userLevelType
        console.log(this.userLevelType);
      } else {
        this.userLevelType = user.userLevelType
        console.log(this.userLevelType);
        const current = this.divisionService.getCurrentDivision();
        console.log(current.value);
      }
    }

  }
  ngAfterViewInit(): void {

    this.dataVerticalSource.paginator = this.verticalPaginator;
    this.dataDivisionSource.paginator = this.divisionPaginator;

  }

  onSelectChangeOfBusiness(event: any) {
    console.log('evnet', event.value);
  }


  getAllBusinessVertical() {
    this.businessService.getAllBusinessVertical().subscribe((res: any) => {
      this.businessVertical = res;
      this.dataVerticalSource = new MatTableDataSource(this.businessVertical);
      setTimeout(() => {
        this.dataVerticalSource.paginator = this.verticalPaginator;
      });
    })
  }

  getAllBusinessVerticalWhenCreated() {
    this.businessService.getAllBusinessVerticalWhenCreated().subscribe((res: any) => {
      this.businessVertical = res;
      console.log('Business vertical' + JSON.stringify(this.businessVertical));
      this.dataVerticalSource = new MatTableDataSource(this.businessVertical);
      setTimeout(() => {
        this.dataVerticalSource.paginator = this.verticalPaginator;
      });
    })
  }

  addBusinessVertical() {
    this.openPopUp(0);
  }
  addBusinessdivision() {
    this.popUpDiv(0);
  }

  onDeleteBd(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        this.businessService.onDeleteBusinessDivision(id).subscribe((res: any) => {
          this.getAllBusinessDivision();
        })
      }
    });
  }

  onDelete(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        this.businessService.onDeleteBusinessVertical(id).subscribe(item => {
          console.log('entered');

          this.getAllBusinessVertical();
        })
      }
    });
  }

  onEdit(id: number) {
    this.openPopUp(id)
  }

  onEditBd(id: number) {
    this.popUpDiv(id)
  }


  openPopUp(id: number) {
    this.dialog.open(BusinessVerticalFormComponent, {
      width: '60%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    }).afterClosed().subscribe(o => {
      console.log("Dialog closed, refreshing data...")
      this.getAllBusinessVerticalWhenCreated();
    })
  }

  popUpDiv(id: number) {
    this.dialog.open(BusinessDivisionComponent, {
      width: '50%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        'code': id
      }
    }).afterClosed().subscribe(o => {
      console.log("Dialog closed, refreshing data...")
      this.getAllBusinessVerticalWhenCreated();
    })
  }

  activeTab: string = 'Brand';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }


  // business Division

  getAllBusinessDivision() {
    this.businessService.getAllBusinessDivision().subscribe((res: any) => {
      this.businessDivision = res[0];
      if (this.businessDivision) {
        this.create = false;
      }
    })

  }

  onAddDept(id: number) {
    this.dialog.open(AddDepartmenytFormComponent, {
      width: '50%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        'code': id
      }
    }).afterClosed().subscribe(o => {
      console.log("Dialog closed, refreshing data...")
      this.getAllBusinessVerticalWhenCreated();
    })
  }
}
