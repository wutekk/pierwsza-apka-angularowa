import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './storage.service';
import { LISTA_ZAKUPOW_NAZWY } from './items.data';
import { Rzecz } from './types';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Lista zakupów do zrobienia';
  lista_zakupow;
  nowej_rzeczy_nazwa: string = '';

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

  dodaj_zakup(): void {
    this.nowej_rzeczy_nazwa = this.nowej_rzeczy_nazwa.trim();
    if (this.nowej_rzeczy_nazwa.length == 0) {
      return
    }
    const lista = this.lista_zakupow();

    const nowa_rzecz: Rzecz = {
      nazwa: this.nowej_rzeczy_nazwa,
      zaznaczenie: false
    }
    lista.push(nowa_rzecz)

    this.lista_zakupow.set(lista);
    this.storageService.save(this.lista_zakupow())

    this.nowej_rzeczy_nazwa = ''
  }
}

