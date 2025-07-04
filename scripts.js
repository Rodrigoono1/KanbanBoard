const estados = [
    {nombre: "ToDo",
     posicion: 0},
    {nombre: "In Progress",
     posicion: 1},
    {nombre: "Done",
     posicion: 2}
];

document.addEventListener
    ("DOMContentLoaded", function () {
        renderBoards();
        renderTasks();
    });

function renderBoards(){
    const tablero=document.getElementById("tablero")
    estados.forEach(estado=>{
        const col = document.createElement("div");
        col.className="column";
        col.id=estado.nombre;

        const title= document.createElement("h3");
        title.className="title";
        
        const titleText = document.createTextNode(estado.nombre);
        
        const taskContainer = document.createElement("div");
        taskContainer.classList="taks-container";
        
        title.appendChild(titleText);
        col.appendChild(title);
        col.appendChild(taskContainer);
        tablero.appendChild(col);
    });

    const newStatus = document.createElement("button");
    newStatus.className="column";
    newStatus.textContent="Add new status";

    tablero.appendChild(newStatus);
}
function renderTasks(){
    estados.forEach(estado=>{
        console.log(estado.posicion);
        const col = document.getElementById(estado.nombre)
        if (estado.posicion==0){
            const nuevo = document.createElement("button");
            nuevo.className= "column title";
            nuevo.textContent="Add new task";
            col.appendChild(nuevo);
        }
    })
}