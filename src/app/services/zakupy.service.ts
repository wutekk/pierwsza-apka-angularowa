import { Injectable, signal, WritableSignal } from '@angular/core';
import { StorageService } from './storage.service';
import { LISTA_ZAKUPOW_NAZWY } from '../items.data';
import { Rzecz } from '../types';

@Injectable({ providedIn: 'root' })
export class ZakupyService {
  lista: WritableSignal<Rzecz[]>;

  constructor(private storage: StorageService) {
    const dane = this.storage.load();
    this.lista = signal(
      dane ?? LISTA_ZAKUPOW_NAZWY.map(nazwa => ({ nazwa, zaznaczenie: false }))
    );
  }

  getLista() {
    return this.lista;
  }

  odwrocZakupy(): void {
    const odwrocona = [...this.lista()].reverse();
    this.lista.set(odwrocona);
    this.zapisz();
  }

  odwrocZaznaczenie(index: number): void {
    const nowa = [...this.lista()];
    nowa[index].zaznaczenie = !nowa[index].zaznaczenie;
    this.lista.set(nowa);
    this.zapisz();
  }

  usunZaznaczone(): void {
    const oczyszczona = this.lista().filter(r => !r.zaznaczenie);
    this.lista.set(oczyszczona);
    this.zapisz();
  }

  dodajRzecz(nazwa: string): void {
    const tekst = nazwa.trim();
    if (!tekst) return;
    const nowa = [...this.lista(), { nazwa: tekst, zaznaczenie: false }];
    this.lista.set(nowa);
    this.zapisz();
  }

  private zapisz(): void {
    this.storage.save(this.lista());
  }
}
