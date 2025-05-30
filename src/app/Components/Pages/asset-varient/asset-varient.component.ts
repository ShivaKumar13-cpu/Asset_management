import { CommonModule } from '@angular/common';
import { AssetsService } from '../../../Service/AssetsAndEquipments/assets.service';
import { Component, inject, OnInit } from '@angular/core';
import { AssetVarient } from '../../../Model/Class/AssetVarient';
import { MaterialModule } from '../../../material.module';
import { MatDialog} from '@angular/material/dialog';
import { AssetVarientFormComponent } from '../asset-varient-form/asset-varient-form.component';

@Component({
  selector: 'app-asset-varient',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './asset-varient.component.html',
  styleUrl: './asset-varient.component.scss'
})
export class AssetVarientComponent implements OnInit {

  ngOnInit(): void {
    this.getAllAssetVarientBYBv();
  }
  assetSrv = inject(AssetsService)
  assetVarientList: AssetVarient[] = []

  constructor(private dialog: MatDialog){}

  getAllAssetVarientBYBv() {
    const userString = sessionStorage.getItem('User')
    if (userString) {
      const user = JSON.parse(userString);

      if (Array.isArray(user.businessVerticalIds) && user.businessVerticalIds.length > 0) {
        user.businessVerticalIds.forEach((id: number) => {
          this.assetVarientList=[];
          this.assetSrv.getAllAssetVarient(id).subscribe(
            (res: any) => {
              // You can push or combine results if needed
              this.assetVarientList = [...(this.assetVarientList || []), ...res];
              console.log(`Asset variants for vertical ${id}:`, res);
            },
            (error) => {
              console.error(`Error fetching variants for vertical ${id}:`, error);
            }
          );
        });
      }
    }
  }

  createAssetvarient(){
    this.openPopUp(0)
  }

  openPopUp(id: number){
    this.dialog.open(AssetVarientFormComponent, {
      width:'50%',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'500ms',
      data:{
        'code':id
      }
    }).afterClosed().subscribe(o => {
      console.log("Dialog closed, refreshing data...")
      this.getAllAssetVarientBYBv();
    })
  }

  
  editAssetVarient(asset:any){
    console.log(asset.id);
    this.openPopUp(asset.id)
    
    
  }

}
