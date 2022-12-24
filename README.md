# Sabrina Ongarato TP api json (express, postgresql, node)
## Realizar una json api usando Express.

La API que se creará debe ser para un todo list.

La API debe poder:

1.- Crear una tarea

2.- Obtener todas las tareas

3.- Actualizar el status de una tarea. (complete: false/true)

En este punto debes considerar que el update solo permite actualizar la propiedad estatus, no el nombre, no la descripción de una tarea.

4.- Eliminar una tarea

Una tarea tiene el siguiente formato:

{
	id: number, // el id para identificar a la tarea
	title: string, // el titulo de la tarea
	description: string, // la descripción de la tarea 
	status: boolean, // el status de la tarea si esta completada o no 
}
Usa las siguientes rutas (endpoints) para cada petición:

GET —> ‘/tasks’
POST —> ‘/tasks’
PUT —> ‘/tasks’
DELETE —> ‘tasks’
Recuerda mandar por el body el id de la tarea para poder completar el update y el delete.