
import './styles.css';

import { QueHacer,ListaQuehacer } from './classes';
import { crearQuehacerHtml } from './js/componentes';


export const listaTareas = new ListaQuehacer();

listaTareas.tareas.forEach(tarea => crearQuehacerHtml(tarea));
console.log('Tareas:', listaTareas.tareas);