const esPersonalMedico = true;

let historiales = JSON.parse(localStorage.getItem('historiales')) || [];

document.addEventListener('DOMContentLoaded', function() {
    mostrarHistoriales();
});

document.getElementById('formularioHistorial').addEventListener('submit', function(event) {
    event.preventDefault();

    if (!esPersonalMedico) {
        alert("Solo el personal médico tiene acceso a esta sección.");
        return;
    }

    const fechaConsulta = document.getElementById('fechaConsulta').value;
    const diagnostico = document.getElementById('diagnostico').value;
    const tratamiento = document.getElementById('tratamiento').value;
    const notas = document.getElementById('notas').value;
    const adjunto = document.getElementById('adjunto').files[0];

    const idHistorial = 'HM' + Date.now();

    if (!fechaConsulta || !diagnostico) {
        alert("Fecha de consulta y diagnóstico son obligatorios.");
        return;
    }

    const historial = {
        idHistorial,
        fechaConsulta,
        diagnostico,
        tratamiento: tratamiento || 'No especificado',
        notas: notas || 'No especificado',
        adjunto: adjunto ? adjunto.name : 'No adjunto'
    };

    
    historiales.push(historial);

    
    localStorage.setItem('historiales', JSON.stringify(historiales));

  
    mostrarHistoriales();
    document.getElementById('mensajeExito').classList.remove('hidden');
    setTimeout(() => document.getElementById('mensajeExito').classList.add('hidden'), 3000);

    
    document.getElementById('formularioHistorial').reset();
});

function mostrarHistoriales() {
    const tablaHistoriales = document.getElementById('tablaHistoriales').querySelector('tbody');
    tablaHistoriales.innerHTML = '';

    historiales.forEach(historial => {
        const nuevaFila = document.createElement('tr');

        nuevaFila.innerHTML = `
            <td>${historial.idHistorial}</td>
            <td>${historial.fechaConsulta}</td>
            <td>${historial.diagnostico}</td>
            <td>${historial.tratamiento}</td>
            <td>${historial.notas}</td>
            <td>${historial.adjunto}</td>
            <td>
                <button class="modify" onclick="modificarHistorial('${historial.idHistorial}')">Modificar</button>
                <button class="delete" onclick="eliminarHistorial('${historial.idHistorial}')">Eliminar</button>
            </td>
        `;

        tablaHistoriales.appendChild(nuevaFila);
    });

   
    if (historiales.length > 0) {
        document.getElementById('tablaHistoriales').classList.remove('hidden');
    }
}

function modificarHistorial(idHistorial) {
    const historial = historiales.find(h => h.idHistorial === idHistorial);
    if (!historial) return;

    
    document.getElementById('fechaConsulta').value = historial.fechaConsulta;
    document.getElementById('diagnostico').value = historial.diagnostico;
    document.getElementById('tratamiento').value = historial.tratamiento;
    document.getElementById('notas').value = historial.notas;

    const boton = document.querySelector('button[type="submit"]');
    boton.textContent = "Actualizar";
    
    
    document.getElementById('formularioHistorial').onsubmit = function(event) {
        event.preventDefault();

       
        historial.fechaConsulta = document.getElementById('fechaConsulta').value;
        historial.diagnostico = document.getElementById('diagnostico').value;
        historial.tratamiento = document.getElementById('tratamiento').value || 'No especificado';
        historial.notas = document.getElementById('notas').value || 'No especificado';
        
      
        localStorage.setItem('historiales', JSON.stringify(historiales));

        
        mostrarHistoriales();

        document.getElementById('formularioHistorial').reset();
        document.querySelector('button[type="submit"]').textContent = "Guardar Historial Médico";
    };
}

function eliminarHistorial(idHistorial) {
  
    historiales = historiales.filter(h => h.idHistorial !== idHistorial);

   
    localStorage.setItem('historiales', JSON.stringify(historiales));

    mostrarHistoriales();
}
