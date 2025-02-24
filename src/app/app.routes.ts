import { Routes } from '@angular/router';
import { EntradaComponent } from './component/entrada/entrada.component';
import { CrearAutorComponent } from './component/autor/crear-autor/crear-autor.component';
import { ListaAutoresComponent } from './component/autor/lista-autores/lista-autores.component';
import { CrearLibroComponent } from './component/libro/crear-libro/crear-libro.component';
import { ListaLibrosComponent } from './component/libro/lista-libros/lista-libros.component';

export const routes: Routes = [
    { path: '', component: EntradaComponent},

    //autores
    { path: 'crear-autor', component: CrearAutorComponent },
    { path: 'editar-autor/:id', component: CrearAutorComponent },
    { path: 'listar-autores', component: ListaAutoresComponent },

    //libros
    { path: 'crear-libro', component: CrearLibroComponent },
    { path: 'editar-libro/:id', component: CrearLibroComponent },
    { path: 'listar-libros', component: ListaLibrosComponent }
];
