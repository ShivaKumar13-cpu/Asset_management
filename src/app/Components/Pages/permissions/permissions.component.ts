import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccessPolicyService } from '../../../Service/AccessPolicy/access-policy.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { RoleService } from '../../../Service/Role/role.service';
import { BusinessVerticalService } from '../../../Service/Business-Vertical/business-vertical.service';
import Swal from 'sweetalert2';
import { ToasterComponent } from "../../toaster/toaster.component";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, CommonModule, ToasterComponent],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss'
})
export class PermissionsComponent implements OnInit {

  @ViewChild(ToasterComponent) toastMessage!: ToasterComponent

  savemenu() {
    throw new Error('Method not implemented.');
  }
  selectedRolePermisionid: any;



  accessService = inject(AccessPolicyService)
  roleSrv = inject(RoleService)
  businessSrv = inject(BusinessVerticalService)
  businessVerticalId: any;
  roleList: any;
  isLevelMulti = false;
  businessVerticalList: any
  resourceList: any
  updateRolePermision: FormGroup;
  accessArray!: FormArray


  constructor(private builder: FormBuilder) {
    this.updateRolePermision = this.builder.group({
      roleId: this.builder.control(0, Validators.required),
      permissions: this.builder.array([])
    })
  }
  createPermisson(event: any) {
    console.log("work", event)
  }

  generatePermissionRows(Input: any, roleId: number) {
    return this.builder.group({
      id: this.builder.control(0),
      roleId: this.builder.control(roleId),
      resourceId: this.builder.control(Input.id),
      resourceName: this.builder.control(Input.name),
      canCreate: this.builder.control(false),
      canView: this.builder.control(false),
      canEdit: this.builder.control(false),
      canDelete: this.builder.control(false)
    })
  }

  AddNewRows(input: any, roleId: number) {
    this.accessArray.push(this.generatePermissionRows(input, roleId))
  }

  get getRows() {
    return this.updateRolePermision.get('permissions') as FormArray
  }


  userLevelType = ''

  ngOnInit(): void {
    const userStr = sessionStorage.getItem('User');
    this.getAllResourceinitial(0);
    if (userStr) {
      const user = JSON.parse(userStr);

      if (user.userLevelType === "BUSINESS_VERTICAL") {
        // Your logic here
        this.userLevelType = user.userLevelType
        this.businessVerticalId = user.businessVerticalId
        this.roleSrv.getAllRolesByBvId(this.businessVerticalId).subscribe(item => {
          this.roleList = item;
        })
      } else if (user.userLevelType === "BUSINESS_DIVISION" || user.userLevelType === "SUPERADMIN") {
        this.isLevelMulti = true;
        console.log(this.isLevelMulti);


        this.businessSrv.getAllBusinessVertical().subscribe(item => {
          this.businessVerticalList = item;
        })

      }
    }
    this.loadMenus();

  }



  getAllResource(userRoleId: number) {

    this.accessArray = this.updateRolePermision.get('permissions') as FormArray;
    this.accessArray.clear();

    this.accessService.getAllResource().subscribe(item => {
      this.resourceList = item;
      if (this.resourceList.length > 0) {

        this.resourceList.map((o: any) => {
          this.AddNewRows(o, userRoleId)
        })

        this.getExistingPermissions(userRoleId);
      }
    })
  }
  getAllResourceinitial(userRoleId: number) {

    this.accessArray = this.updateRolePermision.get('permissions') as FormArray;
    this.accessArray.clear();

    this.accessService.getAllResource().subscribe(item => {
      this.resourceList = item;
      if (this.resourceList.length > 0) {

        this.resourceList.map((o: any) => {
          this.AddNewRows(o, userRoleId)
        })

       
      }
    })
  }

  onChangeOfBV(id: Event) {
    const selectedId = Number((id.target as HTMLSelectElement).value)
    console.log(selectedId);

    this.roleSrv.getAllRolesByBvId(selectedId).subscribe(item => {
      this.roleList = item;
    });
  }

  existingPermissions: { menus: any[]; subMenus: any[] } = { menus: [], subMenus: [] };
  roleChange(event: Event) {
    let selectedRole = Number((event.target as HTMLSelectElement).value);
    this.selectedRolePermisionid = selectedRole;
    this.roleId = selectedRole;
    this.getAllResource(selectedRole);
    this.loadExistingPermissions(this.roleId);



  }

  getExistingPermissions(roleId: number) {
    console.log('role id', roleId);

    this.accessService.getPermissionsByRoleId(roleId).subscribe(existingPermissions => {

      this.patchPermissions(existingPermissions);
    });
  }

