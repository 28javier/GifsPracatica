import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/service/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  

  get historial(){
    return this.gitsService.historial;
  }
  constructor(private gitsService: GifsService) { }

  buscar(termino: string){
    // console.log(termino);
    this.gitsService.buscarGifs(termino);
    
  }
}
