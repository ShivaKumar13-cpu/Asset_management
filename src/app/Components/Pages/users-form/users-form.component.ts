import { ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { BusinessVerticalService } from '../../../Service/Business-Vertical/business-vertical.service';
import { BusinessVerticalTypeAttributes } from '../../../Model/Class/BusinesVertical';
import { CommonModule } from '@angular/common';
import { DepartmentsService } from '../../../Service/Departments/departments.service';
import { Department } from '../../../Model/Class/department';
import { RoleService } from '../../../Service/Role/role.service';
import { role } from '../../../Model/Class/Role';
import { ErrorStateMatcher, MatOptionModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatStepper } from '@angular/material/stepper';
import { MatSelectChange } from '@angular/material/select';
import { UserService } from '../../../Service/User-service/user.service';

interface StepControls {
  [key: number]: string[];
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, MatOptionModule, MatStepperModule, MatStepper],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MatStepper]
})
export class UsersFormComponent implements OnInit {


  userSrv = inject(UserService)
  userLevelType = '';
  businessDivisionId: any;
  businessVerticalId: any;
  divisionUser = false;
  businessServ = inject(BusinessVerticalService)


  ngOnInit(): void {

    const user = sessionStorage.getItem('User');
    if (user) {
      const parseUser = JSON.parse(user);
      this.userLevelType = parseUser.userLevelType;
      this.businessDivisionId = parseUser.businessDivisionId;
      this.businessVerticalId = parseUser.businessVerticalId;
    }
    if (this.userLevelType == 'BUSINESS_DIVISION' || this.userLevelType == 'SUPERADMIN') {
      this.divisionUser = true;
    }
  }

  title = 'Create User'
  bvSrv = inject(BusinessVerticalService)
  deptSrv = inject(DepartmentsService)
  roleSrv = inject(RoleService)
  bvList: [] = []
  bvNameList: BusinessVerticalTypeAttributes[] = []
  deptList: Department[] = []
  deptName: Department[] = []
  roleList: role[] = []
  bussDiv: any;
  @ViewChild(MatStepper) stepper!: MatStepper;
  userForm: FormGroup;
  stepForms: FormGroup[] = [];
  BUSINESS_DIVISION = 'BUSINESS_DIVISION';
  BUSINESS_VERTICAL = 'BUSINESS_VERTICAL';

  constructor(private _formBuilder: FormBuilder) {
    // Initialize main form
    this.userForm = this._formBuilder.group({
      userLevelType: ['', Validators.required],
      businessDivisionId: [0, Validators.required],
      businessVerticalId: [0, Validators.required],
      departmentIds: [[], Validators.required],
      roleIds: [[], Validators.required],
      employeeCode: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      description: ['', Validators.required],
      isActive: [true],
      createdDate: [new Date().toISOString()]
    });


    this.getDivision();
    // Create step forms that sync with main form
    this.createStepForms();
  }

  private createStepForms(): void {
    console.log('enters the create step form');



    // Step 1: Organizational Information
    this.stepForms[0] = this._formBuilder.group({
      userLevelType: this.userForm.get('userLevelType'),
      businessVerticalId: this.userForm.get('businessVerticalId'),
      departmentIds: this.userForm.get('departmentIds'),
      roleIds: this.userForm.get('roleIds'),
      employeeCode: this.userForm.get('employeeCode')
    });

    // Step 2: Personal Information
    this.stepForms[1] = this._formBuilder.group({
      name: this.userForm.get('name'),
      username: this.userForm.get('username'),
      email: this.userForm.get('email'),
      mobileNumber: this.userForm.get('mobileNumber'),
      password: this.userForm.get('password')
    });

    // Step 3: Additional Information
    this.stepForms[2] = this._formBuilder.group({
      description: this.userForm.get('description')
    });
  }

