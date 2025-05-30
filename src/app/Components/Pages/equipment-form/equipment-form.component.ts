import { Component, Inject, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { BusinessVerticalService } from '../../../Service/Business-Vertical/business-vertical.service';
import { BusinessVerticalTypeAttributes } from '../../../Model/Class/BusinesVertical';
import { CommonModule } from '@angular/common';
import { AssetVarient } from '../../../Model/Class/AssetVarient';
import { AssetsService } from '../../../Service/AssetsAndEquipments/assets.service';
import { forkJoin } from 'rxjs';
import { Equipment } from '../../../Model/Class/Equipment';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-equipment-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './equipment-form.component.html',
  styleUrl: './equipment-form.component.scss'
})
export class EquipmentFormComponent implements OnInit {

  createdBy: any;
  businessVerticalList: number[] = [];
  bvNameList: BusinessVerticalTypeAttributes[] = [];
  multi = false;
  assetVarientList: AssetVarient[] = []
  assetVarientSrv = inject(AssetsService)
  title = 'Create Equipment'
  bvSrv = inject(BusinessVerticalService)
  firstBV: number = 0;
  dialogData: any
  isEdit = false

  ngOnInit(): void {
    this.getAssetVarientByBusinVert()
    this.dialogData = this.data
    if (this.dialogData.code > 0) {
      this.title = 'Edit department'
      this.isEdit = true
      this.assetVarientSrv.getEquipmentById(this.dialogData.code).subscribe((res: any) => {
        console.log(res);

        let _data = res
        if (_data != null) {
          
            this.equipment.patchValue({
              id : _data.id || 0,
              name: _data.name ?? '',
              assetVariantId: _data.assetVariantId ?? 0,
              createdBy:_data.createdBy?? ''
            })
        }
      })
    }


  }
  constructor(private dialog: MatDialog, private toastr: ToastrService, private ref: MatDialogRef<EquipmentFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  equipment = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    assetVariantId: new FormControl(0),
    createdBy: new FormControl('')
  })


  getAssetVarientByBusinVert() {
    const userString = sessionStorage.getItem('User');
    if (userString) {
      const user = JSON.parse(userString);
      this.createdBy = user.name;
      this.businessVerticalList = user.businessVerticalIds;
      console.log('bv list', this.businessVerticalList);
    }

    if (this.businessVerticalList.length > 1) {
      this.multi = true;

      const bvRequests = this.businessVerticalList.map(id =>
        this.bvSrv.getBusinessVerticalById(id)
      );

      forkJoin(bvRequests).subscribe((bvResults: any[]) => {
        this.bvNameList = bvResults;
        console.log("bvNameList (multi)", this.bvNameList);
        // You can optionally handle multiple BVs here
      });

    } else if (this.businessVerticalList.length === 1) {
      const bvId = this.businessVerticalList[0];
      console.log(bvId);
      console.log('bvId:', bvId, '| type:', typeof bvId);

      this.bvSrv.getBusinessVerticalById(bvId).subscribe((bvRes: any) => {
        this.bvNameList = [bvRes];
        this.firstBV = bvRes.id;

        console.log("bv (single)", this.firstBV);

        // ✅ Now fetch asset variants *after* BV is ready
        this.assetVarientSrv.getAssetVarientsByBvId(this.firstBV).subscribe((res: any) => {
          this.assetVarientList = res;
          console.log('BasedOnBv', this.firstBV);
          console.log('BasedOnBv', this.assetVarientList);
        });
      });
    }
  }

  createEquip() {


    if(this.isEdit){
      console.log('correct');
      
      this.assetVarientSrv.updateEqipment(this.equipment.value).subscribe(response => {
        console.log('Updated');
        this.closePopUp() 
        this.getAssetVarientByBusinVert();
      });


    }else{
      const payload = {
        ...this.equipment.value,
        createdBy: this.createdBy
      }
  
      this.assetVarientSrv.createEqipment(payload).subscribe(response => {
        this.getAssetVarientByBusinVert();
        this.closePopUp() 
      });
    }
   

  }

  onSelectBv(event: any) {
    this.assetVarientSrv.getAssetVarientsByBvId(event.value).subscribe((res: any) => {
      this.assetVarientList = res;
    });
  }

  closePopUp() {
    this.ref.close()
  }

 
}
