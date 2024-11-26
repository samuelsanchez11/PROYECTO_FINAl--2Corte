let mensajes = []; 
let mensajeAmodificar = null;  

document.getElementById('formularioMensaje').addEventListener('submit', function(event) {
    event.preventDefault();

    const remitente = document.getElementById('remitente').value;
    const destinatario = document.getElementById('destinatario').value;
    const contenido = document.getElementById('contenido').value;
    const estado = document.getElementById('estado').value;

    
    if (!remitente || !destinatario || !contenido) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const idMensaje = mensajeAmodificar ? mensajeAmodificar.idMensaje : 'M' + Date.now();
    const fechaHora = new Date().toLocaleString();

   
    if (mensajeAmodificar) {
        
        mensajeAmodificar.celdaRemitente.textContent = remitente;
        mensajeAmodificar.celdaDestinatario.textContent = destinatario;
        mensajeAmodificar.celdaFechaHora.textContent = fechaHora;
        mensajeAmodificar.celdaContenido.textContent = contenido;
        mensajeAmodificar.celdaEstado.textContent = estado;

        const mensajeIndex = mensajes.findIndex(m => m.idMensaje === mensajeAmodificar.idMensaje);
        if (mensajeIndex !== -1) {
            
            mensajes[mensajeIndex] = {
                idMensaje: mensajeAmodificar.idMensaje,
                remitente,
                destinatario,
                fechaHora,
                contenido,
                estado
            };
        }

        
        mensajeAmodificar = null;
    } else {
        
        const nuevaFila = document.createElement('tr');

        const celdaID = document.createElement('td');
        celdaID.textContent = idMensaje;
        nuevaFila.appendChild(celdaID);

        const celdaRemitente = document.createElement('td');
        celdaRemitente.textContent = remitente;
        nuevaFila.appendChild(celdaRemitente);

        const celdaDestinatario = document.createElement('td');
        celdaDestinatario.textContent = destinatario;
        nuevaFila.appendChild(celdaDestinatario);

        const celdaFechaHora = document.createElement('td');
        celdaFechaHora.textContent = fechaHora;
        nuevaFila.appendChild(celdaFechaHora);

        const celdaContenido = document.createElement('td');
        celdaContenido.textContent = contenido;
        nuevaFila.appendChild(celdaContenido);

        const celdaEstado = document.createElement('td');
        celdaEstado.textContent = estado;
        nuevaFila.appendChild(celdaEstado);

        
        const celdaAcciones = document.createElement('td');
        const btnModificar = document.createElement('button');
        btnModificar.textContent = 'Modificar';
        btnModificar.classList.add('modify');
        btnModificar.onclick = () => modificarMensaje(nuevaFila, idMensaje);

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add('delete');
        btnEliminar.onclick = () => eliminarMensaje(nuevaFila, idMensaje);

        celdaAcciones.appendChild(btnModificar);
        celdaAcciones.appendChild(btnEliminar);
        nuevaFila.appendChild(celdaAcciones);

        
        const tablaMensajes = document.getElementById('tablaMensajes').querySelector('tbody');
        tablaMensajes.appendChild(nuevaFila);

        mensajes.push({
            idMensaje,
            remitente,
            destinatario,
            fechaHora,
            contenido,
            estado
        });
    }

    
    document.getElementById('tablaMensajes').classList.remove('hidden');
    document.getElementById('mensajeExito').classList.remove('hidden');
    setTimeout(() => document.getElementById('mensajeExito').classList.add('hidden'), 3000);

    
    document.getElementById('formularioMensaje').reset();
});

function modificarMensaje(fila, idMensaje) {
    
    const mensaje = mensajes.find(m => m.idMensaje === idMensaje);
    if (!mensaje) return;

    mensajeAmodificar = {
        idMensaje,
        fila,
        celdaRemitente: fila.children[1],
        celdaDestinatario: fila.children[2],
        celdaFechaHora: fila.children[3],
        celdaContenido: fila.children[4],
        celdaEstado: fila.children[5]
    };

    document.getElementById('remitente').value = mensaje.celdaRemitente.textContent;
    document.getElementById('destinatario').value = mensaje.celdaDestinatario.textContent;
    document.getElementById('contenido').value = mensaje.celdaContenido.textContent;
    document.getElementById('estado').value = mensaje.celdaEstado.textContent;

   
    const boton = document.querySelector('button[type="submit"]');
    boton.textContent = "Actualizar";
}

function eliminarMensaje(fila, idMensaje) {
    
    mensajes = mensajes.filter(m => m.idMensaje !== idMensaje);

    fila.remove();
}
