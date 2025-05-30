import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BusinessVerticalService } from '../../../Service/Business-Vertical/business-vertical.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BusinessDivisionTypeAttributes } from '../../../Model/Class/BusinesVertical';
import { DepartmentsService } from '../../../Service/Departments/departments.service';
import { CommonModule } from '@angular/common';
import { DepartmentFormsComponent } from '../department-forms/department-forms.component';

@Component({
  selector: 'app-business-vertical-form',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatSelectModule, MatInputModule, CommonModule],
  templateUrl: './business-vertical-form.component.html',
  styleUrl: './business-vertical-form.component.scss'
})
export class BusinessVerticalFormComponent implements OnInit {


  title: string = 'Create Business Vertical';
  businessService = inject(BusinessVerticalService);
  deptSrv = inject(DepartmentsService);
  dialogData: any;
  isEdit = false;
  id = 0;
  businessDivList: BusinessDivisionTypeAttributes[] = []
  userName = ''
  businessVertical!: FormGroup;
  deptList: any[] = [];



  constructor(private readonly dialog: MatDialog, private ref: MatDialogRef<BusinessVerticalFormComponent>, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  // ngOnInit(): void {
  //   this.dialogData = this.data;

  //   this.businessService.getAllBusinessDivision().subscribe(item=>{
  //     this.businessDivList = item;
  //     console.log(this.businessDivList);

  //   })
  //   const user = sessionStorage.getItem('User')
  //   console.log(user);

  //   if (user != null) {
  //     const parseUser = JSON.parse(user); // convert string to object
  //     this.userName = parseUser.name;     // access 'user' property


  //   }

  //   this.businessVertical = new FormGroup({
  //     name: new FormControl('', [Validators.required]),
  //     location: new FormControl('', [Validators.required]),
  //     verticalCode: new FormControl('', [Validators.required]),
  //     businessDivisionId: new FormControl(0, [Validators.required]),
  //     departmentIds: new FormControl([], [Validators.required]),

  //     createdBy: new FormControl(this.userName, [Validators.required])
  //   })



  //   if (this.dialogData.code > 0) {
  //     this.title = 'Edit Business Vertical';
  //     this.isEdit = true;
  //     this.businessService.getBusinessVerticalById(this.dialogData.code).subscribe(item => {
  //       let _data = item
  //       if (_data != null) {
  //         this.id = _data.id;

  //         this.businessVertical.patchValue({
  //           name: _data.name ?? '',
  //           location: _data.location ?? '',
  //           verticalCode: _data.verticalCode ?? '',
  //           businessDivisionId: _data.businessDivisionId ?? 0,
  //           departmentIds: _data.departmentIds ?? []
  //         })
  //       }
  //     })
  //   }

  // }
  ngOnInit(): void {
    this.dialogData = this.data;

    const user = sessionStorage.getItem('User');
    if (user) {
      const parseUser = JSON.parse(user);
      this.userName = parseUser.name;
    }

    // Initialize form
    this.businessVertical = new FormGroup({
      name: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      verticalCode: new FormControl('', [Validators.required]),
      businessDivisionId: new FormControl(0, [Validators.required]),
      departmentIds: new FormControl([], [Validators.required]),
      createdBy: new FormControl(this.userName, [Validators.required])
    });

    // Load divisions
    this.businessService.getAllBusinessDivision().subscribe(item => {
      this.businessDivList = item;
    });

    // Load all departments


    // Now, if editing, fetch data and patch
    if (this.dialogData.code > 0) {
      this.title = 'Edit Business Vertical';
      this.isEdit = true;

      this.businessService.getBusinessVerticalById(this.dialogData.code).subscribe(item => {

        this.getAllDepartment(item.businessDivisionId);

        if (item) {
          this.id = item.id;
          this.businessVertical.patchValue({
            name: item.name ?? '',
            location: item.location ?? '',
            verticalCode: item.verticalCode ?? '',
            businessDivisionId: item.businessDivisionId ?? 0,
            departmentIds: item.departmentIds ?? [] // This works because deptList is already loaded
          });
        }


      });
    }
  }


  createDeptWhenBvAdded(){
    this.dialog.open(DepartmentFormsComponent, {
          width: "50%",
          enterAnimationDuration: '300ms',
          exitAnimationDuration: '300ms',
          data: {
            'code': 0
          }
    
        }).afterClosed().subscribe(o => {
          console.log("Dialog closed, refreshing data...")
          
        })
  }



  createBusinessVertical() {
    if (this.businessVertical.valid) {

      const formData = {
        id: this.id,
        ...this.businessVertical.value
      }

      if (this.isEdit) {
        console.log(formData);

        this.businessService.onEditBusinessVertical(formData).subscribe((res: any) => {
          console.log('result', formData);

          this.toastr.success("Business vertical edited successfully", "success")
          this.closepopup();
        })
      } else {
        console.log('businessVertical.value', this.businessVertical.value);

        this.businessService.createBusinessVertical(this.businessVertical.value).subscribe((res: any) => {
          this.toastr.success("Business vertical created successfully", "success")
          this.closepopup();
        },
          error => {
            this.toastr.error("Something went wrong Please try again", "Error")
          }
        );
      }

    } else {
      console.log('Form is invalid');
    }
  }

  closepopup() {
    this.ref.close()
  }

  getAllDepartment(event: any) {
    console.log('changed', event.value);
    if (this.isEdit) {
      this.deptSrv.getDepartmentsByDivisionId(event).subscribe(res => {
        console.log(res);
        this.deptList = res;
      })

    } else {
      this.deptSrv.getDepartmentsByDivisionId(event.value).subscribe(res => {
        console.log(res);
        this.deptList = res;
      })
    }
  }



}



