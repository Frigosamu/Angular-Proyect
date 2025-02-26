import { Component, AfterViewInit } from '@angular/core';
import { Autor } from '../../../model/autor';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutorService } from '../../../services/autor.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Map, tileLayer, marker } from 'leaflet';

@Component({
  selector: 'app-detalle-autor',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './detalle-autor.component.html',
  styleUrl: './detalle-autor.component.css'
})
export class DetalleAutorComponent implements AfterViewInit {
  form: FormGroup;
  autorId: string = '';
  map!: Map;
  latitud!: number;
  longitud!: number;

  constructor(
    private autorService: AutorService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.autorId = this.route.snapshot.paramMap.get('id')!;

    this.form = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      anioNacimiento: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.autorService.getAutor(this.autorId).subscribe(autorDetalle => {
      this.form.patchValue({
        id: autorDetalle.id,
        nombre: autorDetalle.nombre,
        anioNacimiento: autorDetalle.anioNacimiento,
        latitud: autorDetalle.lugarNacimiento?.latitud,
        longitud: autorDetalle.lugarNacimiento?.longitud
      });

      this.latitud = autorDetalle.lugarNacimiento?.latitud;
      this.longitud = autorDetalle.lugarNacimiento?.longitud;

      this.initMap();
    });
  }

  private initMap() {
    if (!this.latitud || !this.longitud) return;

    this.map = new Map('map').setView([this.latitud, this.longitud], 13);

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    marker([this.latitud, this.longitud]).addTo(this.map)
      .bindPopup('Lugar de nacimiento')
      .openPopup();
  }
}
