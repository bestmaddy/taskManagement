import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';

const routes: Routes = [
  { path: "taskList", component: TaskListComponent },
  { path: "addTask", component: AddTaskComponent },
  { path: '', redirectTo: '/taskList', pathMatch: 'full' },
  { path: "**", component: TaskListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
