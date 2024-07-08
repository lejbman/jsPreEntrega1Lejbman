// Array para almacenar empleados
const empleadosarts = [];

// DOM y Eventos

// Calcular cotización por cantidad de empleados y riesgo de la actividad
const calcularButton = document.getElementById('calcularButton');
calcularButton.addEventListener('click', function() {
    const numEmpleados = parseInt(document.getElementById('empleados').value);
    const factorRiesgo = parseFloat(document.getElementById('riesgo').value);

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

// Cargar empleados
document.getElementById('cargarEmpleadoButton').addEventListener('click', function() {
  const cargarNombre = document.getElementById('nombre').value;
  const cargarCuit = parseInt(document.getElementById('cuit').value);
  const cargarEdad = parseInt(document.getElementById('edad').value);
  const cargarOcupacion = document.getElementById('ocupacion').value;

  const empleado = new Empleado(cargarNombre, cargarCuit, cargarEdad, cargarOcupacion);
  empleadosarts.push(empleado);

  // Limpiar los campos después de cargar el empleado
  document.getElementById('nombre').value = '';
  document.getElementById('cuit').value = '';
  document.getElementById('edad').value = '';
  document.getElementById('ocupacion').value = '';

  actualizarListaEmpleados();
});

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
    `;
    empleadosContainer.appendChild(empleadoDiv);
  });
}

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
        itemEmpleado.textContent = `${empleado.nombre} - Edad: ${empleado.edad}`;
        listaEmpleados.appendChild(itemEmpleado);
      });
  
      resultadosContainer.appendChild(listaEmpleados);
    } else {
      resultadosContainer.textContent = 'No se encontraron empleados con los criterios especificados.';
    }
}
  
// filter con includes, que permite al usuario filtrar todos los objetos con un determinado nombre y/o apellido
// Event listener para el botón de filtrar
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
  
// Función para mostrar los resultados filtrados en el DOM
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
        itemEmpleado.textContent = `${empleado.nombre}`;
        listaEmpleados.appendChild(itemEmpleado);
      });
  
      resultadosContainer.appendChild(listaEmpleados);
    } else {
      resultadosContainer.textContent = 'No se encontraron empleados con el nombre y/o apellido especificado.';
    }
}

// innerText
document.addEventListener('DOMContentLoaded', function() {
    const titulo = document.getElementById('title');
    titulo.innerText = "Bienvenido al Cotizador de Alpina ART - Aseguradora de Riesgo del Trabajo";
});

// append
let subtitulo  = document.createElement("h2")
subtitulo.innerHTML = "¡Somos la Mejor ART del Mercado!"
document.body.append(subtitulo)

// eventos
let evento = document.getElementById("imagen")
evento.addEventListener("click", clickTest)
function clickTest () {
}

let evento1 = document.getElementById("title")
let clicks = 0
evento1.onclick = () => {
    clicks++
}

//storage
localStorage.setItem("saludo", "¡Bienvenido al cotizador de Alpina ART!")
let saludo = localStorage.getItem("saludo")

// Convertir empleados a JSON y guardar en localStorage
function guardarEmpleadosEnLocalStorage() {
    const empleadosJson = JSON.stringify(empleadosarts);
    localStorage.setItem('empleados', empleadosJson);
}

// Recuperar empleados desde localStorage y convertir a objetos JavaScript
function recuperarEmpleadosDeLocalStorage() {
    const empleadosJson = localStorage.getItem('empleados');
    if (empleadosJson) {
      empleadosarts = JSON.parse(empleadosJson);
    } else {
        // Inicializar como un array vacío si no hay datos en localStorage
      empleadosarts = [];
    }
}
  

  


