const menuPacientesButton = document.getElementById('menu-pacientes-toggle');
const menuMedicosButton = document.getElementById('menu-medicos-toggle');
const menuPacientes = document.getElementById('menu-pacientes');
const menuMedicos = document.getElementById('menu-medicos');

menuPacientesButton.addEventListener('click', (e) => {
    e.stopPropagation(); 
    menuPacientes.classList.toggle('show');
    if (menuMedicos.classList.contains('show')) {
        menuMedicos.classList.remove('show');
    }
});

menuMedicosButton.addEventListener('click', (e) => {
    e.stopPropagation(); 
    menuMedicos.classList.toggle('show');
    if (menuPacientes.classList.contains('show')) {
        menuPacientes.classList.remove('show');
    }
});

document.addEventListener('click', (e) => {
  
    if (!menuPacientes.contains(e.target) && !menuMedicos.contains(e.target) && 
        !menuPacientesButton.contains(e.target) && !menuMedicosButton.contains(e.target)) {
        menuPacientes.classList.remove('show');
        menuMedicos.classList.remove('show');
    }
});