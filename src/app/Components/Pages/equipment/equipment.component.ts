
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Equipment } from '../../../Model/Class/Equipment';
import { CommonModule } from '@angular/common';
import { AssetsService } from '../../../Service/AssetsAndEquipments/assets.service';
import { MatDialog } from '@angular/material/dialog';
import { EquipmentFormComponent } from '../equipment-form/equipment-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.scss'
})
export class EquipmentComponent implements OnInit {
  ngOnInit(): void {
    this.getAllEqipments();
  }

  constructor(private dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Equipment>([])
  displayedColumns = ['EquipmentName', 'AssetVarient', 'CreatedBy', 'Action']
  equipmentSrv = inject(AssetsService)
  equipmentList: Equipment[] = []


  getAllEqipments() {
    this.equipmentSrv.getAllEquipments().subscribe((res: any) => {
      this.equipmentList = res
      console.log(res);

      this.dataSource = new MatTableDataSource(this.equipmentList)
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      })
    })
  }

  addEquipment() {
    this.openPopUp(0);
  }
  openPopUp(id: number) {
    this.dialog.open(EquipmentFormComponent, {
      width: "50%",
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        'code': id
      }
    }).afterClosed().subscribe(o => {
      console.log("Dialog closed, refreshing data...")
      this.getAllEqipments();
    })
  }
  onEdit(id: number) {
    this.openPopUp(id);
  }
  onDelete(id: number) {
      Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            this.equipmentSrv.deleteEquipmentById(id).subscribe((res) => {
              this.getAllEqipments();
            })
          }
        });
   
  }
}
