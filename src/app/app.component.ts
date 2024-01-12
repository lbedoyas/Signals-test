import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

interface Task {
  name: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'signals-test';

  name = signal('Luis');

  tasks = signal<Task[]>([
    {
      name: 'ver curso signals',
      isCompleted: true
    }
  ])

  taskLenght = computed(()=> {
    return this.tasks().length;
  })

  constructor(){
    effect(()=> {
      if (this.tasks().length > 3) {
        console.log('tienes muchas tareas');
        alert('tienes muchas tareas')
      }
    })
  }
  toggleName(): void {
    this.name.set('Gabriel');
  }

  addRandomTask():void {
    this.tasks.update( (tasks) => {
      console.log(tasks);
      return [...tasks, {name: 'practicar signals', isCompleted: false}]
    })
  }

  markTaskAsCompleted(): void {
    this.tasks.mutate((tasks)=> {
      const taskToUpdate = this.tasks()[0];
      if (taskToUpdate) {
        taskToUpdate.name = 'angular 17'
        taskToUpdate.isCompleted = true;
      }
    })
  }


}
