import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { Autor } from '../../../model/autor';
import { AutorService } from '../../../services/autor.service';

@Component({
  selector: 'app-crear-autor',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './crear-autor.component.html',
  styleUrl: './crear-autor.component.css'
})
export class CrearAutorComponent implements OnInit {
  autores: Autor[] = [];
  form: FormGroup;

  constructor(
    private autorService: AutorService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      anioNacimiento: ['', [Validators.required]],
      latitud: ['', [Validators.required]],
      longitud: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.autorService.getAutores().subscribe((autores) => {
      this.autores = autores;
    });

    const storedForm = localStorage.getItem('formularioAutor');
    if (storedForm) {
      this.form.patchValue(JSON.parse(storedForm));
    }

    this.form.valueChanges.subscribe(value => {
      localStorage.setItem('formularioAutor', JSON.stringify(value));
    });
  }

  submit() {
    if (this.form.valid) {
      const nuevoAutor: Autor =  {
        id: (this.autores.length + 1).toString(),
        nombre: this.form.value.nombre,
        anioNacimiento: this.form.value.anioNacimiento,
        lugarNacimiento: {
          latitud: this.form.value.latitud,
          longitud: this.form.value.longitud
        }
      };

      this.autorService.addAutor(nuevoAutor).subscribe(() => {
        this.autores.push(nuevoAutor);
        this.form.reset();
        localStorage.removeItem('formularioAutor')
        this.router.navigate(['/listar-autores']);
      })
    } else {
      alert('Por favor, rellene todos los campos')
    }
  }
}
