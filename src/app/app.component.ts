import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZakupyService } from './services/zakupy.service';
import { FolmularzDodawaniaComponent } from "./components/formularz_dodawania/folmularz-dodawania.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FolmularzDodawaniaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Lista zakupów do zrobienia';

  constructor(public zakupyService: ZakupyService) {}

  get lista_zakupow() {
    return this.zakupyService.lista_zakupow;
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

