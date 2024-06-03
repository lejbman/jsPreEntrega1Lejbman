//constantes
const contrib_seg_soc = 17
const contrib_obra_soc = 6
const fijo_empleado = 550
const porcent_art = 0.05

//console.log(cod_activ_afip,descripcion_activ)
let cuit = parseInt(prompt("ingrese su CUIL/CUIT"))
let nombre = prompt("ingrese su nombre y apellido o razón social")
let cod_activ_afip = parseInt(prompt("ingrese su código de actividad AFIP"))
console.log(cuit,nombre,cod_activ_afip)
alert("¡Hola "+nombre+ "! ¡Bienvenida/o al cotizador de ART!")

// Incluyo una variable, llamada "validar" + if para consultar al posible cliente si desea obtener una cotización

let validar = prompt("¿Deseas obtener una cotización del servicios? Si/No")

if(validar == "Si" || validar == "Sí" || validar == "SI" || validar == "si" || validar == "sI" || validar == "SÍ"){
    alert("Excelente, avancemos con la cotización!")

    let salario_base_total = parseInt(prompt("ingrese el salario total de sus empleados en AR$"))
    let cargas_sociales = salario_base_total*(contrib_seg_soc+contrib_obra_soc)/100
    console.log(cargas_sociales)
    alert("Las cargas sociales a pagar calculadas son AR$"+cargas_sociales)

    //  Incluyo una variable "q_empleados" + for, para calcular el importe fijo por cantidad de empleados que cobrará la ART, siendo el importe unitario $550, declarado en la constante "fijo_empleado".

    let q_empleados = parseInt(prompt("Ingrese la cantidad de empleados"))

    for (let i = 1 ; i <= q_empleados ; i++){
        let resultado = i*fijo_empleado
        console.log("Para "+i+" empleados, el precio fijo de la ART sería de AR$"+resultado)
    }

    // Incluyo una función con el cálculo del precio fijo a abonar a la ART en función a la cantidad de empleados.
    function calculo() {
        let numeroA = q_empleados
        let resultadoA = numeroA * fijo_empleado
        return resultadoA
    }
    alert("Para la cantidad de empleados indicados el precio fijo de la ART es de AR$"+calculo())

    // Incluyo una función flecha con el cálculo del precio variable, en función de la masa salarial.

    const precio_variable = salario => salario*porcent_art
    alert("Para la masa salarial total indicada, el monto variable a abonar a la ART es de AR$"+precio_variable(salario_base_total))

    // // Incluyo una variable con la suma del costo total de la ART

    let costo_total = q_empleados*fijo_empleado+salario_base_total*porcent_art
    alert("El importe total a abonar a la ART, en función a la cantidad de empleados y la masa salarial es de AR$"+costo_total)

    // Ofrecemos la posibilidad de cargar a los empleados

    let nuevo_empleado = prompt("¿Desea cargar a los empleados? Si/No")

    if(nuevo_empleado == "Si" || nuevo_empleado == "Sí" || nuevo_empleado == "SI" || nuevo_empleado == "si" || nuevo_empleado == "sI" || nuevo_empleado == "SÍ"){
        alert("Excelente, avancemos con la carga!")

        // Utilizo while para la carga de empleados

        let continuar = true

        while(continuar){
            let nombreempl = prompt("Ingrese el nombre y apellido del empleado")
            let cuitemple = prompt("ingrese el CUIL/CUIT del empleado")
            console.log(nombreempl+", "+cuitemple)

            let confirmacion = prompt("¿Desea cargar a un nuevo empleado? Si/No")
            if(confirmacion == "No" || confirmacion == "NO" || confirmacion == "no" || confirmacion == "nO"){
                continuar=false
                console.log("Gracias! Finalizamos la carga de empleados")
            }
        }

    } else{
        alert("No hay problema, puedes cargar a los empleados en otro momento")
    }

    // Ofrecemos la posibilidad de cargar a los establecimientos de la empresa

    let establecimiento = prompt("¿Desea cargar los establecimientos? Si/No")

    if(establecimiento == "Si" || establecimiento == "Sí" || establecimiento == "SI" || establecimiento == "si" || establecimiento == "sI" || establecimiento == "SÍ"){
        alert("Excelente, avancemos con la carga!")

        // Utilizo un array para los establecimientos

        const establec = []

        let continuar = true

        while(continuar){
            establec.push(parseInt(prompt("Ingrese el número de establecimiento")))
            console.log(establec)

            let confirmacion = prompt("¿Desea cargar un nuevo establecimiento? Si/No")
            if(confirmacion == "No" || confirmacion == "NO" || confirmacion == "no" || confirmacion == "nO"){
                continuar=false
                console.log("Gracias! Finalizamos la carga de establecimientos")
            }
        }

    } else{
        alert("No hay problema, puedes cargar los establecimientos en otro momento. ¡Gracias por elegirnos!")
    }

} else{
    alert("Gracias! Vuelva pronto!")
}

