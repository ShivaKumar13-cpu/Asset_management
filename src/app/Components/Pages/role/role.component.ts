import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RoleService } from '../../../Service/Role/role.service';
import { role } from '../../../Model/Class/Role';
import { RoleFormComponent } from '../role-form/role-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SharedService } from '../../../Service/sharedService/shared.service';
import { RoleFormCreateComponent } from '../role-form-create/role-form-create.component';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent implements OnInit, AfterViewInit {

  router = inject(Router)

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }
  ngOnInit(): void {
    this.getAllRoles();
  }

  roleList: role[] = []
  roleSrv = inject(RoleService)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<role>;
  displayedColumns: string[] = ['Role', 'userLevelType', 'Action'];

  constructor(private dialog: MatDialog, private toastr: ToastrService, private divisionService: SharedService) { }



  getAllRoles() {
    this.roleSrv.getAllRoles().subscribe((res: any) => {
      this.roleList = res;
      
      this.dataSource = new MatTableDataSource(this.roleList)

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      });

    })
  }

  openModel(id: number) {
    this.dialog.open(RoleFormCreateComponent, {
      width: '50%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        'code': id
      }
    }).afterClosed().subscribe((o) => {
      this.getAllRoles();
    })
  }

  onEdit(id: number) {
    this.openModel(id)
  }



  onDelete(id: number) {
    if (confirm("Are you sure you want to delete")) {
      this.roleSrv.deleteRole(id).subscribe(item => {
        this.toastr.success('Role got deleted successfully', 'Deleted')
        this.getAllRoles();
      }, (Error) => {
        this.toastr.warning('Something went wrong', 'Error')
      })
    }
  }

  createRole() {
    // this.openModel(0);
    this.router.navigateByUrl('role/form')
    console.log('entered');

  }
  createRoleForm() {
    this.popUpForm(0);

  }
  popUpForm(id: number) {
    this.dialog.open(RoleFormCreateComponent, {
      width: "50%",
      enterAnimationDuration: '00ms',
      exitAnimationDuration: '00ms',
      data: {
        'code': id
      }
    })
  }

}
