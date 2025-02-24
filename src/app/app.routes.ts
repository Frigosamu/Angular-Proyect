import { Routes } from '@angular/router';
import { EntradaComponent } from './component/entrada/entrada.component';
import { CrearAutorComponent } from './component/autor/crear-autor/crear-autor.component';
import { ListaAutoresComponent } from './component/autor/lista-autores/lista-autores.component';
import { CrearLibroComponent } from './component/libro/crear-libro/crear-libro.component';
import { ListaLibrosComponent } from './component/libro/lista-libros/lista-libros.component';
import { EditarAutorComponent } from './component/autor/editar-autor/editar-autor.component';
import { EditarLibroComponent } from './component/libro/editar-libro/editar-libro.component';

export const routes: Routes = [
    { path: '', component: EntradaComponent},

    //autores
    { path: 'crear-autor', component: CrearAutorComponent },
    { path: 'editar-autor/:id', component: EditarAutorComponent },
    { path: 'listar-autores', component: ListaAutoresComponent },

    //libros
    { path: 'crear-libro', component: CrearLibroComponent },
    { path: 'editar-libro/:id', component: EditarLibroComponent },
    { path: 'listar-libros', component: ListaLibrosComponent }
];
