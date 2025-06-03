import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentsService } from '../../../../Service/Departments/departments.service';
import { AssetSpecificationService } from '../../../../Service/AssepSpecification/asset-specification.service';
import { Brand } from '../../../../Model/Class/AssetSpecification';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-asset-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatCheckbox],
  templateUrl: './asset-form.component.html',
  styleUrl: './asset-form.component.scss'
})
export class AssetFormComponent {



  assetForm!: FormGroup;
  statusOptions = ['ACTIVE', 'INACTIVE', 'RETIRED'];
  _assetInstance: any[] = []
  _businessVerticalList: any[] = [];
  divUser = false;
  bvId: any;
  departmentList: any[] = []
  dept = inject(DepartmentsService)
  assetSpec = inject(AssetSpecificationService)
  assetInstnce: any[] = []
  allBrand: any[] = []
  modelByBrand: any
  createdBy = ''
  IsbulkAsset = false


  constructor(private fb: FormBuilder) { }





  ngOnInit(): void {

    const userStr = sessionStorage.getItem('User');

    if (userStr) {
      const user = JSON.parse(userStr);
      this.createdBy = user.name
      if (user.userLevelType === "BUSINESS_DIVISION") {
        this.divUser = true
      } else {
        this.bvId = user.businessVerticalId
        for (let dept of user.departmentIds) {
          this.dept.getDepartmentById(dept.id).subscribe(item => {
            this.departmentList.push(item)
          })
        }
      }
    }

    this.getAllBrand();

    this.assetForm = this.fb.group({
      name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      assetCode: ['', Validators.required],
      serialNumber: [''],
      description: [''],
      createdBy: [this.createdBy],
      assetInstanceId: [0],
      assetCustomFieldIds: this.fb.array([this.fb.control(0)]),
      brandId: [0],
      modelId: [0],
      businessVerticalId: [0],
      departmentId: [0],
      vendorIds: this.fb.array([this.fb.control(0)]),
      warrantyId: [0],
      bulkAsset: [this.IsbulkAsset],
      status: ['ACTIVE']
    });
  }

  get assetCustomFieldIds(): FormArray {
    return this.assetForm.get('assetCustomFieldIds') as FormArray;
  }

  get vendorIds(): FormArray {
    return this.assetForm.get('vendorIds') as FormArray;
  }

  addCustomFieldId() {
    this.assetCustomFieldIds.push(this.fb.control(0));
  }

  removeCustomFieldId(index: number) {
    this.assetCustomFieldIds.removeAt(index);
  }

  addVendorId() {
    this.vendorIds.push(this.fb.control(0));
  }

  removeVendorId(index: number) {
    this.vendorIds.removeAt(index);
  }
  checkBoxChange(event: any) {
    console.log(event.checked);
    this.IsbulkAsset = event.checked;

  }

  OnChangeBv(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = Number(target.value);
    this.getDepartmentByBvId(selectedValue)
  }
  OnchangeDept(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = Number(target.value);
    this.getAllAssetInstanceBDeptId(selectedValue)
  }
  onBrandChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = Number(target.value);
    this.getAllModelByBrand(selectedValue)
  }


  getAllAssetInstanceBDeptId(id: number) {
    this.dept.getAllAssetInstanceBDeptId(id).subscribe(item => {
      this.assetInstnce = item
    })
  }
  getDepartmentByBvId(id: number) {
    this.dept.getDepartmentByBvId(id).subscribe(item => {
      this.departmentList = item
    })
  }
  getAllBrand() {
    this.assetSpec.getAllBrand().subscribe(item => {
      this.allBrand = item
    })
  }
  getAllModelByBrand(id: number) {
    this.assetSpec.getModelByBrand(id).subscribe(item => {
      this.allBrand = item
    })
  }

  onSubmit() {
    if (this.assetForm.valid) {
      console.log('Asset Submitted:', this.assetForm.value);
      // Call your API here
    } else {
      console.log('Form is invalid');
      this.assetForm.markAllAsTouched();
    }
  }

}
