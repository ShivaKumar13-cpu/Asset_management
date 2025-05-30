import { Component, Inject, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssetsService } from '../../../Service/AssetsAndEquipments/assets.service';
import { BusinessVerticalTypeAttributes } from '../../../Model/Class/BusinesVertical';
import { BusinessVerticalService } from '../../../Service/Business-Vertical/business-vertical.service';

@Component({
  selector: 'app-asset-varient-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './asset-varient-form.component.html',
  styleUrl: './asset-varient-form.component.scss'
})
export class AssetVarientFormComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private ref: MatDialogRef<AssetVarientFormComponent>) { }
  assetVarientForm!: FormGroup;
  title = 'Create Asset Varient'
  assetSrv = inject(AssetsService)
  bvSrv = inject(BusinessVerticalService)
  businessVerticalList: [] = []
  createdBy: string = ''
  bvNameList: BusinessVerticalTypeAttributes[] = []
  isEdit = false;

  ngOnInit(): void {
    this.getBusinessVerticalById();
    console.log('data', this.data.code);

    if (this.data.code > 0) {
      this.isEdit = true
      const today = new Date();
      this.title = 'Edit AssetVarient'
      this.assetVarientForm = this.fb.group({
        id: [0],
        name: ['', Validators.required],
        description: [''],
        createdDate: [today],
        createdBy: [this.createdBy],
        updatedDate: [today],
        businessVerticalId: [0, Validators.required]
      });
      this.assetSrv.getAssetVarientById(this.data.code).subscribe((res: any) => {
        this.assetVarientForm.patchValue({
          id: res.id,
          name: res.name,
          description: res.description,
          createdDate: res.createdDate,
          createdBy: res.createdBy,
          updatedDate: today,
          businessVerticalId: res.businessVerticalId
        });
        console.log(this.assetVarientForm.value);
      })



    } else {
      const today = new Date();
      this.assetVarientForm = this.fb.group({
        id: [0],
        name: ['', Validators.required],
        description: [''],
        createdDate: [today],
        createdBy: [this.createdBy],
        updatedDate: [today],
        businessVerticalId: [0, Validators.required]
      });
    }

  }
  getBusinessVerticalById() {
    const userString = sessionStorage.getItem('User')
    if (userString) {
      const user = JSON.parse(userString)
      this.createdBy = user.name;
      this.businessVerticalList = user.businessVerticalIds;
      console.log('bv list', this.businessVerticalList);
    }
    for (let index = 0; index < this.businessVerticalList.length; index++) {
      this.bvSrv.getBusinessVerticalById(this.businessVerticalList[index]).subscribe((res: any) => {
        this.bvNameList.push(res)
        console.log("bv", this.bvNameList);

      })

    }
  }

  createAssetVarient() {
    if (this.isEdit) {
      this.assetSrv.updateAssetVarient(this.assetVarientForm.value).subscribe((res: any) => {
        console.log('Updated', res);

      })
    } else {
      this.assetSrv.createAssetVarient(this.assetVarientForm.value).subscribe((res: any) => {
        console.log('created', res);

      })
    }

  }
  closepopup() {
    this.ref.close();

  }


}
