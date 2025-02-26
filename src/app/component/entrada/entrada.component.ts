import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Libro } from '../../model/libro';
import { LibroService } from '../../services/libro.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entrada',
  imports: [RouterModule, CommonModule],
  templateUrl: './entrada.component.html',
  styleUrl: './entrada.component.css'
})
export class EntradaComponent {
  libros: Libro[] = [];

  constructor(private libroService: LibroService) {}

  ngOnInit() {
    this.libroService.getLibros().subscribe(libros => {
      this.libros = libros;
    });
  }
}
