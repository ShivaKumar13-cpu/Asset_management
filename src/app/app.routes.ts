import { EquipmentComponent } from './Components/Pages/equipment/equipment.component';
import { AdminComponent } from './Components/admin/admin.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { FeatureModuleComponent } from './Components/feature-module/feature-module.component';
import { LayoutComponent } from './Components/Layouts/layout/layout.component';
import { LoginComponent } from './Login-authentication/login/login.component';
import { Routes } from '@angular/router';
import { authGuard } from './Components/auth-guard/auth-guard.component';
import { BusinessVerticalComponent } from './Components/Pages/business-vertical/business-vertical.component';
import { DepartmentComponent } from './Components/Pages/department/department.component';
import { UsersComponent } from './Components/Pages/users/users.component';
import { SmartDashboardComponent } from './Components/Pages/smart-dashboard/smart-dashboard.component';
import { RoleComponent } from './Components/Pages/role/role.component';
import { RoleFormComponent } from './Components/Pages/role-form/role-form.component';
import { AssetsComponent } from './Components/Pages/assets/assets.component';
import { UsersFormComponent } from './Components/Pages/users-form/users-form.component';
import { AssetVarientComponent } from './Components/Pages/asset-varient/asset-varient.component';
import { AssetSpecificationComponent } from './Components/Pages/asset-specification/asset-specification.component';
import { AccessPolicyComponent } from './Components/Pages/access-policy/access-policy.component';
import { RoleFormCreateComponent } from './Components/Pages/role-form-create/role-form-create.component';
import { PermissionsComponent } from './Components/Pages/permissions/permissions.component';
import { VendorComponent } from './Components/Pages/vendor/vendor.component';
import { VendorFormComponent } from './Components/Pages/Forms/vendor-form/vendor-form.component';
import { AssetFormComponent } from './Components/Pages/Forms/asset-form/asset-form.component';
import { InventryComponent } from './Components/Pages/inventry/inventry.component';
import { InventryFormComponent } from './Components/Pages/Forms/inventry-form/inventry-form.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'admin', component: AdminComponent },
            { path: 'featureMod', component: FeatureModuleComponent },
            { path: 'equipment', component: EquipmentComponent },
            { path: 'businessVertical', component: BusinessVerticalComponent },
            { path: 'department', component: DepartmentComponent },
            { path: 'users', component: UsersComponent },
            { path: 'users/form', component: UsersFormComponent },
            { path: 'smart/dashboard', component: SmartDashboardComponent },
            { path: 'role', component: RoleComponent },
            { path: 'role/form', component: RoleFormComponent },
            { path: 'assets', component: AssetsComponent },
            { path: 'asset-varient', component: AssetVarientComponent },
            { path: 'masterdata/asset-specification', component: AssetSpecificationComponent },
            { path: 'admin/AccessPolicy', component: AccessPolicyComponent },
            { path: 'role/Create', component: RoleFormCreateComponent },
            { path: 'permission', component: PermissionsComponent },
            { path: 'vendor', component: VendorComponent },
            { path: 'vendor/Form', component: VendorFormComponent },
            { path: 'asset/Form', component: AssetFormComponent },
            { path: 'inventry', component: InventryComponent },
            { path: 'inventry/Form', component: InventryFormComponent }

        ]

    }
];