  patchPermissions(existingPermissions: any[]) {
    if (existingPermissions.length === 0 || !existingPermissions  ) {
      console.log('exiting');
      
      return;

    }
    console.log('this is the main array', this.accessArray.value);

    this.accessArray.controls.forEach(control => {


      const resourceName = control.get('resourceName')?.value;
      const existing = existingPermissions.find(p => p.resourceName === resourceName);

      if (existing) {
        console.log('enters the exisisting value', existing);

        control.get('id')?.setValue(existing.id);
        control.get('canView')?.setValue(existing.canView);
        control.get('canCreate')?.setValue(existing.canCreate);
        control.get('canEdit')?.setValue(existing.canEdit);
        control.get('canDelete')?.setValue(existing.canDelete);
      } else {
        console.log('here we can create the new object with false value');
        const permision = {
          roleId: this.selectedRolePermisionid,
          resourceId: control.get('resourceId')?.value,
          resourceName: control.get('resourceName')?.value,
          canCreate: false,
          canView: false,
          canEdit: false,
          canDelete: false
        }

        this.accessService.createPermission(permision).subscribe(item => {
          this.patchPermissions(this.selectedRolePermisionid);
        })

      }
    });
  }

  updated = false;
  savePermisionUpdate() {

    const permission = this.updateRolePermision.value.permissions
    permission.forEach((element: any) => {
      this.accessService.updatePermission(element).subscribe((res: any) => {
        // this.updated = true
        Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Permission has been updated and saved",
        showConfirmButton: false,
        timer: 2000
      })

      }, error => Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 1500
      }))
    });

    if (this.updated) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Permission has been updated and saved",
        showConfirmButton: false,
        timer: 100
      })
      // this.triggerToast('success', 'Updated successfully', 'success')
    } else {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 1500
      })
    }

  }

  triggerToast(header: string, body: string, message: string) {
    this.toastMessage.showToast(header, body, message)
  }

  menuData: any[] = []; // from API
  selectedMenus: any[] = [];
  selectedSubMenus: any[] = [];

  showSubMenuStep = false;
  roleId = 0;


  loadMenus() {
    // Simulating API call
    this.accessService.getAllMenu().subscribe(item => {
      this.menuData = item
      console.log(this.menuData);

    })
  }
  toggleMenuSelection(event: any, menu: any) {
    if (event.target.checked) {
      this.selectedMenus.push(menu);
    } else {
      this.selectedMenus = this.selectedMenus.filter(m => m.id !== menu.id);
      this.selectedSubMenus = this.selectedSubMenus.filter(sub => sub.menuId !== menu.id);
    }
  }




  toggleSubMenuSelection(event: any, subMenu: any, menuId: number) {
    if (event.target.checked) {
      this.selectedSubMenus.push({
        id: subMenu.id,
        subMenuLabel: subMenu.subMenuLabel,
        menuId: menuId
      });
    } else {
      this.selectedSubMenus = this.selectedSubMenus.filter(
        s => s.id !== subMenu.id
      );
    }
  }


  loadExistingPermissions(roleId: number) {
    forkJoin([
      this.accessService.getAllMenuByRoleId(roleId),
      this.accessService.getAllSubMenuByRoleId(roleId)
    ]).subscribe(([menus, subMenus]) => {
      this.existingPermissions = {
        menus,
        subMenus
      };
      console.log('existingPermissions:', this.existingPermissions);

      // Preselect menus
      this.selectedMenus = this.menuData.filter(menu =>
        this.existingPermissions.menus.some(m => m.id === menu.id)
      );

      // Preselect submenus
      this.selectedSubMenus = [];
      for (let menu of this.selectedMenus) {
        for (let sub of menu.subMenus) {
          if (this.existingPermissions.subMenus.some(s => s.id === sub.id)) {
            this.selectedSubMenus.push({
              id: sub.id,
              subMenuLabel: sub.subMenuLabel,
              menuId: menu.id
            });
          }
        }
      }

      // Proceed to submenu step
      this.showSubMenuStep = true;
    });
  }

  isMenuSelected(menuId: number): boolean {
    return this.selectedMenus?.some(m => m.id === menuId);
  }
  isSubMenuSelected(subId: number): boolean {
    return this.selectedSubMenus?.some(s => s.id === subId);
  }
  saveSelectedMenus() {
    const payload = {
      roleId: this.roleId,
      menus: this.selectedMenus.map(m => ({ id: m.id, label: m.label }))
    };
    this.accessService.updateMenuAndAssign(payload).subscribe(item=>{
       Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Menu has been updated and saved",
        showConfirmButton: false,
        timer: 2000
      })
    })
    this.showSubMenuStep = true;
  }

  saveSelectedSubMenus() {
    const payload = {
      roleId: this.roleId,
      subMenus: this.selectedSubMenus
    };
    console.log("Saving submenus", payload);
    this.accessService.updateSubMenuAndAssign(payload).subscribe(item=>{
       Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Submenu has been updated and saved",
        showConfirmButton: false,
        timer: 2000
      })
    })
  }

}
