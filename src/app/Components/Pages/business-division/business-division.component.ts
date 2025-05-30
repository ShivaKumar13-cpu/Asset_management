import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BusinessVerticalService } from '../../../Service/Business-Vertical/business-vertical.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-business-division',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './business-division.component.html',
  styleUrl: './business-division.component.scss'
})
export class BusinessDivisionComponent implements OnInit {

  title: string = 'Create Business Division';
  businessService = inject(BusinessVerticalService);
  dialogData: any;
  isEdit = false;
  id: any;
  userName = ''
  businessDivision!: FormGroup;

  constructor(private ref: MatDialogRef<BusinessDivisionComponent>, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    const user = sessionStorage.getItem('User')
    console.log(user);

    if (user != null) {
      const parseUser = JSON.parse(user); // convert string to object
      this.userName = parseUser.name;     // access 'user' property
    }
    this.businessDivision = new FormGroup({
      name: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      createdBy: new FormControl(this.userName, [Validators.required])

    })

    this.dialogData = this.data;


    if (this.dialogData.code > 0) {
      this.title = 'Edit Business Division';
      this.isEdit = true;
      this.businessService.getBusinessDivisionById(this.dialogData.code).subscribe(item => {
        let _data = item
        
        if (_data != null) {
          this.id = _data.id;
          this.businessDivision.patchValue({
            name: _data.name ?? '',
            code: _data.code ?? '',
            description: _data.description ?? '',
            createdBy: _data.createdBy ?? ''
          })
        }
        
      })
    }

  }



  createBusinessDivision() {
    if (this.businessDivision.valid) {
      const formData = {
        id: this.id,
        ...this.businessDivision.value

      }
      console.log('data',formData);
      
      if (this.isEdit) {
        console.log(this.isEdit);

        this.businessService.onEditBusinessDivision(formData).subscribe((res: any) => {
          this.toastr.success("Business vertical edited successfully", "success")
          this.closepopup();
        })
      } else {
        console.log(this.isEdit);
        console.log(this.businessDivision.value);
        this.businessService.createBusinessDivision(this.businessDivision.value).subscribe((res: any) => {
          console.log(res);

          this.toastr.success("Business division created successfully", "success")
          this.closepopup();
        },
          error => {
            this.toastr.error("Something went wrong Please try again", "Error")
          }
        );
      }

    } else {
      console.log(this.businessDivision.value);

      console.log('Form is invalid');
    }
  }
  closepopup() {
    this.ref.close();
  }
}
