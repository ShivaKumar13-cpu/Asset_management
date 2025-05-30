import { FormGroup, ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { MaterialModule } from './../../../../material.module';
import { ChangeDetectionStrategy, Component, inject, Inject, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AssetSpecificationService } from '../../../../Service/AssepSpecification/asset-specification.service';
import { CommonModule } from '@angular/common';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-warrenty-form',
  standalone: true,
  imports: [MaterialModule, MatFormFieldModule, MatDatepickerModule, FormsModule, CommonModule, ReactiveFormsModule, MatNativeDateModule],
  providers: [provideNativeDateAdapter()],

  templateUrl: './warrenty-form.component.html',
  styleUrl: './warrenty-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarrentyFormComponent implements OnInit {

  constructor(private ref: MatDialogRef<WarrentyFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }


  createdBy = ''
  isEdit = false
  assetSpeceSrv = inject(AssetSpecificationService);
  ngOnInit(): void {
    const userString = sessionStorage.getItem('User');
    if (userString) {
      const user = JSON.parse(userString);
      this.createdBy = user.name;
      console.log('CreatedBy', this.createdBy);
    }
  }


  title = 'Create Warranty'
  warranty = new FormGroup({
    id: new FormControl(0),
    warrantyType: new FormControl(''),
    durationInMonths: new FormControl(''),
    coverageDetails: new FormControl(''),
    warrantyStartDate: new FormControl(''),
    warrantyEndDate: new FormControl(''),
    active: new FormControl(true),
    createdBy: new FormControl(''),
    warrantyCode: new FormControl('')
  })

  createWarranty() {

    this.warranty.patchValue({
      createdBy: this.createdBy
    })

    this.assetSpeceSrv.createWarrenty(this.warranty.value).subscribe((res:any)=>{
      console.log(res);
      
    })

  }
  closepopup() {

  }

}
