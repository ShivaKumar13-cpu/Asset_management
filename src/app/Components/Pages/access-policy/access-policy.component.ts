import { AfterViewInit, Component, inject, model, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Menu1 } from '../../../Model/Class/Access';
import { AccessPolicyService } from '../../../Service/AccessPolicy/access-policy.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-access-policy',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './access-policy.component.html',
  styleUrl: './access-policy.component.scss'
})
export class AccessPolicyComponent implements OnInit, AfterViewInit {

  accessSrv = inject(AccessPolicyService)
  menuList: Menu1[] = []

  constructor(private dialog: MatDialog){}

  ngOnInit(): void {
    this.getAllMenu()
  }
  readonly checked = model(false);

  activeTab: string = 'menu';
  menus: any[]=[]

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  @ViewChild('brandPaginator') brandPaginator!: MatPaginator;
  @ViewChild('modelPaginator') modelPaginator!: MatPaginator;

  dataMenuSource = new MatTableDataSource<Menu1>([]);

  displayedMenuColumns: string[] = ['menuName']
  displayedSubmenuColumns: string[] = ['subMenuName', 'menuName', 'Action']

  ngAfterViewInit() {
    this.dataMenuSource.paginator = this.brandPaginator;
  }

  getAllMenu() {
    console.log('enters');
    
    this.accessSrv.getAllMenu().subscribe(item => {
      console.log(item);
      
      this.menuList = item;
      this.menus = item;
      this.dataMenuSource.data = item;
      console.log(this.menuList);

    })
  }
  // createMenu() {
  //   this.openPopUpMenu(0);
  // }

  // openPopUpMenu(id: number) {
  //   this.dialog.open(MenuComponent, {
  //         width: '50%',
  //         enterAnimationDuration: '500ms',
  //         exitAnimationDuration: '500ms',
  //         data: {
  //           'code': id
    
  //         }
  //       })
  // }
  getAllSubMenu() {

  }
}
