let facturaAmodificar = null; 
let facturas = JSON.parse(localStorage.getItem('facturas')) || []; 
document.addEventListener('DOMContentLoaded', function() {
    mostrarFacturas();
});

document.getElementById('formularioFactura').addEventListener('submit', function(event) {
    event.preventDefault();  

    
    const monto = parseFloat(document.getElementById('monto').value);
    const metodoPago = document.getElementById('metodoPago').value;
    const estadoPago = document.getElementById('estadoPago').value;
    const concepto = document.getElementById('concepto').value;
    const descuento = parseFloat(document.getElementById('descuento').value) || 0;

    
    if (isNaN(monto) || monto <= 0 || !concepto) {
        alert("Monto y concepto son obligatorios.");
        return;
    }

    const idFactura = facturaAmodificar ? facturaAmodificar.idFactura : 'F' + Date.now();
    const fechaEmision = new Date().toLocaleDateString();  
    const montoFinal = monto - (monto * (descuento / 100)); 
    const fechaVencimiento = new Date();
    fechaVencimiento.setDate(fechaVencimiento.getDate() + 30);  
    const fechaVencimientoStr = fechaVencimiento.toLocaleDateString();

    const factura = {
        idFactura,
        monto: montoFinal.toFixed(2),
        fechaEmision,
        metodoPago,
        estadoPago,
        concepto,
        descuento: descuento.toFixed(2),
        fechaVencimiento: fechaVencimientoStr
    };

    if (facturaAmodificar) {
       
        const index = facturas.findIndex(f => f.idFactura === facturaAmodificar.idFactura);
        facturas[index] = factura; 

        
        facturaAmodificar.celdaMonto.textContent = `$${factura.monto}`;
        facturaAmodificar.celdaFechaEmision.textContent = factura.fechaEmision;
        facturaAmodificar.celdaMetodoPago.textContent = factura.metodoPago;
        facturaAmodificar.celdaEstadoPago.textContent = factura.estadoPago;
        facturaAmodificar.celdaConcepto.textContent = factura.concepto;
        facturaAmodificar.celdaDescuento.textContent = `${factura.descuento}%`;
        facturaAmodificar.celdaFechaVencimiento.textContent = factura.fechaVencimiento;

        facturaAmodificar = null;
    } else {
        
        facturas.push(factura);
    }

   
    localStorage.setItem('facturas', JSON.stringify(facturas));

    
    mostrarFacturas();
    document.getElementById('formularioFactura').reset();
    document.getElementById('mensajeExito').classList.remove('hidden');
    setTimeout(() => document.getElementById('mensajeExito').classList.add('hidden'), 3000);
});

function mostrarFacturas() {
    const tablaFacturas = document.getElementById('tablaFacturas').querySelector('tbody');
    tablaFacturas.innerHTML = ''; 
    facturas.forEach(factura => {
        const nuevaFila = document.createElement('tr');

        nuevaFila.innerHTML = `
            <td>${factura.idFactura}</td>
            <td>$${factura.monto}</td>
            <td>${factura.fechaEmision}</td>
            <td>${factura.metodoPago}</td>
            <td>${factura.estadoPago}</td>
            <td>${factura.concepto}</td>
            <td>${factura.descuento}%</td>
            <td>${factura.fechaVencimiento}</td>
            <td>
                <button class="modify" onclick="modificarFactura('${factura.idFactura}')">Modificar</button>
                <button class="delete" onclick="eliminarFactura('${factura.idFactura}')">Eliminar</button>
            </td>
        `;

        tablaFacturas.appendChild(nuevaFila);
    });

    
    document.getElementById('tablaFacturas').classList.remove('hidden');
}

function modificarFactura(idFactura) {
    
    facturaAmodificar = facturas.find(f => f.idFactura === idFactura);

    
    document.getElementById('monto').value = facturaAmodificar.monto;
    document.getElementById('metodoPago').value = facturaAmodificar.metodoPago;
    document.getElementById('estadoPago').value = facturaAmodificar.estadoPago;
    document.getElementById('concepto').value = facturaAmodificar.concepto;
    document.getElementById('descuento').value = facturaAmodificar.descuento;

    
    const boton = document.querySelector('button[type="submit"]');
    boton.textContent = "Actualizar";
}

function eliminarFactura(idFactura) {
    
    facturas = facturas.filter(f => f.idFactura !== idFactura);

    localStorage.setItem('facturas', JSON.stringify(facturas));

   
    mostrarFacturas();
}
