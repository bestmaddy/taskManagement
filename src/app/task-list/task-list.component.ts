import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { TaskData } from '../modules/taskData';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  title = 'TaskManagement';
  taskData = new TaskData;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  searchText!: '';
  searchIn!: '';
  searchData: any;
  
  constructor(private service: ServiceService) {
    this.getTask();

  }
  ngOnInit(): void {
  }

  getTask() {
    this.service.getTask().subscribe((data: any) => {
      console.log("taskData", data)
      this.taskData = data.data
      this.searchData = this.taskData
    })
  }
  ChangeStatus(data: TaskData, Status: string) {
    console.log(data, Status)
    data.status = Status;
    if (data) {
      this.service.updateTask(data).subscribe((data: any) => {
        console.log("data form save api:", data);
      })
      this.getTask();
    }
  }
  DeleteTask(data: TaskData) {
    console.log("delete id", data)
    this.service.deleteTask(data.id!).subscribe((data: any) => {
      console.log("data form save api:", data);
    })
    this.getTask();
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  search(value: string): void {
    this.taskData = this.searchData.filter((val: any) =>
      val[this.searchIn].toLowerCase().includes(value.toLowerCase())
      // || val.Location.toLowerCase().includes(value)
    );
  }

}
