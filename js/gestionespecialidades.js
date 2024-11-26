const especialidadesPredeterminadas = [
    {
        id: 1,
        nombre: "Cardiología",
        descripcion: "Especialidad que se ocupa de las enfermedades del corazón.",
        estado: "activa",
        fechaCreacion: new Date().toISOString(),
    },
    {
        id: 2,
        nombre: "Pediatría",
        descripcion: "Especialidad médica dedicada a la salud infantil.",
        estado: "activa",
        fechaCreacion: new Date().toISOString(),
    },
    {
        id: 3,
        nombre: "Neurología",
        descripcion: "Especialidad médica que se ocupa del sistema nervioso.",
        estado: "activa",
        fechaCreacion: new Date().toISOString(),
    },
    {
        id: 4,
        nombre: "Oncología",
        descripcion: "Especialidad médica dedicada al diagnóstico y tratamiento del cáncer.",
        estado: "activa",
        fechaCreacion: new Date().toISOString(),
    },
    {
        id: 5,
        nombre: "Dermatología",
        descripcion: "Especialidad médica que se ocupa de las enfermedades de la piel.",
        estado: "activa",
        fechaCreacion: new Date().toISOString(),
    },
    {
        id: 6,
        nombre: "Oftalmología",
        descripcion: "Especialidad médica dedicada al estudio y tratamiento de los ojos.",
        estado: "activa",
        fechaCreacion: new Date().toISOString(),
    }
];

let especialidades = JSON.parse(localStorage.getItem('especialidades')) || especialidadesPredeterminadas;

function actualizarListaEspecialidades() {
    const tabla = document.getElementById('tablaEspecialidades').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ''; 

    especialidades.forEach((especialidad, index) => {
        const fila = tabla.insertRow();
        fila.insertCell(0).textContent = especialidad.nombre;
        fila.insertCell(1).textContent = especialidad.descripcion || 'N/A';
        fila.insertCell(2).textContent = especialidad.estado;

        const acciones = fila.insertCell(3);
        
        
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('delete');
        botonEliminar.onclick = () => eliminarEspecialidad(index);
        acciones.appendChild(botonEliminar);

     
        const botonActualizar = document.createElement('button');
        botonActualizar.textContent = 'Actualizar';
        botonActualizar.classList.add('update');
        botonActualizar.onclick = () => actualizarEspecialidad(index);
        acciones.appendChild(botonActualizar);
    });
}

function validarFormulario(event) {
    event.preventDefault();

    
    const nombreEspecialidad = document.getElementById('nombreEspecialidad').value;
    const descripcion = document.getElementById('descripcion').value;
    const estado = document.getElementById('estado').value;

    
    if (!nombreEspecialidad || !estado) {
        alert('Todos los campos obligatorios deben ser completados.');
        return false;
    }

    const especialidad = {
        id: Date.now(),  
        nombre: nombreEspecialidad,
        descripcion,
        estado,
        fechaCreacion: new Date().toISOString(),
    };

    
    especialidades.push(especialidad);
    localStorage.setItem('especialidades', JSON.stringify(especialidades));

    
    document.getElementById('mensajeExito').classList.remove('hidden');
    document.getElementById('registroEspecialidad').reset();
    actualizarListaEspecialidades();

    return false;
}

function eliminarEspecialidad(index) {
    especialidades.splice(index, 1);
    localStorage.setItem('especialidades', JSON.stringify(especialidades));
    actualizarListaEspecialidades();
}

function actualizarEspecialidad(index) {
    const especialidad = especialidades[index];
    document.getElementById('nombreEspecialidad').value = especialidad.nombre;
    document.getElementById('descripcion').value = especialidad.descripcion;
    document.getElementById('estado').value = especialidad.estado;

   
    eliminarEspecialidad(index);
}

actualizarListaEspecialidades();
