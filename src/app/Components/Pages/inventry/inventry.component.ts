import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../material.module';
import { InventryService } from '../../../Service/Inventry/inventry.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InventryFormComponent } from '../Forms/inventry-form/inventry-form.component';

@Component({
  selector: 'app-inventry',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './inventry.component.html',
  styleUrl: './inventry.component.scss'
})
export class InventryComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['status', 'asset', 'assignedTo', 'assignedBy', 'assignedDate', 'department', 'Action']
  inventry = inject(InventryService)
  router = inject(Router)

  constructor(private dialog: MatDialog){}

  ngOnInit(): void {

    this.getAllInventry()

  }
  getAllInventry() {
    this.inventry.getAllInventry().subscribe(item => {
      console.log(item);
      
      this.dataSource = item
    })
  }


  createinventry() {
    // this.router.navigateByUrl('inventry/Form')

    this.dialog.open(InventryFormComponent, {
      width: '75%',
      enterAnimationDuration: 500,
      exitAnimationDuration: 500
    })

  }

}
