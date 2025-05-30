import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DepartmentsService } from '../../../Service/Departments/departments.service';
import { RoleService } from '../../../Service/Role/role.service';
import { BusinessVerticalService } from '../../../Service/Business-Vertical/business-vertical.service';
import { BusinessDivisionTypeAttributes } from '../../../Model/Class/BusinesVertical';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-form-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './role-form-create.component.html',
  styleUrl: './role-form-create.component.scss'
})
export class RoleFormCreateComponent {
  id: any;
  businessDivisionId: any;
  businessVerticalId: any;
  divisionUser: boolean = false;
  bvList: BusinessDivisionTypeAttributes[] = [];
  dialogData: any;
  isEdit = false;
  businessServ = inject(BusinessVerticalService)
  roleServ = inject(RoleService)
  departmentserv = inject(DepartmentsService)
  title = 'Add Role'
  businessDivisionList: any[] = []
  userLevelType: any;
  role!: FormGroup;
  selectedBvId = ''
  selectedType = ''

  departmentList: any;
  constructor(private readonly dialog: MatDialog, private readonly toastr: ToastrService, private readonly ref: MatDialogRef<RoleFormCreateComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    const user = sessionStorage.getItem('User');
    if (user) {
      const parseUser = JSON.parse(user);
      this.userLevelType = parseUser.userLevelType;
      this.businessDivisionId = parseUser.businessDivisionId;
      this.businessVerticalId = parseUser.businessVerticalId;
    }

    if (this.userLevelType == 'BUSINESS_DIVISION' || this.userLevelType == 'SUPERADMIN') {
      this.divisionUser = true
      if (this.userLevelType == 'SUPERADMIN') {
        this.getAllBusinessVertical();

      } else {
        this.getAllVerticalOnDivision(this.businessDivisionId);
      }

      this.role = new FormGroup({
        name: new FormControl('', [Validators.required]),
        departmentId: new FormControl(0),
        userLevelTypeId: new FormControl(this.businessDivisionId, [Validators.required]),
        userLevelType: new FormControl('', [Validators.required])
      })


    } else {
      this.getAllDepartmentOnBV(this.businessVerticalId);
      this.role = new FormGroup({
        name: new FormControl('', [Validators.required]),
        departmentId: new FormControl(0),
        userLevelTypeId: new FormControl(this.businessVerticalId, [Validators.required]),
        userLevelType: new FormControl(this.userLevelType)
      })
    }

    this.dialogData = this.data;

    if (this.dialogData.code > 0) {
      this.title = 'Edit Role';
      this.isEdit = true;
      this.roleServ.getRoleById(this.dialogData.code).subscribe((res: any) => {
        console.log(res);

        let _data = res;
        if (_data != null) {
          this.id = _data.id
          this.role.patchValue({
            name: _data.name ?? '',
            departmentId: _data.departmentId ?? 0,
            userLevelType: _data.userLevelType ?? ''
          });
        }
      });
    }
  }

  closepopup() {
    this.ref.close();
  }

  getAllDepartmentOnBV(businessVerticalId: any) {
    this.departmentserv.getDepartmentByBvId(businessVerticalId).subscribe(item => {
      this.departmentList = item;
    })
  }
  getAllVerticalOnDivision(businessDivisionId: any) {
    this.businessServ.getAllBusinessVerticalByBDId(businessDivisionId).subscribe(item => {
      this.bvList = item;
    })
  }

  onChangeBv(event: any) {
    const selectedBvId = Number((event.target as HTMLSelectElement).value)
    console.log(selectedBvId)
    if (selectedBvId) {
      this.departmentserv.getDepartmentByBvId(selectedBvId).subscribe(item => {
        this.departmentList = item;
      })
      this.role.patchValue({
        userLevelTypeId: selectedBvId
      })
    } else {
      this.departmentList = [];
    }

  }

  onUserLevel(event: any) {
    this.selectedType = (event.target as HTMLSelectElement).value;
    if (this.selectedType == 'BUSINESS_DIVISION') {
      this.businessServ.getAllBusinessDivision().subscribe(item => {
        console.log(item[0].id);
        this.role.patchValue({
          userLevelTypeId: item[0].id
        })
        if (item[0].id) {
          this.departmentserv.getDepartmentsByDivisionId(item[0].id).subscribe(item => {
            this.departmentList = item
          })
        }

      })



    }

  }

  getAllBusinessVertical() {
    this.businessServ.getAllBusinessVertical().subscribe((item: any) => {
      this.bvList = item;
      console.log(item);
    })
  }

  saveRole() {
    console.log(this.role.value);
    this.roleServ.createRole(this.role.value).subscribe(item => {
      this.toastr.success('successfully created', 'Success')

    })
  }


}
