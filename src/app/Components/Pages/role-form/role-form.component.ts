import { OrgMenu } from './../../../Model/Class/Access';
import { BusinessVerticalTypeAttributes } from './../../../Model/Class/BusinesVertical';

import { Component, Inject, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { DepartmentsService } from '../../../Service/Departments/departments.service';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../../Service/Role/role.service';
import { BusinessVerticalService } from '../../../Service/Business-Vertical/business-vertical.service';
import { MatOptionModule } from '@angular/material/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { AccessPolicyService } from '../../../Service/AccessPolicy/access-policy.service';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, MatOptionModule, MatStepperModule, MatStepper, FormsModule],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.scss'
})
export class RoleFormComponent implements OnInit {




  id: number = 0;
  dialogData: any;
  isEdit = false;
  bvSrv = inject(BusinessVerticalService);
  deptSrv = inject(DepartmentsService);
  roleSrv = inject(RoleService);
  accessSrv = inject(AccessPolicyService);
  bvPerticular: BusinessVerticalTypeAttributes[] = [];
  departmentPerticular: any[] = [];
  roleForm!: FormGroup;
  stepForms: FormGroup[] = [];
  menuList: any[] = [];



  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      name: ['SUPERADMIN_ROLE', Validators.required],
      departmentId: [1],
      userLevelTypeId: [1],
      userLevelType: ['SUPERADMIN'],
      permissions: this.fb.array([]),
      extendedPermissions: this.fb.array([]),
      menus: this.fb.array([]),
      subMenus: this.fb.array([])
    });

    this.loadMenusAndSubMenus();
    this.loadPermissions();
    this.loadExtendedPermissions();
  }

  // Simulated menu+submenu API
  // loadMenusAndSubMenus(): void {
  //   this.accessSrv.getAllMenu().subscribe(item => {
  //     this.menuList = item;

  //     const menuArray = this.roleForm.get('menus') as FormArray;
  //     const subMenuArray = this.roleForm.get('subMenus') as FormArray;

  //     this.menuList.forEach((menu: any) => {
  //       menuArray.push(this.fb.group({
  //         id: [menu.id],
  //         label: [menu.label],
  //         selected: [false]
  //       }));


  //       menu.subMenus.forEach((sub: any) => {
  //         subMenuArray.push(this.fb.group({
  //           id: [sub.id],
  //           subMenuLabel: [sub.subMenuLabel],
  //           menuId: [menu.id],
  //           selected: [false]
  //         }));
  //       });
  //     });
  //   });
  // }
  groupedSubMenus: { [menuLabel: string]: FormGroup[] } = {};

  loadMenusAndSubMenus(): void {
    this.accessSrv.getAllMenu().subscribe((menus: any[]) => {
      this.menuList = menus;

      const menuArray = this.roleForm.get('menus') as FormArray;
      const subMenuArray = this.roleForm.get('subMenus') as FormArray;

      // Clear arrays
      menuArray.clear();
      subMenuArray.clear();
      this.groupedSubMenus = {};

      menus.forEach((menu: any) => {
        // Always add to menu array
        menuArray.push(this.fb.group({
          id: [menu.id],
          label: [menu.label],
          selected: [false]
        }));

        // Skip if no subMenus
        if (!menu.subMenus || menu.subMenus.length === 0) return;

        const groupedForms: FormGroup[] = [];

        menu.subMenus.forEach((sub: any) => {
          const subForm = this.fb.group({
            id: [sub.id],
            subMenuLabel: [sub.subMenuLabel],
            menuId: [menu.id],
            selected: [false]
          });

          subMenuArray.push(subForm);
          groupedForms.push(subForm);
        });

        // Add only if there are actual submenu groups
        if (groupedForms.length > 0) {
          this.groupedSubMenus[menu.label] = groupedForms;
        }
      });
    });
  }
  getSubMenuSelectedControl(subMenuGroup: FormGroup): FormControl {
    return subMenuGroup.get('selected') as FormControl;
  }
  

  getMenuLabels(): string[] {
    return Object.keys(this.groupedSubMenus);
  }

  loadPermissions(): void {
    const permissionData = [
      { id: 451, resourceId: 1, resourceName: 'Asset' },
      { id: 452, resourceId: 2, resourceName: 'User' },
      { id: 453, resourceId: 3, resourceName: 'Role' }
    ];

    const permissionArray = this.roleForm.get('permissions') as FormArray;
    permissionData.forEach(item => {
      permissionArray.push(this.fb.group({
        id: [item.id],
        roleId: [1],
        resourceId: [item.resourceId],
        resourceName: [item.resourceName],
        canCreate: [false],
        canView: [false],
        canEdit: [false],
        canDelete: [false]
      }));
    });
  }

  loadExtendedPermissions(): void {
    const extData = [
      {
        id: 1,
        resourceId: 1,
        resourceName: 'Asset',
        action: 'export',
        description: 'Export asset data to Excel/PDF'
      },
      {
        id: 4,
        resourceId: 2,
        resourceName: 'User',
        action: 'impersonate',
        description: 'Impersonate other users'
      }
    ];

    const extArray = this.roleForm.get('extendedPermissions') as FormArray;
    extData.forEach(item => {
      extArray.push(this.fb.group({
        id: [item.id],
        resourceId: [item.resourceId],
        resourceName: [item.resourceName],
        action: [item.action],
        description: [item.description],
        selected: [false]
      }));
    });
  }

  onSubmit(): void {
    const payload = {
      ...this.roleForm.value,
      menus: this.roleForm.value.menus.filter((m: any) => m.selected),
      subMenus: this.roleForm.value.subMenus.filter((sm: any) => sm.selected),
      extendedPermissions: this.roleForm.value.extendedPermissions.filter((ep: any) => ep.selected)
    };
    console.log('Payload to submit:', payload);
    // send payload to your backend
  }

  get menus() { return this.roleForm.get('menus') as FormArray; }
  get subMenus() { return this.roleForm.get('subMenus') as FormArray; }
  get permissions() { return this.roleForm.get('permissions') as FormArray; }
  get extendedPermissions() { return this.roleForm.get('extendedPermissions') as FormArray; }

}
