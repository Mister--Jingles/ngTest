import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {
  setItem(key: string) {
    localStorage.setItem(key, new Date().toISOString());
  }

  getItem(key: string): string {
    return localStorage.getItem(key);
  }
}
