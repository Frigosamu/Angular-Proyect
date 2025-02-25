import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Autor } from '../../../model/autor';
import { AutorService } from '../../../services/autor.service';

@Component({
  selector: 'app-editar-autor',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar-autor.component.html',
  styleUrl: './editar-autor.component.css'
})
export class EditarAutorComponent {
  autores: Autor[] = [];
  autorId: string = '';
  form: FormGroup;

  constructor(
    private autorService: AutorService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.autorService.getAutores().subscribe(a => this.autores = a);

    const routeParams = this.route.snapshot.paramMap;
    this.autorId = routeParams.get('id')!;

    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      anioNacimiento: ['', [Validators.required]],
      latitud: ['', [Validators.required]],
      longitud: ['', [Validators.required]],
    });

    this.autorService.getAutor(this.autorId!).subscribe(autorEditar => {
      this.form.patchValue({
        nombre: autorEditar.nombre,
        anioNacimiento: autorEditar.anioNacimiento,
        latitud: autorEditar.lugarNacimiento?.latitud,
        longitud: autorEditar.lugarNacimiento?.longitud 
      });
      
    });
  }

  submit() {
    if (this.form.valid) {
      const actualizarAutor: Autor = {
        id: this.autorId,
        nombre: this.form.value.nombre,
        anioNacimiento: this.form.value.anioNacimiento,
        lugarNacimiento: {
          latitud: this.form.value.latitud,
          longitud: this.form.value.longitud
        }
      }

      this.autorService.updateAutor(actualizarAutor).subscribe(() => this.form.reset());
      this.router.navigate(['/listar-autores']);
    }
  }
}
