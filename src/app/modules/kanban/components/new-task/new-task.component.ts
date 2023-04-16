import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-task',
  standalone: true,
  templateUrl: './new-task.component.html',
  imports: [
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {
  title?: string;
}
