// Array para almacenar empleados
let empleadosarts = [];

// Función para guardar empleados en localStorage
function guardarEmpleadosEnLocalStorage() {
  try {
    const empleadosJson = JSON.stringify(empleadosarts);
    localStorage.setItem('empleados', empleadosJson);
  } catch (error) {
    console.error('Error al guardar empleados en localStorage:', error);
  }
}

// Función para recuperar empleados desde localStorage
function recuperarEmpleadosDeLocalStorage() {
  try {
    const empleadosJson = localStorage.getItem('empleados');
    if (empleadosJson) {
      empleadosarts = JSON.parse(empleadosJson);
    } else {
      empleadosarts = [];
    }
  } catch (error) {
    console.error('Error al recuperar empleados desde localStorage:', error);
    empleadosarts = [];
  }
}

// Llamada para recuperar empleados al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  recuperarEmpleadosDeLocalStorage();
});

// Calcular cotización por cantidad de empleados y riesgo de la actividad
const calcularButton = document.getElementById('calcularButton');
calcularButton.addEventListener('click', function() {
  const numEmpleados = parseInt(document.getElementById('empleados').value);
  const factorRiesgo = parseFloat(document.getElementById('riesgo').value);

  // Comparar numEmpleados con la cantidad de empleados en localStorage
  if (empleadosarts.length !== numEmpleados) {
    // Mostrar Sweetalert indicando la diferencia
    Swal.fire({
      icon: 'warning',
      title: 'Atención',
      text: `Se informa la cotización a continuación, pero la cantidad de empleados con datos cargados (${empleadosarts.length}) difiere de la cantidad ingresada para dicha cotización (${numEmpleados}).`,
      confirmButtonText: 'Entendido'
    });
  }

  const cotizacion = calcularCotizacion(numEmpleados, factorRiesgo);

  const resultadoElement = document.getElementById('resultado');
  resultadoElement.textContent = `La cotización mensual es: $${cotizacion.toFixed(2)}`;
});

function calcularCotizacion(numEmpleados, factorRiesgo) {
  const costoBasePorEmpleado = 1000; // Costo base por cada empleado
  const porcentajeFactorRiesgo = factorRiesgo / 100;
  const costoTotal = numEmpleados * costoBasePorEmpleado * (1 + porcentajeFactorRiesgo);
  return costoTotal;
}

document.getElementById('cargarEmpleadoButton').addEventListener('click', function() {
  // Obtener los valores de los campos del formulario
  const cargarNombre = document.getElementById('nombre').value;
  const cargarCuit = document.getElementById('cuit').value.trim();
  const cargarEdad = document.getElementById('edad').value.trim();
  const cargarOcupacion = document.getElementById('ocupacion').value;

  // Validar que cargarCuit y cargarEdad sean números válidos y no negativos
  if (!esNumeroValido(cargarCuit) || parseInt(cargarCuit, 10) < 0) {
    mostrarError('El CUIT debe ser un número válido y no puede ser negativo.');
    return;
  }

  if (!esNumeroValido(cargarEdad) || parseInt(cargarEdad, 10) < 0) {
    mostrarError('La edad debe ser un número válido y no puede ser negativa.');
    return;
  }

  // Convertir los valores a números enteros
  const cuitNumero = parseInt(cargarCuit, 10);
  const edadNumero = parseInt(cargarEdad, 10);

  // Crear un nuevo objeto Empleado con los valores obtenidos
  const empleado = new Empleado(cargarNombre, cuitNumero, edadNumero, cargarOcupacion);

  // Agregar el nuevo empleado al arreglo empleadosarts
  empleadosarts.push(empleado);

  // Guardar empleados en localStorage después de agregar uno nuevo
  guardarEmpleadosEnLocalStorage();

  // Limpiar los campos del formulario después de cargar el empleado
  document.getElementById('nombre').value = '';
  document.getElementById('cuit').value = '';
  document.getElementById('edad').value = '';
  document.getElementById('ocupacion').value = '';

  // Llamar a una función para actualizar la lista de empleados en la interfaz
  actualizarListaEmpleados();

  // Mostrar mensaje de éxito con SweetAlert
  Swal.fire({
    icon: 'success',
    title: 'Empleado Cargado',
    text: 'El empleado ha sido cargado correctamente.',
    confirmButtonText: 'Aceptar'
  });
});

