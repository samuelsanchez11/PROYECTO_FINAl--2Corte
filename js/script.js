let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

document.addEventListener('DOMContentLoaded', function () {
    const fechaHoy = new Date().toISOString().split('T')[0];
    document.getElementById('fechaNacimiento').setAttribute('max', fechaHoy);
    actualizarListaPacientes();
});

function actualizarListaPacientes() {
    const tabla = document.getElementById('tablaPacientes').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ''; 

    pacientes.forEach((paciente, index) => {
        const fila = tabla.insertRow();
        fila.insertCell(0).textContent = paciente.nombre;
        fila.insertCell(1).textContent = paciente.identificacion;
        fila.insertCell(2).textContent = paciente.telefono;
        fila.insertCell(3).textContent = paciente.estado;

        const acciones = fila.insertCell(4);
        
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('delete');
        botonEliminar.onclick = () => eliminarPaciente(index);
        acciones.appendChild(botonEliminar);

        const botonActualizar = document.createElement('button');
        botonActualizar.textContent = 'Actualizar';
        botonActualizar.classList.add('update');
        botonActualizar.onclick = () => actualizarPaciente(index);
        acciones.appendChild(botonActualizar);
    });
}

function validarFormulario(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const identificacion = document.getElementById('identificacion').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const telefono = document.getElementById('telefono').value;
    const estado = document.getElementById('estado').value;
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    document.getElementById('errorFechaNacimiento').textContent = '';

    if (!nombre || !identificacion || !fechaNacimiento || !telefono || !estado || !usuario || !contrasena) {
        alert('Todos los campos obligatorios deben ser completados.');
        return false;
    }

    const fechaHoyObj = new Date();
    const fechaNacimientoObj = new Date(fechaNacimiento);

    if (fechaNacimientoObj >= fechaHoyObj) {
    
        document.getElementById('errorFechaNacimiento').textContent = 'La fecha de nacimiento debe ser una fecha pasada.';
        return false;
    }

   
    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(telefono)) {
        alert('El número de teléfono debe tener 10 dígitos.');
        return false;
    }

  
    if (pacientes.some(p => p.identificacion === identificacion)) {
        alert('El número de identificación ya está registrado.');
        return false;
    }

    
    const fechaRegistro = new Date().toLocaleDateString();

   
    const paciente = {
        nombre,
        identificacion,
        fechaNacimiento,
        direccion: document.getElementById('direccion').value,
        telefono,
        email: document.getElementById('email').value,
        estado,
        usuario,
        contrasena,
        fechaRegistro,
        perfil: "Paciente" 
    };
    
    pacientes.push(paciente);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));

    document.getElementById('mensajeExito').classList.remove('hidden');
    document.getElementById('registroPaciente').reset();
    actualizarListaPacientes();

    return false;
}

function eliminarPaciente(index) {
    pacientes.splice(index, 1);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
    actualizarListaPacientes();
}

function actualizarPaciente(index) {
    const paciente = pacientes[index];
    document.getElementById('nombre').value = paciente.nombre;
    document.getElementById('identificacion').value = paciente.identificacion;
    document.getElementById('fechaNacimiento').value = paciente.fechaNacimiento;
    document.getElementById('direccion').value = paciente.direccion;
    document.getElementById('telefono').value = paciente.telefono;
    document.getElementById('email').value = paciente.email;
    document.getElementById('estado').value = paciente.estado;
    document.getElementById('usuario').value = paciente.usuario;
    document.getElementById('contrasena').value = paciente.contrasena;
}
