import { Component, inject, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material.module';
import { CommonModule, formatDate } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DepartmentsService } from '../../../../Service/Departments/departments.service';
import { BusinessVerticalService } from '../../../../Service/Business-Vertical/business-vertical.service';

@Component({
  selector: 'app-add-departmenyt-form',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-departmenyt-form.component.html',
  styleUrl: './add-departmenyt-form.component.scss'
})
export class AddDepartmenytFormComponent implements OnInit {


  verticalId: any;
  deptList: any[] = [];

  constructor(private ref: MatDialogRef<AddDepartmenytFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }

  isEdit = false;
  title = 'Create Brand';
  departmentSrv = inject(DepartmentsService)
  businessService = inject(BusinessVerticalService);
  createdBy = '';

  businessVertical!: FormGroup;

  ngOnInit(): void {

    this.businessVertical = new FormGroup({
      departmentList: new FormControl([], [Validators.required])
    });

    const _data = this.data
    if (_data.code > 0) {
      this.title = 'Add Departments';
      console.log(_data.code);


      this.businessService.getBusinessVerticalById(_data.code).subscribe(item => {
        this.getAllDepartment(item.businessDivisionId);

        if (item) {
          this.verticalId = item.id;
          this.businessVertical.patchValue({
            departmentList: item.departmentIds ?? [] // This works because deptList is already loaded
          });
        }
      });
    }
  }

  getAllDepartment(event: any) {
    console.log('changed', event);
    // this.departmentSrv.getDepartmentsByDivisionId(event).subscribe(res => {
    //   this.deptList = res;
    // })
    this.departmentSrv.getAllDept().subscribe(res => {
       this.deptList = res;
     })

  }
  addDeptToBusinessVertical() {
    console.log('enters the save');

    const formatData = {
      verticalId: this.verticalId,
      departmentList: this.businessVertical.value.departmentList
    };

    this.businessService.updateAddDepartment(formatData).subscribe(item => {
      this.toastr.success('successsfully added departments', 'Added')
    })
  }
  closepopup() {
    throw new Error('Method not implemented.');
  }

}