  getFormControl(controlName: string): FormControl {

    return this.userForm.get(controlName) as FormControl;
  }
  getDivision() {
    this.bvSrv.getAllBusinessDivision().subscribe((res: any) => {
      this.bussDiv = res[0];
      console.log(res[0]);

    })
  }


  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();

  }

  matcher = new MyErrorStateMatcher();

  getBusinessVerticalById() {
    const userString = sessionStorage.getItem('User')
    if (userString) {
      const user = JSON.parse(userString)
      this.bvList = user.businessVerticalIds;
      console.log(this.bvList);
    }
    for (let index = 0; index < this.bvList.length; index++) {
      this.bvSrv.getBusinessVerticalById(this.bvList[index]).subscribe((res: any) => {
        this.bvNameList.push(res)
        console.log("bv", this.bvNameList);

      })

    }
  }
  getSelectedBusinessVerticalNames(): string[] {
    const selectedIds = this.getFormControl('businessVerticalIds').value || [];
    return this.bvNameList
      .filter(item => selectedIds.includes(item.id))
      .map(item => item.name);
  }
  getSelectedDepartmentNames(): string[] {
    const selectedIds = this.getFormControl('departmentId').value || [];
    return this.deptName
      .filter(item => selectedIds.includes(item.id))
      .map(item => item.name);
  }

  // saveUser() {
  //   Object.values(this.userForm.controls).forEach(control => control.markAsTouched());
  //   console.log(this.userForm.value);

  //   this.userForm.patchValue({
  //     ...this.stepForms[0].value,
  //     ...this.stepForms[1].value,
  //     ...this.stepForms[2].value
  //   });
  //   this.userSrv.createUser(this.userForm.value).subscribe((res: any) => {

  //     console.log('Created Successfully', res);

  //   })


  // }

  saveUser() {
    // Mark all step forms as touched to trigger validations
    this.stepForms.forEach(formGroup => {
      Object.values(formGroup.controls).forEach(control => control.markAsTouched());
    });

    // Check if any step form is invalid, stop save
    const isInvalid = this.stepForms.some(formGroup => formGroup.invalid);
    if (isInvalid) {
      console.warn('Validation failed. Please fill all required fields.');
      return;
    }

    // Patch the values first to main form
    this.userForm.patchValue({
      ...this.stepForms[0].value,
      ...this.stepForms[1].value,
      ...this.stepForms[2].value
    });

    console.log('Final User Form Value:', this.userForm.value);

    // Call API to save
    this.userSrv.createUser(this.userForm.value).subscribe((res: any) => {
      console.log('Created Successfully', res);
    });
  }


  goToNextStep(stepper: MatStepper, stepIndex: number) {
    const form = this.stepForms[stepIndex];
    if (form.valid) {
      stepper.next();
    } else {
      form.markAllAsTouched();
    }
  }


  selectedBVData: { [key: number]: { disabled?: true, name: string, departments: any[] } } = {};
  selectedDeptData: { [key: number]: { disabled?: true, name: string, role: any[] } } = {};

  onChangeBvGroupDept(event: MatSelectChange): void {
    const selectedBVIds: number = event.value;
    console.log(selectedBVIds);
    this.deptSrv.getDepartmentByBvId(selectedBVIds).subscribe(item => {
      this.deptList = item
      console.log(item);

    })

    this.userForm.patchValue({
      businessVerticalId: selectedBVIds
    })

    console.log('Updated BV Data:', this.selectedBVData);
  }

  // Fetch Departments and Store BV Data
  getDepartmentByBVId(id: number, name: string): void {
    console.log(`Fetching departments for BV ID: ${id} (${name})`);
    this.deptSrv.getDepartmentByBvId(id).subscribe((res: any) => {
      console.log(`Departments for BV ID ${id}:`, res);
      this.selectedBVData[id] = { name, departments: res };
      console.log('Updated BV Data:', this.selectedBVData);
      this.deptName = [...this.deptName, ...res];
      console.log('Dept for role', this.deptName);

    });
  }
  getSelectedBVArray() {
    return Object.values(this.selectedBVData);
  }

  getSelectedDeptArray() {
    return Object.values(this.selectedDeptData);
  }


  removeDepartmentsForBV(id: number): void {
    console.log(`Removing departments related to ID: ${id}`);
  }




  onChangedeptGroupRole(event: MatSelectChange): void {
    const selectedDeptIds: number[] = event.value || [];
    console.log("Selected Department IDs:", selectedDeptIds);

    const previousSelection: number[] = Object.keys(this.selectedDeptData).map(Number);

    // Detect Added & Removed Departments
    const addedDepts = selectedDeptIds.filter(id => !previousSelection.includes(id));
    const removedDepts = previousSelection.filter(id => !selectedDeptIds.includes(id));

    console.log('Added Departments:', addedDepts);
    console.log('Removed Departments:', removedDepts);

    // Fetch roles for newly selected departments
    addedDepts.forEach(deptId => {
      const dept = this.deptList.find(d => d.id === deptId);
      if (dept) {
        this.roleSrv.getRoleByDeptId(deptId).subscribe((roles: any[]) => {
          this.selectedDeptData[deptId] = { name: dept.name, role: roles };
          console.log(`Fetched roles for Dept ID ${deptId}:`, roles);
        });
      }
    });

    // Remove roles for deselected departments
    removedDepts.forEach(deptId => {
      delete this.selectedDeptData[deptId];
      console.log(`Removed Dept ID ${deptId} from selectedDeptData`);
    });
  }


  getRoleById(id: number, name: string) {
    console.log(`Fetching role for dept ID: ${id} (${name})`);
    this.roleSrv.getRoleByDeptId(id).subscribe((res: any) => {
      console.log(`Departments for BV ID ${id}:`, res);
      this.selectedDeptData[id] = { name, role: res };
      console.log('Updated BV Data:', this.selectedDeptData);
    });
  }


  selectedDivisionUser = false;
  onChangeUserType(event: any) {
    console.log(event.value);

    if (event.value == 'BUSINESS_VERTICAL') {
      this.selectedDivisionUser = true
      this.getAllBusinessVertical();
      this.userForm.patchValue({
        businessDivisionId: 0
      })

    } else {
      this.userForm.patchValue({
        businessVerticalId: 0
      });
      this.businessServ.getAllBusinessDivision().subscribe(item => {
        const id = item[0].id
        if (id !== undefined) {
          this.userForm.patchValue({
            businessDivisionId: id
          })
        }
      })

      this.getAllDeptOnBd();
      this.selectedDivisionUser = false
    }


  }

  getAllBusinessVertical() {
    this.businessServ.getAllBusinessVertical().subscribe((item: any) => {
      this.bvNameList = item;
      console.log(item);
    })
  }
  getAllDeptOnBd() {
    this.businessServ.getAllBusinessDivision().subscribe(item => {
      const id = item[0].id
      if (id !== undefined) {
        this.deptSrv.getDepartmentsByDivisionId(id).subscribe(res => {
          this.deptList = res

        })
      }

    })


  }

}
