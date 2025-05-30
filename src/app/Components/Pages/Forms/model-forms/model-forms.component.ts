import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../../../material.module';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Brand } from '../../../../Model/Class/AssetSpecification';
import { AssetSpecificationService } from '../../../../Service/AssepSpecification/asset-specification.service';

@Component({
  selector: 'app-model-forms',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './model-forms.component.html',
  styleUrl: './model-forms.component.scss'
})
export class ModelFormsComponent implements OnInit {
  title = 'Create Brand'
  createdBy = ''
  isEdit = false
  brandList: Brand[] = []
  assetSpeceSrv = inject(AssetSpecificationService);

  constructor(private ref: MatDialogRef<ModelFormsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchAllBrand();
    const userString = sessionStorage.getItem('User');
    if (userString) {
      const user = JSON.parse(userString);
      this.createdBy = user.name;
      console.log('CreatedBy', this.createdBy);
    }
    const _data = this.data
    if (_data.code > 0) {
      this.isEdit = true
      this.assetSpeceSrv.getModelById(_data.code).subscribe((res: any) => {
        const _dataModel = res
        console.log(res);

        if (_dataModel != null) {
          this.model.patchValue({
            id: _dataModel.id || 0,
            modelName: _dataModel.modelName ?? '',
            modelCode: _dataModel.modelCode ?? '',
            description: _dataModel.description ?? '',
            brandId: _dataModel.brandId ?? 0
          })
        }
      })

    }
    this.model.patchValue({
      createdBy: this.createdBy
    });
  }


  model = new FormGroup({
    id: new FormControl(0),
    modelName: new FormControl(''),
    modelCode: new FormControl(''),
    description: new FormControl(''),
    brandId: new FormControl(0),
    createdBy: new FormControl('')
  })

  closepopup() {

  }
  fetchAllBrand() {
    this.assetSpeceSrv.getAllBrand().subscribe((res: any) => {
      this.brandList = res;
      console.log(res);
    })
  }
  createModel() {
    if (this.isEdit) {
      this.assetSpeceSrv.editModel(this.model.value).subscribe((res: any) => {
        console.log(res);
      })
    } else {
      this.assetSpeceSrv.createModel(this.model.value).subscribe((res: any) => {
        console.log(res);
      })
    }

  }




}
