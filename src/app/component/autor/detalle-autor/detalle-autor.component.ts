import { Component } from '@angular/core';
import { Autor } from '../../../model/autor';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutorService } from '../../../services/autor.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-autor',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './detalle-autor.component.html',
  styleUrl: './detalle-autor.component.css'
})
export class DetalleAutorComponent {
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
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      anioNacimiento: ['', [Validators.required]],
      latitud: ['', [Validators.required]],
      longitud: ['', [Validators.required]],
    });

    this.autorService.getAutor(this.autorId!).subscribe(autorDetalle => {
      this.form.patchValue({
        id: autorDetalle.id,
        nombre: autorDetalle.nombre,
        anioNacimiento: autorDetalle.anioNacimiento,
        latitud: autorDetalle.lugarNacimiento?.latitud,
        longitud: autorDetalle.lugarNacimiento?.longitud
      });

    });
  }
}
