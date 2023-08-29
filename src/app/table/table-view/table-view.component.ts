import { Component, OnInit, ViewChild } from '@angular/core';
import { TimeSlotsTable } from '../../mock-data'
import { TimeSlot } from 'src/app/models/time-slot';
import { SlotRow } from 'src/app/models/slot-row';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/shared/dialog-box/dialog-box.component';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {

  mockData: TimeSlot[] = TimeSlotsTable
  data: any
  dataSource: any
  editMode: boolean = true;
  history: any[] = []
  displayedColumns: string[] = ["TimeSlot", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  private weekday: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(public dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.data = this.populateData();
    this.dataSource = new MatTableDataSource(this.data);
  }

  numberValidation(e: KeyboardEvent) {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }

  editTable(index: number, old: string, event: any, day: string): void {
    if (!event.target) {
      return;
    }
    const obj = {
      time: this.data[index].timeslot,
      old: old,
      newValue: event.target.value,
      date: this.data[index][day].date
    }
    this.history.push(obj);
  }

  getRanges() {
    let ranges = Array.from(new Set(this.mockData.map((entry) => entry.date_time.split("T")[0]))).map((el) => new Date(el));
    return ranges;
  }

  populateData(): SlotRow {
    const timeslots: any = { "00": "12:00AM-01:00AM", "01": "01:00AM-02:00AM", "02": "02:00AM-03:00AM", "03": "03:00AM-04:00AM", "04": "04:00AM-05:00AM", "05": "05:00AM-06:00AM", "06": "06:00AM-07:00AM", "07": "07:00AM-08:00AM", "08": "08:00AM-09:00AM", "09": "09:00AM-10:00AM", "10": "10:00AM-11:00AM", "11": "11:00AM-12:00PM", "12": "12:00PM-01:00PM", "13": "01:00PM-02:00PM", "14": "02:00PM-03:00PM", "15": "03:00PM-04:00PM", "16": "04:00PM-05:00PM", "17": "05:00PM-06:00PM", "18": "06:00PM-07:00PM", "19": "07:00PM-08:00PM", "20": "08:00PM-09:00PM", "21": "09:00PM-10:00PM", "22": "10:00PM-11:00PM", "23": "11:00PM-12:00AM" }
    const ranges = this.getRanges();
    const rangesLength: any = ranges.length
    const customRange = [];
    for (let i = 0; i < rangesLength; i++) {
      if (this.weekday[ranges[i].getDay()] === "Sunday") {
        customRange.push([`${ranges[i].getFullYear()}-${ranges[i].getMonth() + 1 >= 10 ? ranges[i].getMonth() + 1 : "0" + (ranges[i].getMonth() + 1)}-${ranges[i].getDate() >= 10 ? ranges[i].getDate() : "0" + ranges[i].getDate()}`])
      }
      else {
        if (customRange.length === 0) {
          customRange.push([`${ranges[i].getFullYear()}-${ranges[i].getMonth() + 1 >= 10 ? ranges[i].getMonth() + 1 : "0" + (ranges[i].getMonth() + 1)}-${ranges[i].getDate() >= 10 ? ranges[i].getDate() : "0" + ranges[i].getDate()}`])
        }
        else {
          customRange[customRange.length - 1].push(`${ranges[i].getFullYear()}-${ranges[i].getMonth() + 1 >= 10 ? ranges[i].getMonth() + 1 : "0" + (ranges[i].getMonth() + 1)}-${ranges[i].getDate() >= 10 ? ranges[i].getDate() : "0" + ranges[i].getDate()}`)
        }
      }
    }

    let sortedData: any = []
    customRange.forEach((entry: any) => {
      Object.keys(timeslots).sort()?.forEach((timeslot) => {
        let timeSlotData: any = {}
        timeSlotData['timeslot'] = timeslots[timeslot]
        entry.map((dateEntry: any) => {
          const date = this.weekday[new Date(dateEntry).getDay()]
          const checkTimeslotFilter = this.mockData.filter((el) => el.date_time.split("T")[0] === dateEntry && el.date_time.split("T")[1].split(":")[0] === timeslot)
          if (checkTimeslotFilter.length > 0) {
            timeSlotData[date] = { value: checkTimeslotFilter[0].display_value, date: dateEntry }
          }
          else {
            timeSlotData[date] = { value: "-", date: dateEntry }
          }
        })
        sortedData.push(timeSlotData)
      })
    })
    return sortedData;
  }

  onSubmit(): void {
    this.dialog.open(DialogBoxComponent, {
      data: {
        history: this.history
      },
    });
    this.editMode = true;
  }
}
