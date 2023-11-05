
        const ContainerTabla = document.getElementById("Tabla");
        const getTareas = () => {
            fetch("http://localhost:3000/Get")
                .then((res) => res.json())
                .then((tareas) => {
                    tareas.map((tarea) => {
                        const id = tarea.id;
                        return (ContainerTabla.innerHTML += `
                <tr>
                    <th scope="row">${tarea.id}</th>
                    <td>${tarea.nombre}</td>
                    <td>${tarea.estado}</td>
                    <td> <button class="btn btn-danger" data-id="${tarea.id}"> Eliminar</button></td>
                    <td> <button class="btn btn-primary" type="submit"> Actualizar</button></td>
                </tr>
                `);
                    });
                });
        };
        getTareas();

        async function Guardar() {
            const formData = new FormData(document.getElementById("Formulario"));
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
        
            const response = await fetch('http://localhost:3000/Post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        
            if (!response.ok) {
                console.error('Error al enviar los datos');
            } else {
                location.reload(); 
            }
        }


     document.getElementById("Tabla").addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-danger")) {
        const id = event.target.getAttribute("data-id");
        eliminarTarea(id);
        location.reload(); 
    }
}   );

function eliminarTarea(id) {
    fetch(`http://localhost:3000/Eliminar/${id}`, {
        method: "DELETE",
    })
    .then((res) => {
        if (res.ok) {
           
            getTareas();
        } else {
            console.error("Error al eliminar la tarea.");
        }
    })
    .catch((error) => {
        console.error("Error al eliminar la tarea:", error);
    });
}


        
