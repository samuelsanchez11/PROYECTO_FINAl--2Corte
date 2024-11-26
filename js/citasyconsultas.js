let citas = [];  
let citaAmodificar = null;  

document.getElementById('formularioCita').addEventListener('submit', function(event) {
    event.preventDefault();

    const fechaHora = document.getElementById('fechaHora').value;
    const especialidad = document.getElementById('especialidad').value;
    const medico = document.getElementById('medico').value;
    const estadoCita = document.getElementById('estadoCita').value;
    const motivoConsulta = document.getElementById('motivoConsulta').value;

    const fecha = new Date(fechaHora);
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();

   
    const horaAtencionInicio = 8;
    const horaAtencionFin = 18;

    const fechaActual = new Date();
    if (fecha < fechaActual) {
        alert("No se puede agendar una cita en el pasado.");
        return;
    }

    if (hora < horaAtencionInicio || hora >= horaAtencionFin || (hora === horaAtencionFin && minutos > 0)) {
        alert("Las citas solo pueden ser agendadas entre las 08:00 AM y las 06:00 PM.");
        return;
    }

   
    const nuevaFila = document.createElement('tr');

    const celdaFecha = document.createElement('td');
    celdaFecha.textContent = fecha.toLocaleString();
    nuevaFila.appendChild(celdaFecha);

    const celdaEspecialidad = document.createElement('td');
    celdaEspecialidad.textContent = especialidad;
    nuevaFila.appendChild(celdaEspecialidad);

    const celdaMedico = document.createElement('td');
    celdaMedico.textContent = medico;
    nuevaFila.appendChild(celdaMedico);

    const celdaEstado = document.createElement('td');
    celdaEstado.textContent = estadoCita;
    nuevaFila.appendChild(celdaEstado);

    const celdaMotivo = document.createElement('td');
    celdaMotivo.textContent = motivoConsulta || 'No especificado';
    nuevaFila.appendChild(celdaMotivo);

   
    const celdaAcciones = document.createElement('td');
    const btnModificar = document.createElement('button');
    btnModificar.textContent = 'Modificar';
    btnModificar.classList.add('modify');
    btnModificar.onclick = () => modificarCita(nuevaFila);

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.classList.add('delete');
    btnEliminar.onclick = () => eliminarCita(nuevaFila);

    celdaAcciones.appendChild(btnModificar);
    celdaAcciones.appendChild(btnEliminar);
    nuevaFila.appendChild(celdaAcciones);

    
    const tabla = document.getElementById('tablaCitas').getElementsByTagName('tbody')[0];
    tabla.appendChild(nuevaFila);

  
    const nuevaCita = {
        fechaHora,
        especialidad,
        medico,
        estadoCita,
        motivoConsulta
    };
    citas.push(nuevaCita);

    
    document.getElementById('mensajeExito').classList.remove('hidden');
    document.getElementById('tablaCitas').classList.remove('hidden');

    document.getElementById('formularioCita').reset();
});

function modificarCita(fila) {
    const celdas = fila.getElementsByTagName('td');
    const fecha = new Date(celdas[0].textContent);
    const especialidad = celdas[1].textContent;
    const medico = celdas[2].textContent;
    const estado = celdas[3].textContent;
    const motivo = celdas[4].textContent;

    
    document.getElementById('fechaHora').value = fecha.toISOString().slice(0, 16);
    document.getElementById('especialidad').value = especialidad;
    document.getElementById('medico').value = medico;
    document.getElementById('estadoCita').value = estado;
    document.getElementById('motivoConsulta').value = motivo;

    
    citaAmodificar = fila;
}

function eliminarCita(fila) {
    
    const index = Array.from(fila.parentNode.children).indexOf(fila);
    citas.splice(index, 1);

   
    fila.remove();
}
