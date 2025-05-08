import { Injectable } from "@angular/core";
import { Rzecz } from "../types";

const klucz = 'rzeczy';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  save(rzeczy: Rzecz[]): void {
    localStorage.setItem(klucz, JSON.stringify(rzeczy))
  }

  load(): Rzecz[] | null {
    const rzeczy = localStorage.getItem(klucz);
    return rzeczy == null ? null : JSON.parse(rzeczy);
  }


}