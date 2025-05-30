import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../../../material.module';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AssetSpecificationService } from '../../../../Service/AssepSpecification/asset-specification.service';
import { Brand } from '../../../../Model/Class/AssetSpecification';

@Component({
  selector: 'app-brand-forms',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './brand-forms.component.html',
  styleUrl: './brand-forms.component.scss'
})
export class BrandFormsComponent implements OnInit {
  isEdit = false;
  title = 'Create Brand';
  assetSpecSrv = inject(AssetSpecificationService)
  createdBy = '';
  brand = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string>(''), // '' is a string
    description: new FormControl<string>(''),
    createdBy: new FormControl<string>('')
  });


  constructor(private ref: MatDialogRef<BrandFormsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }

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
      this.assetSpecSrv.getBrandById(_data.code).subscribe((res: any) => {
        const _dataModel = res
        console.log(res);

        if (_dataModel != null) {
          this.brand.patchValue({
            id: _dataModel.id || 0,
            name: _dataModel.name ?? '',
            description: _dataModel.description ?? 0
          })
        }
      })

    }
    this.brand.patchValue({
      createdBy: this.createdBy
    });

  }



  closepopup() {
    this.ref.close()
  }
  createBrand() {
    if (this.isEdit) {
      this.assetSpecSrv.editBrand(this.brand.value as Brand).subscribe((res) => {
        console.log(res);

      })

    } else {

      this.assetSpecSrv.createBrand(this.brand.value as Brand).subscribe((res) => {
        console.log(res);

      })

    }
  }
}
