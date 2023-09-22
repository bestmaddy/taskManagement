import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from './service/service.service';
import { TaskData } from './modules/taskData';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('TaskForm', { static: true })
  TaskForm!: NgForm;
  title = 'TaskManagement';
  taskData: TaskData[] | undefined;
  createTask = new TaskData;

  tatus: any[] = [
    { id: '1', Status: 'Running' },
    { id: '2', Status: 'Closed' },
    { id: '3', Status: 'Cancelled' }
  ]
  constructor(private service: ServiceService) {
    this.getTask();

  }
  ngOnInit(): void {
  }
  getTask() {
    this.service.getTask().subscribe((data: any) => {
      console.log("taskData", data)
      this.taskData = data.data
    })
  }
  ChangeStatus(data: TaskData, Status: string) {
    console.log(data, Status)
    this.service.updateTask({ "id": data.id, "status": Status });
    this.getTask();
  }
  DeleteTask(data: TaskData) {
    console.log("delete id", data)
    this.service.deleteTask(data.id!);
    this.getTask();
  }
  CreateTask(task: TaskData) {
    console.log("task form", JSON.stringify(task))
    if (task) {
      this.TaskForm.resetForm();
      this.service.saveTask(task).subscribe((data:any) => {
        console.log("data form save api:", data);
      })
      this.getTask();
    }
  }
  reset(taskform: NgForm) {
    taskform.resetForm();
  }
}
