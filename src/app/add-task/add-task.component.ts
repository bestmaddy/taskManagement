import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { TaskData } from '../modules/taskData';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @ViewChild('TaskForm', { static: true })
  TaskForm!: NgForm;
  createTask = new TaskData;

  tatus: any[] = [
    { id: '1', Status: 'Running' },
    { id: '2', Status: 'Closed' },
    { id: '3', Status: 'Cancelled' }
  ]
  
  constructor(private service: ServiceService) { }

  ngOnInit(): void {
  }

  CreateTask(task: TaskData) {
    // console.log("task form", JSON.stringify(task))

    if (task) {
      this.TaskForm.resetForm();
      this.service.saveTask(task).subscribe((data: any) => {
        console.log("data form save api:", data);
      })
    }
  }
  reset(taskform: NgForm) {
    taskform.resetForm();
  }

}
