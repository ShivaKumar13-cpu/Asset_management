import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { AssetsService } from '../../../Service/AssetsAndEquipments/assets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss'
})
export class AssetsComponent implements OnInit {


  assetSrv = inject(AssetsService)
  assetList: any[] = []
  collapse = false
  router = inject(Router)

  ngOnInit(): void {
    if (this.assetList && Array.isArray(this.assetList)) {
      this.assetList.forEach(asset => {
        asset.isCollapsed = false;
      });
    }
    this.getAllAssets();
  }
  toggleCollapse(asset: any) {
    console.log("enters the toggle");
    console.log(!asset.isCollapsed);
    asset.isCollapsed = !asset.isCollapsed;
  }

  getAllAssets() {

    this.assetSrv.getAllAssets().subscribe(item => {
      this.assetList = item.map(asset => ({ ...asset, isCollapsed: false }));
      console.log('AssetList are', this.assetList);

    })

  }

  createAsset() {
    this.router.navigateByUrl('asset/Form')
  }



}
