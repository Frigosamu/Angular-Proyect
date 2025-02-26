import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibroService } from '../../../services/libro.service';
import { AutorService } from '../../../services/autor.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Libro } from '../../../model/libro';
import { Autor } from '../../../model/autor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-libro',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './detalle-libro.component.html',
  styleUrl: './detalle-libro.component.css'
})
export class DetalleLibroComponent {
  libros: Libro[] = [];
  autores: Autor[] = [];
  libroId: string = '';
  form: FormGroup;

  constructor(
    private libroService: LibroService,
    private autorService: AutorService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router

  ) {

    const routeParams = this.route.snapshot.paramMap;
    this.libroId = routeParams.get('id')!;

    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      anioPublicacion: ['', [Validators.required]],
      idAutor: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      imagen: [''],
      sinopsis: ['', [Validators.required]]
    });
    
    this.autorService.getAutores().subscribe(a => this.autores = a);
    this.libroService.getLibros().subscribe(l => this.libros = l);

    this.libroService.getLibro(this.libroId!).subscribe(libroDetalle => {
      this.form.patchValue({
        nombre: libroDetalle.nombre,
        anioPublicacion: libroDetalle.anioPublicacion,
        idAutor: libroDetalle.id,
        autor: libroDetalle.autor,
        genero: libroDetalle.genero,
        imagen: libroDetalle.imagen,
        sinopsis: libroDetalle.sinopsis
      });
    });
  }
}
