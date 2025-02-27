import { Component, OnInit } from '@angular/core';
import { Libro } from '../../../model/libro';
import { Autor } from '../../../model/autor';
import { LibroService } from '../../../services/libro.service';
import { AutorService } from '../../../services/autor.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-crear-libro',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './crear-libro.component.html',
  styleUrl: './crear-libro.component.css'
})
export class CrearLibroComponent implements OnInit {
  libros: Libro[] = [];
  autores: Autor[] = [];
  form: FormGroup;

  constructor(
    private libroService: LibroService,
    private autorService: AutorService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      anioPublicacion: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      imagen: [''],
      sinopsis: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.libroService.getLibros().subscribe((libros) => {
      this.libros = libros;
    });

    this.autorService.getAutores().subscribe((autores) => {
      this.autores = autores;
    });

    const storedForm = localStorage.getItem('formularioLibro');
    if (storedForm) {
      this.form.patchValue(JSON.parse(storedForm));
    }

    this.form.valueChanges.subscribe(value => {
      localStorage.setItem('formularioLibro', JSON.stringify(value));
    });
  }

  submit() {
    if (this.form.valid) {
      const autorSeleccionado = this.autores.find(autor => autor.id === this.form.value.autor);

      const nuevoLibro: Libro = {
        id: (this.libros.length + 1).toString(),
        nombre: this.form.value.nombre,
        anioPublicacion: this.form.value.anioPublicacion,
        autor: autorSeleccionado?.nombre || '',
        genero: this.form.value.genero,
        idAutor: autorSeleccionado?.id || '',
        imagen: this.form.value.imagen,
        sinopsis: this.form.value.sinopsis
      };

      this.libroService.addLibro(nuevoLibro).subscribe(() => {
        this.libros.push(nuevoLibro);
        this.form.reset();
        localStorage.removeItem('formularioLibro');
        this.router.navigate(['/listar-libros']);
      });

    } else {
      alert('Por favor, rellene todos los campos');
    }
  }


}
