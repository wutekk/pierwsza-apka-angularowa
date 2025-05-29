import { Injectable, signal, WritableSignal } from '@angular/core';
import { StorageService } from './storage.service';
import { Rzecz } from '../types';

@Injectable({ providedIn: 'root' })
export class ZakupyService {
  lista: WritableSignal<Rzecz[]>;

  constructor(private storage: StorageService) {
    const dane_z_local_storage = this.storage.load();
    this.lista = signal(dane_z_local_storage ?? []);
  }

  get lista_zakupow() {
    return this.lista();
  }

  set lista_zakupow(nowa_lista: Rzecz[]) {
    this.lista.set(nowa_lista);
    this.storage.save(this.lista());
  }

  odwrocZakupy(): void {
    const stara = this.lista_zakupow;

    const odwrocona: Rzecz[] = [];
    for (let i = 0; i < stara.length; i++) {
      odwrocona.push(stara[stara.length - 1 - i]);
    }

    this.lista_zakupow = odwrocona;
  }

  odwrocZaznaczenie(index: number): void {
    const lista = this.lista_zakupow;

    lista[index].zaznaczenie = !lista[index].zaznaczenie;

    this.lista_zakupow = lista;
  }

  usunZaznaczone(): void {
    const lista_pom: Rzecz[] = [];
    for (let rzecz of this.lista_zakupow) {
      if (rzecz.zaznaczenie == false) {
        lista_pom.push(rzecz);
      }
    }

    this.lista_zakupow = lista_pom;
  }

  dodajRzecz(nowej_rzeczy_nazwa: string): void {
    nowej_rzeczy_nazwa = nowej_rzeczy_nazwa.trim();
    if (nowej_rzeczy_nazwa.length == 0) {
      return
    }

    const nowa_rzecz: Rzecz = {
      nazwa: nowej_rzeczy_nazwa,
      zaznaczenie: false,
      ilosc: 1
    }

    const lista = this.lista_zakupow;
    lista.push(nowa_rzecz)

    this.lista_zakupow = lista;
  }

  zwiekszIlosc(index: number): void {
    const lista = this.lista_zakupow

    lista[index].ilosc += 1

    this.lista_zakupow = lista;
  }

  zmniejszIlosc(index: number): void {
    const lista = this.lista_zakupow

    lista[index].ilosc -= 1

    this.lista_zakupow = lista;
  }


}
