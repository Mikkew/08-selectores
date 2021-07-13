import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { combineLatest, Observable, of } from 'rxjs';
import { Pais, PaisSmall } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesServiceService {

  private baseUrl: string = environment.apiUrl;

  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regiones(): string[] {
    return [...this._regiones];
  }

  constructor(private http: HttpClient) { }

  getPaisesPorRegion(region: string): Observable<Pais[]> {

    const url: string = `${this.baseUrl}/region/${region}?fields=name;alpha3Code`;
    return this.http.get<Pais[]>(url);
  }

  getPaisPorCodigo(codigo: string): Observable<Pais | null> {
    if( !codigo ){
      return of(null);
    }

    const url: string = `${this.baseUrl}/alpha/${codigo}`;
    return this.http.get<Pais>(url);
  }

  getPaisPorCodigoSmall(codigo: string): Observable<PaisSmall> {
    const url: string = `${this.baseUrl}/alpha/${codigo}?fields=name;alpha3Code`;
    return this.http.get<PaisSmall>(url);
  }

  getPaisesPorCodigos(borders: string[]): Observable<PaisSmall[]> {
    if(!borders) {
      return of([]);
    }

    const peticiones: Observable<PaisSmall>[] = [];
    
    borders.forEach(codigo => {
      let peticion = this.getPaisPorCodigoSmall(codigo);
     
      peticiones.push(peticion);
    });

    return combineLatest( peticiones );
  }

}
