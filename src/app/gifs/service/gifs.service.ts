import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SerchGifsResponse, Gifs } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey    : string = 'cvVRl7ucNd5Bz6VrHsyXWphgWYAFI6Xz';
  private servicioURL: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gifs[] = [];

  get historial(){ 
    return [...this._historial];
  }

  constructor(private http: HttpClient){
    // localStorage.getItem('historial');
  
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];  
      this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    

  }

  buscarGifs(termino: string = ''){
    termino = termino.trim().toLocaleLowerCase();
    if (!this._historial.includes(termino)) {
      this._historial.unshift(termino);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    // console.log(this._historial);
  const params = new HttpParams()
  .set('api_key', this.apiKey)
  .set('limint', '10')
  .set('q', termino);


    this.http.get<SerchGifsResponse>(`${this.servicioURL}/search`, {params})
    .subscribe( (resp) => {
      // console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });

  }
}
