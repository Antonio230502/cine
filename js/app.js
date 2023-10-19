"serviceWorker" in navigator && navigator.serviceWorker.register("sw.js")

const inputNombre = document.querySelector("#nombre")
const inputCorreo = document.querySelector("#correo")
const inputPelicula = document.querySelector("#pelicula")
const inputImagen = document.querySelector("#imagenFormulario")
const inputBoletos = document.querySelector("#boletos")
const botonComprar = document.querySelector("#btnComprar")
const botonEditarGeneral = document.querySelector("#btnEditar")
const registrosTabla = document.querySelector("[data-historialCompras]")
const errores = document.querySelectorAll("span")
let filaAEditar

inputNombre.onclick = () => errores[0].innerText = ""
inputCorreo.onclick = () => errores[1].innerText = ""
inputBoletos.onclick = () => errores[3].innerText = ""

inputPelicula.onchange = () => {
    errores[2].innerText = ""
    inputImagen.setAttribute("src", `img/${inputPelicula.value}.jpeg`)
}

botonComprar.onclick = (e) => {
    e.preventDefault()

    if(!validarInputs()){
        const nombre = inputNombre.value
        const correo = inputCorreo.value
        const pelicula = inputPelicula.selectedOptions[0].innerText
        const numeroBoletos = parseInt(inputBoletos.value)
    
        const total = numeroBoletos * 50
    
        const nuevoRegistro = document.createElement("tr")
        nuevoRegistro.classList.add("table-secondary")
    
        const celdaBotones = document.createElement("td")
    
        const botonEliminar = document.createElement("button")
    
        botonEliminar.innerText = "Eliminar"
        botonEliminar.classList.add("btn", "btn-danger")
        botonEliminar.style.marginBottom = "15px"
        botonEliminar.style.width = "85px"
    
        botonEliminar.onclick = (click) => confirm("¿Está seguro de eliminar este registro?") && click.target.parentElement.parentElement.remove()
        
    
        celdaBotones.appendChild(botonEliminar)
        celdaBotones.appendChild(document.createElement("br"))
    
        const botonEditar = document.createElement("button")
    
        botonEditar.innerText = "Editar"
        botonEditar.classList.add("btn", "btn-warning")
        botonEditar.style.width = "85px"
    
        botonEditar.onclick = click => {
            filaAEditar = click.target.parentElement.parentElement
    
            inputNombre.value = filaAEditar.children[0].innerText
            inputCorreo.value = filaAEditar.children[1].innerText
            inputPelicula.value = filaAEditar.children[2].innerText
            inputImagen.setAttribute("src", `img/${filaAEditar.children[2].innerText}.jpeg`)
            inputBoletos.value = filaAEditar.children[4].innerText
    
            botonComprar.style.display = "none"
            botonEditarGeneral.style.display = "block"
        }
    
        celdaBotones.appendChild(botonEditar)
    
        const datosRegistro = `
        <td>${nombre}</td>
        <td>${correo}</td>
        <td>${pelicula}</td>
        <td>
            <img class="imagenTabla" src="img/${inputPelicula.value}.jpeg" alt="">
        </td>
        <td>${numeroBoletos}</td>
        <td>$${total}.00</td>
        `
    
        nuevoRegistro.innerHTML = datosRegistro
        nuevoRegistro.appendChild(celdaBotones)
        registrosTabla.appendChild(nuevoRegistro)
    
        limpiarInputs()
    }
}

const validarInputs = () => {
    let hayError = false

    //Validaciones input nombre
    if(inputNombre.validity["valueMissing"]){
        hayError = true
        errores[0].innerText = "Por favor, ingrese su nombre"
    }
    else
        errores[0].innerText = ""

    //Validaciones input correo
    if(inputCorreo.validity["valid"])
        errores[1].innerText = ""
    else{
        hayError = true
        if(inputCorreo.validity["valueMissing"])
            errores[1].innerText = "Por favor, ingrese su correo electrónico"
        else
            errores[1].innerText = "Por favor, ingrese un correo electrónico valido"
    }

    //Validaciones input pelicula
    if(inputPelicula.value == "default"){
        hayError = true
        errores[2].innerText = "Por favor, primero seleccione una película"
    }
    else
        errores[2].innerText = ""

    //Validaciones input boletos
    if(inputBoletos.validity["valueMissing"]){
        hayError = true
        errores[3].innerText = "Tiene que comprar al menos un boleto"
    }
    else{
        const boletos = parseFloat(inputBoletos.value)
        if(boletos < 1){
            hayError = true
            errores[3].innerText = "Tiene que comprar al menos un boleto"
        }
        else
            errores[3].innerText = ""
    }

    return hayError
}

const limpiarInputs = () => {
    inputNombre.value = ""
    inputBoletos.value = ""
    inputCorreo.value = ""
    inputPelicula.value = "default"
    inputImagen.setAttribute("src", "img/default.jpeg")
}

botonEditarGeneral.onclick = click => {
    click.preventDefault()

    if(!validarInputs()){
        filaAEditar.children[0].innerText = inputNombre.value
        filaAEditar.children[1].innerText = inputCorreo.value
        filaAEditar.children[2].innerText = inputPelicula.value
        filaAEditar.children[3].children[0].setAttribute("src", `img/${inputPelicula.value}.jpeg`)
    
        const numeroBoletos = parseInt(inputBoletos.value)
        const total = numeroBoletos * 50
    
        filaAEditar.children[4].innerText = numeroBoletos
        filaAEditar.children[5].innerText = `$${total}.00`
    
        botonComprar.style.display = "block"
        botonEditarGeneral.style.display = "none"
    
        limpiarInputs()
    }
}
