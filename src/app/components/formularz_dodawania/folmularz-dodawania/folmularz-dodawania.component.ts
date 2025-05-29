import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ZakupyService } from '../../../services/zakupy.service';

@Component({
  selector: 'app-folmularz-dodawania',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './folmularz-dodawania.component.html',
  styleUrl: './folmularz-dodawania.component.css'
})
export class FolmularzDodawaniaComponent {
  nowej_rzeczy_nazwa = '';
  input_pokazany = false;

  constructor(public zakupyService: ZakupyService) {}


  dodaj_zakup(): void {
    this.zakupyService.dodajRzecz(this.nowej_rzeczy_nazwa);

    this.input_pokazany = false;
    this.nowej_rzeczy_nazwa = '';
  }
  
  pokaz_input(): void {
    this.input_pokazany = true;
  }

}
