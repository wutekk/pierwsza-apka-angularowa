import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { LISTA_ZAKUPOW } from './items.data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Lista zakupów do zrobienia';
  lista_zakopow = LISTA_ZAKUPOW;
}