// Función auxiliar para verificar si un valor es un número válido
function esNumeroValido(valor) {
  // Verifica que el valor contenga solo dígitos
  return /^\d+$/.test(valor);
}

// Función para mostrar mensajes de error en la interfaz
function mostrarError(mensaje) {
  const errorDiv = document.getElementById('errorDiv');
  errorDiv.textContent = mensaje;
  // Mostrar el div de error
  errorDiv.style.display = 'block';
  // Configuro un setTimeout
  setTimeout(() => {
    errorDiv.textContent = '';
    // Ocultar el div de error después de 3 segundos, 3000 milisegundos
    errorDiv.style.display = 'none';
  }, 3000);
}

// Función para actualizar la lista de empleados en el DOM
function actualizarListaEmpleados() {
  const empleadosContainer = document.getElementById('empleadosContainer');
  empleadosContainer.innerHTML = '';

  empleadosarts.forEach((empleado, index) => {
    const empleadoDiv = document.createElement('div');
    empleadoDiv.classList.add('empleado');
    empleadoDiv.innerHTML = `
      <p><strong>Empleado ${index + 1}</strong></p>
      <p><strong>Nombre:</strong> ${empleado.nombre}</p>
      <p><strong>CUIT/CUIL:</strong> ${empleado.cuit}</p>
      <p><strong>Edad:</strong> ${empleado.edad}</p>
      <p><strong>Ocupación:</strong> ${empleado.ocupacion}</p>
      <button class="eliminarEmpleadoBtn" data-index="${index}">Eliminar Empleado</button>
    `;
    empleadosContainer.appendChild(empleadoDiv);
  });

  // Agregar event listeners a los botones de eliminar
  const eliminarEmpleadoBtns = document.querySelectorAll('.eliminarEmpleadoBtn');
  eliminarEmpleadoBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const index = parseInt(btn.getAttribute('data-index'));
      eliminarEmpleado(index);
    });
  });
}

// Función para que el usuario pueda eliminar los empleados cargados, actualizando el LocalStorage y volviendo a renderizar la lista de empleados
function eliminarEmpleado(index) {
  if (index >= 0 && index < empleadosarts.length) {
    // Eliminar empleado del arreglo empleadosarts
    empleadosarts.splice(index, 1);
    
    // Guardar el arreglo actualizado en localStorage
    guardarEmpleadosEnLocalStorage();
    
    // Actualizar la lista de empleados en el DOM
    actualizarListaEmpleados();
  }
}

// Función para recuperar empleados desde localStorage
function recuperarEmpleadosDeLocalStorage() {
  try {
    const empleadosJson = localStorage.getItem('empleados');
    if (empleadosJson) {
      empleadosarts = JSON.parse(empleadosJson);
    } else {
      empleadosarts = [];
    }
    
    // Actualizar la lista de empleados en el DOM
    actualizarListaEmpleados();
  } catch (error) {
    console.error('Error al recuperar empleados desde localStorage:', error);
    empleadosarts = [];
    // Actualizar la lista de empleados en el DOM
    actualizarListaEmpleados();
  }
}

// Llamada para recuperar empleados al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  recuperarEmpleadosDeLocalStorage();
});

// Clase Empleado
class Empleado {
  constructor(nombre, cuit, edad, ocupacion) {
    this.nombre = nombre;
    this.cuit = cuit;
    this.edad = edad;
    this.ocupacion = ocupacion;
  }
}

// Event listener para el botón de búsqueda de empleados por CUIT
document.getElementById('buscarButton').addEventListener('click', function() {
  // Obtener el valor ingresado por el usuario
  const buscar = parseInt(document.getElementById('buscarCuit').value);

  // Realizar la búsqueda usando find()
  const busqueda = empleadosarts.find((empleado) => empleado.cuit === buscar);

  // Mostrar el resultado en el DOM
  const resultadoBusqueda = document.getElementById('resultadoBusqueda');
  if (busqueda) {
    resultadoBusqueda.innerHTML = `
      <p><strong>Empleado Encontrado:</strong></p>
      <p><strong>Nombre:</strong> ${busqueda.nombre}</p>
      <p><strong>CUIT/CUIL:</strong> ${busqueda.cuit}</p>
      <p><strong>Edad:</strong> ${busqueda.edad}</p>
      <p><strong>Ocupación:</strong> ${busqueda.ocupacion}</p>
    `;
  } else {
    resultadoBusqueda.textContent = 'No se encontró ningún empleado con ese CUIT/CUIL.';
  }
});

