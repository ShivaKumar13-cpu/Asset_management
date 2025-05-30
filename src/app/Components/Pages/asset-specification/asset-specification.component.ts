import { WarrentyFormComponent } from './../Forms/warrenty-form/warrenty-form.component';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AssetSpecificationService } from '../../../Service/AssepSpecification/asset-specification.service';
import { Brand, CustomFields, Model, Vendor, Warrenty } from '../../../Model/Class/AssetSpecification';
import { MatDialog } from '@angular/material/dialog';
import { BrandFormsComponent } from '../Forms/brand-forms/brand-forms.component';
import { ModelFormsComponent } from '../Forms/model-forms/model-forms.component';
import { VendorTypeFormsComponent } from '../Forms/vendor-type-forms/vendor-type-forms.component';

@Component({
  selector: 'app-asset-specification',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './asset-specification.component.html',
  styleUrls: ['./asset-specification.component.scss']
})
export class AssetSpecificationComponent implements AfterViewInit, OnInit {
  createCustomField() {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.getAllBrand();
    this.getAllModel();
    this.getAllVendors();
    this.getAllWarrenty();
    this.getCustomField();
  }

  activeTab: string = 'Brand';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  constructor(private dialog: MatDialog) { }


  @ViewChild('brandPaginator') brandPaginator!: MatPaginator;
  @ViewChild('modelPaginator') modelPaginator!: MatPaginator;
  @ViewChild('vendorPaginator') vendorPaginator!: MatPaginator;
  @ViewChild('WarrentyPaginator') warrentyPaginator!: MatPaginator;
  @ViewChild('customField') customField!: MatPaginator;

  brandList: Brand[] = []
  assetSpeceSrv = inject(AssetSpecificationService);

  dataBrandSource = new MatTableDataSource<Brand>([]);
  dataModelSource = new MatTableDataSource<Model>([]);
  dataVendorsSource = new MatTableDataSource<Vendor>([]);
  dataWarrentySource = new MatTableDataSource<Warrenty>([]);
  dataCustomFieldSource = new MatTableDataSource<CustomFields>([]);

  displayedBrandColumns: string[] = ['name', 'description', 'createdBy', 'Action']
  displayedModelColumns: string[] = ['modelCode', 'modelName', 'brandName', 'description', 'createdBy', 'Action']
  displayedVendorsColumns: string[] = ['name', 'description', 'createdBy', 'Action']
  displayedWarrentyColumns: string[] = ['active', 'warrantyCode', 'warrantyType', 'durationInMonths', 'coverageDetails', 'warrantyStartDate', 'warrantyEndDate', 'createdBy', 'Action']
  displayedCustonFieldColumns: string[] = ['fieldName', 'fieldType', 'FieldValue', 'AssetInstance', 'createdBy', 'Action']



  ngAfterViewInit() {
    this.dataBrandSource.paginator = this.brandPaginator;
    this.dataModelSource.paginator = this.modelPaginator;
    this.dataVendorsSource.paginator = this.vendorPaginator;
    this.dataWarrentySource.paginator = this.warrentyPaginator;
    this.dataCustomFieldSource.paginator = this.customField;
  }

  getAllBrand() {
    this.assetSpeceSrv.getAllBrand().subscribe((res: any) => {
      this.dataBrandSource.data = res;
      this.brandList = res
      this.dataBrandSource.paginator = this.brandPaginator;
      console.log(res);
    })
  }

  getCustomField() {
    
    this.assetSpeceSrv.getAllCustomField().subscribe((res: any) => {
      this.dataCustomFieldSource.data = res
      this.dataCustomFieldSource.paginator = this.brandPaginator;
      console.log(res);
    })
  }

  getAllModel() {
    this.assetSpeceSrv.getAllModel().subscribe((res: any[]) => {
      this.dataModelSource.data = res.map(model => ({
        ...model,
        brandName: this.brandList.find(b => b.id === model.brandId)?.name || 'Unknown'
      }));
      this.dataModelSource.paginator = this.modelPaginator;
    });
  }
  getAllVendors() {
    this.assetSpeceSrv.getAllVendors().subscribe((res: any) => {
      this.dataVendorsSource.data = res;
      this.dataVendorsSource.paginator = this.vendorPaginator;
    })
  }
  getAllWarrenty() {
    this.assetSpeceSrv.getAllWarrenty().subscribe((res: any) => {
      this.dataWarrentySource.data = res;
      this.dataWarrentySource.paginator = this.warrentyPaginator;
    })
  }

  openPopUpBrand(id: number) {
    this.dialog.open(BrandFormsComponent, {
      width: '50%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        'code': id

      }
    })
  }
  openPopUpModel(id: number) {
    this.dialog.open(ModelFormsComponent, {
      width: '50%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        'code': id

      }
    })
  }
  openPopUpVendor(id: number) {
    this.dialog.open(VendorTypeFormsComponent, {
      width: '50%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        'code': id

      }
    })
  }
  openPopUpWarrenty(id: number) {
    this.dialog.open(WarrentyFormComponent, {
      width: '50%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        'code': id

      }
    })
  }

  createBrand() {
    this.openPopUpBrand(0);
  }
  createModels() {
    this.openPopUpModel(0);
  }
  createVendor() {
    this.openPopUpVendor(0);
  }
  createWarranty() {
    this.openPopUpWarrenty(0);
  }


  onBrandEdit(id: number) {
    this.openPopUpBrand(id)
  }
  onModelEdit(id: number) {
    this.openPopUpModel(id)
  }
  onVendorEdit(id: number) {
    this.openPopUpVendor(id)
  }
  onWarrentyEdit(id: number) {
    this.openPopUpWarrenty(id)
  }


  onBrandDelete(id: number) {

  }
  onModelDelete(id: number) {

  }
  onVendorDelete(id: number) {

  }
  onWarrentyDelete(id: number) {

  }


}
