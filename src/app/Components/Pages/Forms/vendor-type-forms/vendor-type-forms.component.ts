import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../../../material.module';
import { AssetSpecificationService } from '../../../../Service/AssepSpecification/asset-specification.service';

@Component({
  selector: 'app-vendor-type-forms',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, CommonModule],
  templateUrl: './vendor-type-forms.component.html',
  styleUrl: './vendor-type-forms.component.scss'
})
export class VendorTypeFormsComponent implements OnInit {
  constructor(private ref: MatDialogRef<VendorTypeFormsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }
  ngOnInit(): void {
    const userString = sessionStorage.getItem('User');
    if (userString) {
      const user = JSON.parse(userString);
      this.createdBy = user.name;
      console.log('CreatedBy', this.createdBy);
    }
    const _data = this.data
    if (_data.code > 0) {
      this.isEdit = true
      this.assetSpeceSrv.getVendorById(_data.code).subscribe((res: any) => {
        const _dataModel = res
        console.log(res);

        if (_dataModel != null) {
          this.vendor.patchValue({
            id: _dataModel.id || 0,
            name: _dataModel.name ?? '',
            description: _dataModel.description ?? ''
          })
        }
      })

    }
    this.vendor.patchValue({
      createdBy: this.createdBy
    });
  }
  title = 'Create Brand'
  createdBy = ''
  isEdit = false
  assetSpeceSrv = inject(AssetSpecificationService);

  vendor = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    description: new FormControl(''),
    createdBy: new FormControl('')
  })



  createVendor() {
    if (this.isEdit) {
      this.assetSpeceSrv.editVendor(this.vendor.value).subscribe((res: any) => {
        console.log(res);
      })
    } else {
      this.assetSpeceSrv.createVendor(this.vendor.value).subscribe((res: any) => {
        console.log(res);
      })
    }

  }

  closepopup() {

  }
}
