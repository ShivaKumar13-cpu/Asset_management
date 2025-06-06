import { MatDialog } from '@angular/material/dialog';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { UserAttribute } from '../../../Model/Class/UserLoggedAttributes';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../Service/User-service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { UsersFormComponent } from '../users-form/users-form.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<UserAttribute>([]);
  displayedColumns = ['name', 'username', 'email', 'employeeCode', 'mobileNumber', 'isActive', 'createdDate', 'Action']
  userService = inject(UserService)
  allUsers: any[] = []; 
  activeUsers: any[] = [];

  ngOnInit(): void {
    this.getAllUser();
    this.dataSource = new MatTableDataSource(this.allUsers)
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();  
  }

  toggleUsers(event: any): void {
    console.log("entered toggle user");
    
    const checked = event.target?.checked; // This works with native checkbox
    if (checked) {
      console.log('checked');
      
      this.activeUsers = this.allUsers.filter(user => user.isActive);
      console.log(this.activeUsers);
      
      this.dataSource = new MatTableDataSource(this.activeUsers);
    } else {
      console.log('Unchecked');
      this.dataSource = new MatTableDataSource(this.allUsers);
    }
  
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
  }

  constructor( private dialog: MatDialog, private router: Router){}

  userList: UserAttribute[] = []

  getAllUser() {
    console.log('entered comp');

    this.userService.getAllUser().subscribe((res: any) => {
      this.allUsers = res;
      this.dataSource = new MatTableDataSource(res)
      
      console.log(this.allUsers);
      

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      })

    })

  }
  addUsers(id: number){
      this.dialog.open(UsersFormComponent,{
      width:'70%',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'500ms',
      panelClass: 'custom-dialog-panel',
      data:{
        code: id
      }

    })
  }

  

  openPopUp(id: number){

  }

}
