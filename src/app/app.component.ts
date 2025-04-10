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
  lista_zakopow = LISTA_ZAKUPOW.map(item => '🟪 ' + item);

  odwroc(lista: any[]): any[] {
    const lista_pomocnicza: any[] = []
    for (let i: number = 0; i < lista.length; i++){
      lista_pomocnicza.push(lista[lista.length - 1 - i])
    }
    return lista_pomocnicza;
  }

  
  odwroc_zakupy(): void {
    this.lista_zakopow = this.odwroc(this.lista_zakopow);
  }
  
  zaznacz(item: string): void {
    const index = this.lista_zakopow.indexOf(item);
    if (index !== -1) {
      this.lista_zakopow[index] = '☑️ ' + item.slice(2);
    }
  }
}
