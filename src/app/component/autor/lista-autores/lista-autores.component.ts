import { Component } from '@angular/core';
import { Autor } from '../../../model/autor';
import { AutorService } from '../../../services/autor.service';
import { LibroService } from '../../../services/libro.service';
import { RouterLink, RouterModule } from '@angular/router';
import { Libro } from '../../../model/libro';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-autores',
  imports: [RouterLink, RouterModule, FormsModule],
  templateUrl: './lista-autores.component.html',
  styleUrl: './lista-autores.component.css'
})
export class ListaAutoresComponent {
  autores: Autor[] = [];
  libros: Libro[] = [];
  filtro: string = 'id';

  constructor(private autorService: AutorService, private libroService: LibroService) {
    this.libroService.getLibros().subscribe(l => this.libros = l);
    this.autorService.getAutores().subscribe(a => this.autores = a);
  }

  ngOnInit() {
    this.autorService.getAutores().subscribe((autores) => {
      this.autores = autores;
    });
  }

  deleteAutor(id: string) {
    this.libroService.getLibros().subscribe((libros) => {
      const autorTieneLibros = libros.some((libro) => libro.idAutor === id);
      console.log('idautor: ', );

      if (autorTieneLibros) {
        alert('No se puede eliminar el autor porque tiene libros asociados');
      } else {
        this.autorService.deleteAutor(id).subscribe(() => {
          this.autorService.getAutores().subscribe(a => 
            this.autores = a);
        });
      }
    });
  }

  ordenarAutores() {
    if (this.filtro === 'id') {
      this.autores.sort((a, b) => Number(a.id) - Number(b.id));
    } else if (this.filtro === 'alfabetico') {
      this.autores.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
  }
  

}
