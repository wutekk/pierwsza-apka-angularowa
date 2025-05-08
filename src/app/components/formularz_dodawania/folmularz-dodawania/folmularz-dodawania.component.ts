import { Component } from '@angular/core';

@Component({
  selector: 'app-folmularz-dodawania',
  standalone: true,
  imports: [],
  templateUrl: './folmularz-dodawania.component.html',
  styleUrl: './folmularz-dodawania.component.css'
})
export class FolmularzDodawaniaComponent {

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

    this.input_pokazany = false;
    this.nowej_rzeczy_nazwa = '';
  }

}
