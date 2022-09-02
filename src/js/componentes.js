import {QueHacer} from '../classes'
import { listaTareas } from '..';

// Referencias HTML
const divListaTareas = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrarCompletados = document.querySelector('.clear-completed')
const listaFiltros = document.querySelector('.filters')
const filtritos = document.querySelectorAll('.filtro');

export const crearQuehacerHtml = ( tarea ) => {
   const htmlTarea =`<li class="${(tarea.completado) ? 'completed' : ''}" data-id="${tarea.id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${(tarea.completado)?'checked':''}>
							<label>${tarea.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>`
   const div = document.createElement('div');
   div.innerHTML = htmlTarea;


   divListaTareas.append(div.firstElementChild);
   return div.firstElementChild;

}


//-- Eventos:
txtInput.addEventListener('keyup',(event)=>{
   if (event.keyCode === 13 && txtInput.value.length > 0){
      const nuevaTarea = new QueHacer(txtInput.value);
      listaTareas.nuevaTarea(nuevaTarea);
      crearQuehacerHtml(nuevaTarea);
      txtInput.value= '';
   }
})

divListaTareas.addEventListener('click',(event)=>{
   const nombreElemento = event.target.localName; //* Input, label, o button
   const tareaElemento = event.target.parentElement.parentElement;
   const idTarea = tareaElemento.getAttribute('data-id');

   if (nombreElemento.includes('input')){ //*Click en el Check
      listaTareas.marcarHecho(idTarea);
      tareaElemento.classList.toggle('completed')
   } else if(nombreElemento.includes('button')){ //-- click en borrar
      listaTareas.eliminarTarea(idTarea);
      divListaTareas.removeChild(tareaElemento);
   }
})

btnBorrarCompletados.addEventListener('click',()=>{
   listaTareas.eliminarHechos();
   for(let i = divListaTareas.children.length-1;i>=0;i--){
      const tareaActual = divListaTareas.children[i];
      if (tareaActual.classList.contains('completed')){
         divListaTareas.removeChild(tareaActual);
      }
   }
})

listaFiltros.addEventListener('click',(event)=> {
   const filtro =event.target.text;
   if (!filtro){return;}

   filtritos.forEach(filtro =>{
      filtro.classList.remove('selected');
   })
   event.target.classList.add('selected')
   for( const tarea of divListaTareas.children){
      tarea.classList.remove('hidden');
      const hecho = tarea.classList.contains('completed');
      switch (filtro){
         case 'Pendientes':
            if (hecho){
               tarea.classList.add('hidden');
            }
            break;
         case 'Completados':
            if (!hecho){
               tarea.classList.add('hidden');
            }
            break;
      }

   }  
})