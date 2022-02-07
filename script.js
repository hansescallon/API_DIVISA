function convertir() {

    let divisaOrigen;
    let divisaDestino;
    let cantidad;
    let resultado2;

    let precioDolarHoyEnMXN;
    let fechaActualizacion;
    divisaOrigen = document.getElementById("sdivisaOrigen").value;
    divisaDestino = document.getElementById("sdivisaDestino").value;
    cantidad = document.getElementById("cantidad").value;
    console.log(divisaOrigen + "-" + divisaDestino + "-" + cantidad);


    fetch("https://v6.exchangerate-api.com/v6/c88577d6f352ed381465064c/latest/" + divisaOrigen)
        .then(respuesta => respuesta.json())
        .then(respuestaDecodificada => {
            console.log(respuestaDecodificada.conversion_rates);
            precioHoy = respuestaDecodificada.conversion_rates[divisaDestino]//.COP;



            fechaActualizacion = respuestaDecodificada.date;
            resultado2 = precioHoy * cantidad;
            console.log(resultado2 + "-" + precioHoy);
            console.log("en la promesa " + numberFormat(resultado2));
            document.getElementById("resultado2").value = divisaDestino + "  " + numberFormat(resultado2);
        });


}

/**
    * Funcion que devuelve un numero separando los separadores de miles
    * Puede recibir valores negativos y con decimales
    */
function numberFormat(numero) {
    console.log("en el formatnumer," + numero);
    // Variable que contendra el resultado final
    var resultado = "";
    numero = numero + "";
    numero = numero.replace('.', ',');
    // Si el numero empieza por el valor "-" (numero negativo)
    if (numero[0] == "-") {
        // Cogemos el numero eliminando los posibles puntos que tenga, y sin
        // el signo negativo
        nuevoNumero = numero.replace(/\./g, '').substring(1);
    } else {
        // Cogemos el numero eliminando los posibles puntos que tenga
        nuevoNumero = numero.replace(/\./g, '');
    }

    // Si tiene decimales, se los quitamos al numero
    if (numero.indexOf(",") >= 0)
        nuevoNumero = nuevoNumero.substring(0, nuevoNumero.indexOf(","));

    // Ponemos un punto cada 3 caracteres
    for (var j, i = nuevoNumero.length - 1, j = 0; i >= 0; i--, j++)
        resultado = nuevoNumero.charAt(i) + ((j > 0) && (j % 3 == 0) ? "." : "") + resultado;

    // Si tiene decimales, se lo añadimos al numero una vez forateado con 
    // los separadores de miles
    if (numero.indexOf(",") >= 0)
        resultado += numero.substring(numero.indexOf(","));

    if (numero[0] == "-") {
        // Devolvemos el valor añadiendo al inicio el signo negativo
        return "-" + resultado;
    } else {
        return resultado;
    }
}
