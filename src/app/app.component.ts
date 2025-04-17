import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './storage.service';
import { LISTA_ZAKUPOW_NAZWY } from './items.data';
import { Rzecz } from './ app.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Lista zakupów do zrobienia';
  lista_zakupow;

  constructor(
    private storageService: StorageService
  ) {
    const init_lista = this.storageService.load()
    if(init_lista != null) {
      this.lista_zakupow = signal(init_lista);
    } else {
      this.lista_zakupow = signal(
        LISTA_ZAKUPOW_NAZWY.map(nazwa => ({ nazwa, zaznaczenie: false })));
    }
  }

  odwroc_zakupy(): void {
    const stara = this.lista_zakupow();
    const odwrocona: Rzecz[] = [];

    for (let i = 0; i < stara.length; i++) {
      odwrocona.push(stara[stara.length - 1 - i]);
    }
    this.lista_zakupow.set(odwrocona);
    this.storageService.save(this.lista_zakupow())
  }

  odwroc_zaznaczenie(index: number): void {
    const lista = this.lista_zakupow();
    lista[index].zaznaczenie = !lista[index].zaznaczenie;
    
    this.lista_zakupow.set(lista);
    this.storageService.save(this.lista_zakupow())
  }

  usun_zaznaczone(): void {
    const lista = this.lista_zakupow();

    const lista_pom: Rzecz[] = [];
    for (let rzecz of lista) {
      if (rzecz.zaznaczenie == false) {
        lista_pom.push(rzecz);
      }
    }

    this.lista_zakupow.set(lista_pom);
    this.storageService.save(this.lista_zakupow())
  }
  
}