// Event listener para el botón de filtrar empleados próximos a jubilarse
document.getElementById('filtrarJubiladosButton').addEventListener('click', function() {
  // Filtrar empleados con edad >= 60
  const filtrados = empleadosarts.filter((empleado) => empleado.edad >= 60);

  // Mostrar los resultados en el DOM
  mostrarResultadosFiltrados(filtrados, 'Empleados próximos a jubilarse (edad >= 60 años)');
});

// Event listener para el botón de filtrar empleados menores de 60 años
document.getElementById('filtrarNoJubiladosButton').addEventListener('click', function() {
  // Filtrar empleados con edad < 60
  const filtrados = empleadosarts.filter((empleado) => empleado.edad < 60);

  // Mostrar los resultados en el DOM
  mostrarResultadosFiltrados(filtrados, 'Empleados menores de 60 años');
});

// Función para mostrar los resultados filtrados en el DOM
function mostrarResultadosFiltrados(empleadosFiltrados, mensaje) {
  const resultadosContainer = document.getElementById('resultadosFiltrados');
  resultadosContainer.innerHTML = '';

  if (empleadosFiltrados.length > 0) {
    const header = document.createElement('h3');
    header.textContent = mensaje;
    resultadosContainer.appendChild(header);

    const listaEmpleados = document.createElement('ul');
    empleadosFiltrados.forEach((empleado) => {
      const itemEmpleado = document.createElement('li');
      itemEmpleado.innerHTML = `
        <strong>Nombre:</strong> ${empleado.nombre} <br>
        <strong>CUIT/CUIL:</strong> ${empleado.cuit} <br>
        <strong>Edad:</strong> ${empleado.edad} <br>
        <strong>Ocupación:</strong> ${empleado.ocupacion}
      `;
      listaEmpleados.appendChild(itemEmpleado);
    });

    resultadosContainer.appendChild(listaEmpleados);
  } else {
    resultadosContainer.textContent = 'No se encontraron empleados con los criterios especificados.';
  }
}

// Event listener para el botón de filtrar por nombre y/o apellido
document.getElementById('filtrarButton').addEventListener('click', function() {
  // Obtener el valor ingresado por el usuario
  const filtro = document.getElementById('filtroNombreApellido').value.toLowerCase().trim();

  // Filtrar empleados por nombre y/o apellido
  const filtrados = empleadosarts.filter((empleado) => {
    const nombreApellido = `${empleado.nombre} ${empleado.apellido}`.toLowerCase();
    return nombreApellido.includes(filtro);
  });

  // Mostrar los resultados en el DOM
  mostrarResultadosFiltradosNombreApellido(filtrados);
});

// Función para mostrar los resultados filtrados por nombre y/o apellido en el DOM
function mostrarResultadosFiltradosNombreApellido(empleadosFiltrados) {
  const resultadosContainer = document.getElementById('resultadosFiltradosNombreApellido');
  resultadosContainer.innerHTML = '';

  if (empleadosFiltrados.length > 0) {
    const header = document.createElement('h3');
    header.textContent = 'Resultados del filtro por Nombre y/o Apellido:';
    resultadosContainer.appendChild(header);

    const listaEmpleados = document.createElement('ul');
    empleadosFiltrados.forEach((empleado) => {
      const itemEmpleado = document.createElement('li');
      itemEmpleado.innerHTML = `
        <strong>Nombre:</strong> ${empleado.nombre} <br>
        <strong>CUIT/CUIL:</strong> ${empleado.cuit} <br>
        <strong>Edad:</strong> ${empleado.edad} <br>
        <strong>Ocupación:</strong> ${empleado.ocupacion}
      `;
      listaEmpleados.appendChild(itemEmpleado);
    });

    resultadosContainer.appendChild(listaEmpleados);
  } else {
    resultadosContainer.textContent = 'No se encontraron empleados con el nombre y/o apellido especificado.';
  }
}
// Fetch al archivo .JSON (que contiene un array con los datos de 10 empleados ficticios. No lo incorporo al html, para no ensuciar la página)
fetch("./db/data.JSON")
.then(response => response.json())
.then(data => console.log(data))

