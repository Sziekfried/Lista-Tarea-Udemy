
import { QueHacer } from "./todo.class";

export class ListaQuehacer {
  constructor() {
    this.cargarLocalStorage();
  }

  nuevaTarea(tarea) {
    this.tareas.push(tarea);
    this.guardarLocalStorage();
  }

  eliminarTarea(id) {
    this.tareas = this.tareas.filter((tarea) => tarea.id != id);
    this.guardarLocalStorage();
  }

  marcarHecho(id) {
    for (const tarea of this.tareas) {
      if (tarea.id == id) {
        tarea.completado = !tarea.completado;
        break;
      }
    }
    this.guardarLocalStorage()
  }

  eliminarHechos() {
    this.tareas = this.tareas.filter((tarea) => !tarea.completado);
    this.guardarLocalStorage();
  }

  guardarLocalStorage() {
    localStorage.setItem("tarea", JSON.stringify(this.tareas));
  }

  cargarLocalStorage() {
    this.tareas = localStorage.getItem("tarea")
      ? JSON.parse(localStorage.getItem("tarea"))
      : [];

    this.tareas = this.tareas.map(QueHacer.desdeJSON)
  }
}
