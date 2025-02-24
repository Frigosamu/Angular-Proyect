import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AutorService } from '../../services/autor.service';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
}
 