//Función que obtiene el tamaño de la pirámide
function CALLVALUE(){
    if (document.getElementById('tv').value == "" || document.getElementById('tv').value == " "){
        document.getElementById('error').innerHTML = "*Ingrese los Valores de la Piramide";
    }
    else{
            let i;
            let x = document.form;
            i = x.tv.value;
            return i.toString();  
        }
}

//Función que obtiene el tamaño de la pirámide
function CALLSIZE(){
    if (document.getElementById('tata').value == "" || document.getElementById('tata').value == " "){
        document.getElementById('error').innerHTML = "*Ingrese El Tamaño de la Piramide";
    }
    else{
            let i;
            let x = document.form;
            i = x.tata.value;
            return i.toString();  
        }
}

//Función que controlo los pisbles errores en la creación de la pirámide 
function EXCEPTIONS(piramide,arr,tam){
    let valido = true;
    let dif = Object.keys(arr);
    if(piramide[tam-1].length == 0){
        document.getElementById('error').innerHTML = "*error";
        valido = false;
    }
    else if(dif.length > tam){
        document.getElementById('error').innerHTML = "*error";
        valido = false;
    }
    else if(dif.length < tam ){
        document.getElementById('error').innerHTML = "*error";
        valido = false;
    }
    else{
        valido = true;
    }
    //console.log(valido)
    return valido;
}

//Función que genera el array anidado de la pirámide 
function generarPiramide(){
    let tam = Number(CALLSIZE());
    let arr = CALLVALUE().split(' ').map(x => Number(x));
    let piramide = []
    for(var i = 0; i < tam; i++){
        for(var j = 0; j < i; j++){
            arr.shift();
        }
        piramide.push(arr.slice(0, i + 1 ));
    }
    //console.log(piramide);
    if(EXCEPTIONS(piramide,arr,tam)){
        return piramide;
    }
}

//Funcion de calcula la suma con mayor peso 
function sumMaxPeso() {
    let piramide = generarPiramide()
    let iteraciones = [];
    let piramideClon = Object.assign([],piramide);
    do{
        var ultimaFila = piramideClon.pop()
        iteraciones.unshift (ultimaFila);
        var supFila = piramideClon.pop();
        for (var i = 0; i < supFila.length; i++){
            supFila[i] = Math.max(supFila[i] + ultimaFila[i], supFila[i] + ultimaFila[i + 1]);
        }
        piramideClon.push(supFila);
        
    } while (piramideClon.length > 1);
    document.getElementById('suma').innerHTML = "Suma: " + Object.values(supFila);
    iteraciones.unshift(supFila);
    return iteraciones;
}

//Función que ontiene los indices del recorrido y sus valores
function track(){
    let piramide = generarPiramide();
    let indices = [0];
    let iteraciones = sumMaxPeso();
    let dir = 0
    let track = []
    for(let i = 1; i < iteraciones.length; i++){
        dir = iteraciones[i].indexOf(Math.max(iteraciones[i][dir], iteraciones[i][dir + 1]), dir);
        indices.push(dir);
    }
    //console.log(indices);
    for(var j = 0; j < piramide.length; j++){
        track.push(piramide[j][indices[j]]);
    }
    //console.log(recorrido);
    document.getElementById('sub').innerHTML = "Resultado";
    document.getElementById('track').innerHTML = "track: " + Object.values(track);
    document.getElementById('error').innerHTML = "";
    return indices;
}

// Funcion para eliminar los datos 
function DELETION() {
    document.getElementById('tata').value = "";
    document.getElementById('tv').value = "";
    document.getElementById('sub').innerHTML = "";
    document.getElementById('track').innerHTML = "";
    document.getElementById('suma').innerHTML = "";
    document.getElementById('error').innerHTML = "";
    var container = document.getElementById('crp');
    let div = Array.prototype.slice.call(document.getElementsByClassName("lvl"), 0);
    for(element of div){
        console.log(element);
        element.remove();
    }  
}

//Funcion que construye el diseño de la pirámide
function construirPiramide(){
    let indices = track();
    let piramide = generarPiramide();
    for(var i = 0; i < piramide.length; i++){
        const lvl = document.createElement("div");
        lvl.setAttribute("id", i);
        lvl.className += "lvl"
        document.getElementById("crp").appendChild(lvl);
        for(var j = 0; j <= i; j++){
            const etiqueta = document.createElement("p");
            etiqueta.className += "numero "
            if(j == indices[i]){
                etiqueta.className += "rp";
            }
            etiqueta.innerHTML = (piramide[i][j])
            document.getElementById(i).appendChild(etiqueta);
        }
    }
}