import { animate, style, transition, trigger } from "@angular/animations";

export interface IMenuItem {
    id?: string;
    icon?: string;
    label: string;
    to: string;
    for?: string;
    newWindow?: boolean;
    subs?: IMenuItem[];
    expanded?: boolean;
    role?: any;
}

export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms',
            style({ opacity: 1 })
        )
    ]),
    transition(':leave', [
        style({ opacity: 0 }),
        animate('350ms',
            style({ opacity: 1 })
        )
    ])

])

const data: IMenuItem[] = [
    {
        id: 'dashboards',
        icon: 'donut_small',
        label: 'Dashboard',
        to: 'dashboard',
        subs: [{
            icon: 'trail_length_short',
            label: 'Overview',
            to: 'dashboard'
        },
        {
            icon: 'trail_length_short',
            label: 'Asset Summary',
            to: 'smart/dashboard'
        },
        {
            icon: 'trail_length_short',
            label: 'Recent Activities',
            to: 'recent/dashboard'
        }]
    },
    {
        id: 'masterdata',
        icon: 'database',
        label: 'Organization Management',
        to: '/app/masterdata',
        subs: [
            {
                for: 'Master Data',
                id: 'business-Vertical-Type',
                icon: 'trail_length_short',
                label: 'Business Hierarchy',
                to: 'businessVertical'
            },
            {
                for: 'Master Data',
                id: 'department',
                icon: 'trail_length_short',
                label: 'Departments',
                to: 'department'
            },
            {
                for: 'Master Data',
                icon: 'trail_length_short',
                label: 'Roles & Permissions',
                to: 'role'
            }
           
            // {
            //     for: 'Master Data',
            //     id: 'asset-specification',
            //     icon: 'trail_length_short',
            //     label: 'Asset Specification',
            //     to: 'masterdata/asset-specification',
            //     role: ['superadmin']
            // }
        ]
    },
    {
        id: 'admin',
        icon: 'manage_accounts',
        label: 'Roles & Permissions',
        to: 'admin',
        subs: [
            {
                for: 'Admin',
                icon: 'trail_length_short',
                label: 'Assign Permissions',
                to: 'permission'
            },
            {
                for: 'Admin',
                icon: 'trail_length_short',
                label: 'Users',
                to: 'users'
                
            },
            {
                for: 'Admin',
                icon: 'trail_length_short',
                label: 'Assign Roles',
                to: '/app/admin/emailConfiguration'
            }
        ]
    },


    {
        id: 'asset-creation',
        icon: 'token',
        label: 'Asset Management',
        to: 'assets',
        subs: [
            {
                for: 'Master Data',
                icon: 'trail_length_short',
                label: 'Assets',
                to: 'assets'
            },
            {
                for: 'Master Data',
                icon: 'trail_length_short',
                label: 'Asset Tracking',
                to: 'asset-varient'
            },
            {
                for: 'Master Data',
                icon: 'trail_length_short',
                label: 'Warranties',
                to: 'asset-varient'
            }
        ],
    },
    {
        id: 'vendor-creation',
        icon: 'storefront',
        label: 'Vendor Management',
        to: '/app/vendor-creation',
        subs: [
            {
                for: 'Vendor Management',
                icon: 'trail_length_short',
                label: 'Vendor Types',
                to: 'vendorType'
            },
            {
                for: 'Vendor Management',
                icon: 'trail_length_short',
                label: 'Vendors',
                to: 'vendor'
            }
        ]
    },
   
    {
        id: 'user-creation',
        icon: 'group',
        label: 'Users',
        to: 'users',
        subs: [],

    },
    {
        id: 'asset-master',
        icon: 'group',
        label: 'Asset Master Data',
        to: 'masterdata/asset-specification',
        subs: [],

    },
    {
        id: 'equipment-creation',
        icon: 'construction',
        label: 'Equipments',
        to: 'equipment',
        subs: [],
    },

    {
        id: 'inventory',
        icon: 'assured_workload',
        label: 'Inventory',
        to: '/app/inventory',
        subs: [],
    },

    {
        id: 'service-request',
        icon: 'support_agent',
        label: 'Service Request',
        to: '/app/service-request',
        subs: []
    },
    {
        id: 'Settings',
        icon: 'trail_length_short',
        label: "setting",
        to: '/app/inventory',
        subs: [
            {
                for: 'Settings',
                icon: 'trail_length_short',
                label: 'Profile',
                to: 'sdfsfs'
            },
            {
                for: ' Settings',
                icon: 'trail_length_short',
                label: 'Audit Logs',
                to: 'asssdfets'

            },
            {
                for: 'Settings',
                icon: 'trail_length_short',
                label: 'System Configuration',
                to: 'fsdfs'

            }
        ]
    }

]
export default data;
