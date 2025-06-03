import { empty } from 'rxjs';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BusinessVerticalService } from '../../../Service/Business-Vertical/business-vertical.service';
import { DepartmentsService } from '../../../Service/Departments/departments.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BusinessVerticalFormComponent } from '../business-vertical-form/business-vertical-form.component';

@Component({
  selector: 'app-department-forms',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatSelectModule, MatInputModule],
  templateUrl: './department-forms.component.html',
  styleUrl: './department-forms.component.scss'
})
export class DepartmentFormsComponent implements OnInit {
  id: number = 0;

  constructor(private readonly dialog: MatDialog, private readonly toastr: ToastrService, private readonly ref: MatDialogRef<DepartmentFormsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  dialogData: any;
  isEdit = false;
  businessServ = inject(BusinessVerticalService)
  departmentserv = inject(DepartmentsService)
  title = 'Add Department'
  businessDivisionList: any[] = []
  created: any;
  department!: FormGroup
  divLevelPresent = false


  ngOnInit(): void {

    this.businessServ.getAllBusinessDivision().subscribe((res: any) => {
      this.businessDivisionList = res
      if (this.businessDivisionList.length > 0) {
        this.department = new FormGroup({
          name: new FormControl('', [Validators.required]),
          businessDivisionId: new FormControl(this.businessDivisionList[0].id),
          description: new FormControl('', [Validators.required]),
          createdBy: new FormControl(this.created)
        })
      } else {
        this.department = new FormGroup({
          name: new FormControl('', [Validators.required]),
          description: new FormControl('', [Validators.required]),
          createdBy: new FormControl(this.created)
        })
      }
    })

    const user = sessionStorage.getItem('User');
    if (user) {
      const parseUser = JSON.parse(user);
      this.created = parseUser.name;
    }

    this.dialogData = this.data;
    console.log('dialog code', this.dialogData.code);

    if (this.dialogData.code > 0) {
      this.title = 'Edit department';
      this.isEdit = true;
      this.departmentserv.getDepartmentById(this.dialogData.code).subscribe((res: any) => {
        console.log(res);

        let _data = res;
        if (_data != null) {
          this.id = _data.id
          this.department.patchValue({
            name: _data.name ?? '',
            businessDivisionId: _data.businessDivisionId ?? 0,
            description: _data.description ?? 0
          });
        }
      });
    }
  }







  createdepartment() {

    if (this.isEdit) {
      const payload = {
        id: this.id,
        ...this.department.value
      }
      console.log('payload', payload);

      this.departmentserv.editDepartment(payload).subscribe((res: any) => {
        this.toastr.success('Successfully updated the department', 'Updated')
        this.closepopup();
      })

    } else {
      this.departmentserv.createDepartment(this.department.value).subscribe((res: any) => {
        this.toastr.success('Successfully created the department', 'Success')
        this.closepopup();
      })
    }
  }

  closepopup() {
    this.ref.close()
  }

  // createBusinessVertical() {
  //   this.dialog.open(BusinessVerticalFormComponent, {
  //     width: "50%",
  //     enterAnimationDuration: '00ms',
  //     exitAnimationDuration: '00ms'
  //   }).afterClosed().subscribe(o => {
  //     this.getAllBusinessVertical();
  //   })
  // }

  createWhenBvAdded() {

  }

}
