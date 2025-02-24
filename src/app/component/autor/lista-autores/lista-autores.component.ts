import { Component } from '@angular/core';
import { Autor } from '../../../model/autor';
import { AutorService } from '../../../services/autor.service';
import { LibroService } from '../../../services/libro.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-autores',
  imports: [RouterLink, RouterModule],
  templateUrl: './lista-autores.component.html',
  styleUrl: './lista-autores.component.css'
})
export class ListaAutoresComponent {
  autores: Autor[] = [];

  constructor(private autorService: AutorService, private libroService: LibroService) { }

  ngOnInit() {
    this.autorService.getAutores().subscribe((autores) => {
      this.autores = autores;
    });
  }

  deleteAutor(idAutor: number) {
    this.libroService.getLibros().subscribe((libros) => {
      const autorTieneLibros = libros.some((libro) => libro.idAutor === idAutor);

      if (autorTieneLibros) {
        alert('No se puede eliminar el autor porque tiene libros asociados');
      } else {
        this.autorService.deleteAutor(idAutor).subscribe(() => {
          this.autores = this.autores.filter((autor) => autor.idAutor !== idAutor);
        });
      }
    });
  }

  getAllAutores() {
    this.autorService.getAutores().subscribe((autores) => {
      this.autores = autores;
    });
  }

  addAutor(autor: Autor) {
    this.autorService.addAutor(autor).subscribe(() => {
      this.getAllAutores();
    });
  }
}
