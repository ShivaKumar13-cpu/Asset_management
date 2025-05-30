import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VendorService } from '../../../Service/Vendor/vendor.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.scss'
})
export class VendorComponent implements OnInit {


  route = inject(Router)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['vendorName', 'vendorCode', 'vendorEmail', 'phoneNumber', 'contactPerson', 'activeStatus', 'Action']

  vendorSrv = inject(VendorService);

  ngOnInit(): void {
    this.getAllVendors()
  }
  getAllVendors() {
   this.vendorSrv.getAllVendor().subscribe(item=>{
    console.log(item);
    this.dataSource = item
   })
  }
  onDeleteVendor(arg0: any) {
    throw new Error('Method not implemented.');
  }
  onEditVendor(arg0: any) {
    throw new Error('Method not implemented.');
  }
  createVendor() {
    this.route.navigateByUrl('vendor/Form')
  }

  

}
