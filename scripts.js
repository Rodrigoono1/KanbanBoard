const estados = [
    {nombre: "ToDo",
     posicion: 0},
    {nombre: "In Progress",
     posicion: 1},
    {nombre: "Done",
     posicion: 2}
];

const tablero=document.getElementById("tablero");

document.addEventListener
    ("DOMContentLoaded", function () {
        renderBoards();
        renderTasks();
    });

function renderBoards(){
    estados.forEach(estado=>{
		//Crear columnas iniciales
        const col = CrearNuevoEstado(estado.nombre);
        tablero.appendChild(col);
    });

	//boton para crear nuevos estados
    const newStatus = CrearBoton("newStatus","Add new status");
    tablero.appendChild(newStatus);
	
	//evento para el boton crear estados
    newStatus.addEventListener("click", function() {
        const newColumn = CrearNuevoEstado("Nuevo estado");
		
        tablero.insertBefore(newColumn,newStatus);
    });
}
function renderTasks(){
    estados.forEach(estado=>{
        const taskContainer = document.getElementById(estado.nombre).getElementsByClassName("task-container")[0];
		// Permitir drop en la columna
        taskContainer.addEventListener("dragover", function (e) {
            e.preventDefault();
        });

        taskContainer.addEventListener("drop", function (e) {
            e.preventDefault();
            const id = e.dataTransfer.getData("text/plain");
            const dragged = document.getElementById(id);
            if (dragged && !dragged.classList.contains("button")) {
                taskContainer.appendChild(dragged);
            }
        });
		
		
        if (estado.posicion==0){
			//Boton para crear nueva tarea
            const nuevo = CrearBoton("new-task", "Add new task");
            taskContainer.appendChild(nuevo);
			
			nuevo.addEventListener("click", function () {
                const task = document.createElement("div");
                task.className = "task";
				const idUnico = Date.now();
                task.innerText = "* Tarea " + idUnico;                
                task.id = idUnico;
                task.setAttribute("draggable", "true");

                // Eventos de drag
                task.addEventListener("dragstart", function (e) {
                    e.dataTransfer.setData("text/plain", e.target.id);
                    e.target.style.opacity = "0.5";
                });

                task.addEventListener("dragend", function (e) {
                    e.target.style.opacity = "1";
                });

                taskContainer.insertBefore(task, nuevo);
            });
        }
    })
}

function CrearNuevoEstado(nombre){
	const col = document.createElement("div");
	const title = document.createElement("h3");
	const titleText = document.createTextNode(nombre);
	const taskContainer = document.createElement("div");
	// Permitir drop en la columna
        taskContainer.addEventListener("dragover", function (e) {
            e.preventDefault();
        });

        taskContainer.addEventListener("drop", function (e) {
            e.preventDefault();
            const id = e.dataTransfer.getData("text/plain");
            const dragged = document.getElementById(id);
            if (dragged && !dragged.classList.contains("button")) {
                taskContainer.appendChild(dragged);
            }
        });
		
	col.className = "column";
	col.id = nombre;
	title.className = "title";
	taskContainer.classList = "task-container";
	title.appendChild(titleText);
	col.appendChild(title);
	col.appendChild(taskContainer);
	col.setAttribute("draggable", "true");

	return col;
}

function CrearBoton(id, nombre){
	const newButton = document.createElement("button");
    newButton.className="button";
    newButton.textContent=nombre;
    newButton.id=id;
	
	return newButton;
}

