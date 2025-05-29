import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZakupyService } from './services/zakupy.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Lista zakupów do zrobienia';
  nowej_rzeczy_nazwa = '';
  input_pokazany = false;

  constructor(public zakupyService: ZakupyService) {}

  get lista_zakupow() {
    return this.zakupyService.lista_zakupow;
  }

  dodaj_zakup(): void {
    this.zakupyService.dodajRzecz(this.nowej_rzeczy_nazwa);

    this.input_pokazany = false;
    this.nowej_rzeczy_nazwa = '';
  }

  pokaz_input(): void {
    this.input_pokazany = true;
  }

  odwroc_zakupy(): void {
    this.zakupyService.odwrocZakupy();
  }

  odwroc_zaznaczenie(i: number): void {
    this.zakupyService.odwrocZaznaczenie(i);
  }

  usun_zaznaczone(): void {
    this.zakupyService.usunZaznaczone();
  }
}

