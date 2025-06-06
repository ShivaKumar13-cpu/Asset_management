import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentsService } from '../../../../Service/Departments/departments.service';
import { AssetsService } from '../../../../Service/AssetsAndEquipments/assets.service';
import { UserService } from '../../../../Service/User-service/user.service';

@Component({
  selector: 'app-inventry-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventry-form.component.html',
  styleUrl: './inventry-form.component.scss'
})
export class InventryFormComponent implements OnInit {


  inventoryForm!: FormGroup;
  statusOptions = ['ACTIVE', 'INACTIVE', 'RETURNED'];
  createdBy: any;
  divUser = false;
  bvId: any;
  dept: any;
  departmentList: any;
  userId: any;
  _businessVertical: any;
  departments: any[] = []
  deptSrv = inject(DepartmentsService)
  assetSrv = inject(AssetsService)
  userSrv = inject(UserService)
  assetList: any[] = []
  _deptList: any;
  _userList: any;

  constructor(private fb: FormBuilder, private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    const userStr = sessionStorage.getItem('User');

    if (userStr) {
      const user = JSON.parse(userStr);
      this.createdBy = user.name
      this.userId = user.id
      this.departments = user.departmentIds
      this.departments.forEach(o => {
        this.deptSrv.getDepartmentById(o).subscribe(item => {
          this.departments.push(item)
        })
      })

      if (user.userLevelType === "BUSINESS_DIVISION") {
        this.divUser = true

        this.inventoryForm = this.fb.group({
          assetId: [0, Validators.required],
          userId: [0, Validators.required],
          assignedBy: [this.userId, Validators.required],
          assignedDate: [new Date().toISOString().substring(0, 10), Validators.required],
          expectedReturnDate: [new Date().toISOString().substring(0, 10)],
          actualReturnDate: [new Date().toISOString().substring(0, 10)],
          description: [''],
          conditionNotes: [''],
          status: ['ACTIVE', Validators.required],
          createdDate: [new Date().toISOString()],
          createdBy: [this.createdBy],  // Set this as needed
          updatedDate: [new Date().toISOString()],
          departmentId: [0],
          businessVerticalId: [0],
          assignedQuantity: [0]
        });

      } else {
        this.bvId = user.businessVerticalId
        this.dept = user.departmentIds[0]

        this.OnBv(this.bvId);

        this.inventoryForm = this.fb.group({
          assetId: [0, Validators.required],
          userId: [0, Validators.required],
          assignedBy: [this.userId, Validators.required],
          assignedDate: [new Date().toISOString().substring(0, 10), Validators.required],
          expectedReturnDate: [new Date().toISOString().substring(0, 10)],
          actualReturnDate: [new Date().toISOString().substring(0, 10)],
          description: [''],
          conditionNotes: [''],
          status: ['ACTIVE', Validators.required],
          createdDate: [new Date().toISOString()],
          createdBy: [this.createdBy],  // Set this as needed
          updatedDate: [new Date().toISOString()],
          departmentId: [this.dept],
          businessVerticalId: [this.bvId],
          assignedQuantity: [0]
        });

      }
    }
  }




  onSubmit(): void {
    if (this.inventoryForm.valid) {
      const inventoryData = this.inventoryForm.value;
      console.log('Saving Inventory:', inventoryData);

      // Call your API here
      // this.http.post('/api/inventory', inventoryData).subscribe(...)
    } else {
      console.log('Form is invalid');
    }
  }

  ngAfterViewInit(): void {
    this.floatLabel('.floatLabel');
  }
  
  floatLabel(selector: string): void {
    const inputs = this.elRef.nativeElement.querySelectorAll(selector);

    inputs.forEach((input: HTMLInputElement | HTMLTextAreaElement) => {
      // Add 'active' class on focus
      this.renderer.listen(input, 'focus', () => {
        const label = input.nextElementSibling;
        if (label) {
          this.renderer.addClass(label, 'active');
        }
      });

      // Remove 'active' class on blur if empty or 'blank'
      this.renderer.listen(input, 'blur', () => {
        if (!input.value || input.value === 'blank') {
          const label = input.nextElementSibling;
          if (label) {
            this.renderer.removeClass(label, 'active');
          }
        }
      });
    });
  }
  OnChangeDept(_event: Event) {
    const selected = Number(_event.target)
    this.assetSrv.getAssetsByDepartmentId(selected).subscribe(item => {
      this.assetList = item
    })
  }
  OnchangeBv(event: Event) {
    const selected = Number(event.target)

    this.deptSrv.getDepartmentById(selected).subscribe(item => {
      this._deptList = item
    })

  }
  OnBv(event: any) {
    const selected = Number(event.target)

    this.deptSrv.getDepartmentById(selected).subscribe(item => {
      this._deptList = item
    })

  }
  OnChangeDeptUser(event: Event) {
    const selected = Number(event.target)
    this.userSrv.getUserByDeptId(selected).subscribe(item => {
      this._userList = item;
    })
  }

}
