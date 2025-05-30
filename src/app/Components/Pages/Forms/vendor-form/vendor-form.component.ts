import { Component, inject, OnInit } from '@angular/core';
import { VendorService } from '../../../../Service/Vendor/vendor.service';

@Component({
  selector: 'app-vendor-form',
  standalone: true,
  imports: [],
  templateUrl: './vendor-form.component.html',
  styleUrl: './vendor-form.component.scss'
})
export class VendorFormComponent implements OnInit {
  ngOnInit(): void {
   this.getAllVendorType();
  }
  getAllVendorType() {
    this.vendorSrv.getAllVendor().subscribe(item=>{
      this._vendorTypeList = item;
    })
  }

  vendorSrv = inject(VendorService)

  _vendorTypeList: any[] = []


}
