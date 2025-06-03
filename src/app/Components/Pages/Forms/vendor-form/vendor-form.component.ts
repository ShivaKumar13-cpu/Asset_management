import { Component, inject, OnInit } from '@angular/core';
import { VendorService } from '../../../../Service/Vendor/vendor.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-vendor-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './vendor-form.component.html',
  styleUrl: './vendor-form.component.scss'
})
export class VendorFormComponent implements OnInit {

  vendorSrv = inject(VendorService)
  _vendorTypeList: any[] = []
  vendorForm!: FormGroup;
  createdBy = '';


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllVendorType();
     const userString = sessionStorage.getItem('User');
    if (userString) {
      const user = JSON.parse(userString);
      this.createdBy = user.name;
      console.log('CreatedBy', this.createdBy);
    }

    this.vendorForm = this.fb.group({
      vendorName: ['', Validators.required],
      vendorCode: ['', Validators.required],
      vendorEmail: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      vendorTypeId: [null, Validators.required],
      description: [''],
      vendorAddress: [''],
      city: [''],
      state: [''],
      country: [''],
      pincode: [''],
      contactPerson: [''],
      contactNumber: [''],
      billingEmail: ['', [Validators.email]],
      billingAddress: [''],
      serviceEmail: ['', [Validators.email]],
      serviceAddress: [''],
      activeStatus: [true],
      createdBy: [this.createdBy]  // Replace with actual user if needed
    });
  }
  getAllVendorType() {
    this.vendorSrv.getAllVendorType().subscribe(item => {
      this._vendorTypeList = item;
      console.log(item);

    })
  }
  onSubmit(): void {
     const vendor = this.vendorForm.value
      console.log(vendor);
    if (this.vendorForm.valid) {
      const vendor = this.vendorForm.value
      
      // send this.vendorForm.value to your API
      this.vendorSrv.createVendor(vendor).subscribe(item=>{
        console.log('Success');
      })
    } else {
      console.log('please fill the form');
      
    }
  }




}
