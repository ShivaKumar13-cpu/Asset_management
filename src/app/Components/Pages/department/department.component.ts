import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Department } from '../../../Model/Class/department';
import { DepartmentsService } from '../../../Service/Departments/departments.service';
import { DepartmentFormsComponent } from '../department-forms/department-forms.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../Service/sharedService/shared.service';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatDialogModule, MatInputModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent implements OnInit, AfterViewInit {

  constructor(private dialog: MatDialog, private toastr: ToastrService, private divisionService: SharedService) { }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  deptService = inject(DepartmentsService);
  dataSource = new MatTableDataSource<Department>([]);
  displayedColumns: string[] = ['DepartmentName', 'description', 'Action']
  departmentList: Department[] = []
  userLevelType = ''

  ngOnInit(): void {
    this.divisionService.selectedDivision$.subscribe(option => {
      console.log('current option', option);

      if (option) {
        this.loadData(option);
      }
    });


    const userStr = sessionStorage.getItem('User');

    if (userStr) {
      const user = JSON.parse(userStr);

      if (user.userLevelType === "BUSINESS_VERTICAL") {
        // Your logic here
        this.userLevelType = user.userLevelType
        console.log(this.userLevelType);
        this.getDeptByVerticalId(user.businessVerticalId)
      } else if (user.userLevelType === "BUSINESS_DIVISION" || user.userLevelType === "SUPERADMIN") {
        this.userLevelType = user.userLevelType
        console.log(this.userLevelType);
        if (user.businessDivisionId == null) {
          this.getAllDepartments();
        } else {
          this.divisionService.selectedDivision$.subscribe((current: any) => {
            console.log('Selected header value in department:', current);
            if (current) {
              this.fetchDepartmentsByDivision(current);
            }
          });
        }
      }
    }



    const current = this.divisionService.getCurrentDivision();
    if (current) {
      this.fetchDepartmentsByDivision(current);
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  getAllDepartments() {
    this.deptService.getAllDept().subscribe((res: Department[]) => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    })
  }
  fetchDepartmentsByDivision(selected: any): void {

    if (selected.type === 'division') {
      this.deptService.getDepartmentsByDivisionId(selected.data.id).subscribe((res: Department[]) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        console.log('entered division with code ', selected.data.id);

      });
    } else if (selected.type === 'vertical') {
      this.deptService.getDepartmentByBvId(selected.data.id).subscribe((res: Department[]) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  getDeptByVerticalId(id: number) {
    console.log('entered vertical by id', id);
    this.deptService.getDepartmentByBvId(id).subscribe((res: Department[]) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
      });
  }



  createDepartment() {
    this.openPopUp(0);
  }



  onDeleteDept(id: number) {
    this.deptService.deleteDepartment(id).subscribe((res: any) => {
      this.toastr.success('Department deleted successfully!', 'Success');
      this.getAllDepartments()
    })
  }
  onEditDept(id: number) {

    this.openPopUp(id)

  }
  openPopUp(id: number) {
    this.dialog.open(DepartmentFormsComponent, {
      width: "50%",
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        'code': id
      }

    }).afterClosed().subscribe(o => {
      console.log("Dialog closed, refreshing data...")
      this.getAllDepartments();
    })
  }

  loadData(option: any) {
    if (option.type === 'division') {
      console.log('loaded division');
      this.deptService.getDepartmentsByDivisionId(option.data.id).subscribe((res: Department[]) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        console.log('entered division with code ', option.data.id);

      });

      // Load division-specific data
    } else if (option.type === 'vertical') {
      // Load vertical-specific data
      console.log('loaded Vertical');
      this.deptService.getDepartmentByBvId(option.data.id).subscribe((res: Department[]) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
      });
    }
  }


}
