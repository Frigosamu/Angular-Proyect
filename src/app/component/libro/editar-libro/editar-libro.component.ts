import { Component } from '@angular/core';
import { Libro } from '../../../model/libro';
import { Autor } from '../../../model/autor';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AutorService } from '../../../services/autor.service';
import { LibroService } from '../../../services/libro.service';

@Component({
  selector: 'app-editar-libro',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar-libro.component.html',
  styleUrl: './editar-libro.component.css'
})
export class EditarLibroComponent {
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
      autor: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      imagen: [''],
      sinopsis: ['', [Validators.required]]
    });
    
    this.autorService.getAutores().subscribe(a => this.autores = a);
    this.libroService.getLibros().subscribe(l => this.libros = l);

    this.libroService.getLibro(this.libroId!).subscribe(libroEditar => {
      this.form.patchValue({
        nombre: libroEditar.nombre,
        anioPublicacion: libroEditar.anioPublicacion,
        autor: libroEditar.autor,
        genero: libroEditar.genero,
        imagen: libroEditar.imagen,
        sinopsis: libroEditar.sinopsis
      });
    });
  }

  submit() {
    if (this.form.valid) {
      const autorSeleccionado = this.autores.find(autor => autor.id === this.form.value.autor);

      const actualizarLibro: Libro = {
        id: this.libroId,
        nombre: this.form.value.nombre,
        anioPublicacion: this.form.value.anioPublicacion,
        autor: autorSeleccionado?.nombre || '',
        genero: this.form.value.genero,
        idAutor: autorSeleccionado?.id || '',
        imagen: this.form.value.imagen,
        sinopsis: this.form.value.sinopsis
      }

      this.libroService.updateLibro(actualizarLibro).subscribe(() => this.form.reset());
      this.router.navigate(['/listar-libros']);
    } else {
      alert('Por favor, rellene todos los campos');
    }
  }
}
