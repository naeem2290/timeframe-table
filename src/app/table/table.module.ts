import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { TableRoutingModule } from './table-routing.module';
import { TableViewComponent } from './table-view/table-view.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    TableViewComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class TableModule { }
