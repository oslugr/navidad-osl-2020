let canvas = null;
let context = null;

let fondo = {
    imagen: null,
    url: '',
    factor_de_ancho: 1
}

let stickerActivo = null;

// Construye el canvas donde se mostrará la fotografía con los stickers
function construirCanvas(){
    canvas = document.getElementById('resultado');
    context = canvas.getContext('2d'); 
    stickersPorDefecto();

    // Crea las imágenes que se van mostrar
    fondo.imagen = new Image();
    // Cargas los stickers de forma asíncrona
    for(i=0; i<stickers.length; i++){
        stickers[i].imagen.src = stickers[i].url;
    }

    fondo.imagen.onload = function(){
        // Calculamos como de ancho es en cuanto al espacio de la página
        let ancho = document.getElementById('resultado').offsetWidth;
        fondo.factor_de_ancho = fondo.imagen.width/ancho;

        crearImagen();
        nuevoTamanoPorDefectoStickers();
    }

    fondo.imagen.src = fondo.url;
    
}

// Crea la imagen cada vez que cambia algo
// (Modificación de stickers, etc...)
function crearImagen(){

    // Ajusta la imagen al espacio establecido para el elemento canvas
    canvas.width = fondo.imagen.width; 
    canvas.height = fondo.imagen.height;

    // Dibuja toda la imagen
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1.0; 
    context.drawImage(fondo.imagen, 0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1.0;

    stickers.filter(x => x.activo).map( y => { dibujarSticker(y); });   
}

function dibujarSticker( obj ){
    context.drawImage(obj.imagen, obj.pos_x, obj.pos_y, obj.x, obj.y);
}

// Toma la imagen subida y la dibuja
function mostrarImagen(input){
    // Se han introducido imágenes
    if (input.files && input.files[0]) {
        
        var reader = new FileReader();

        reader.onload = function (e) {
            // Se asocia a la primera imagen la url generada al subirla,
            // para que no pase por un servidor
            fondo.url = e.target.result;
            
            construirCanvas();
        }

        // Se lee el primer archivo introducido
        reader.readAsDataURL(input.files[0]);
    }
}

// Devuelve la posición de la pulsación con respecto al canvas
function getPosicionMouse(cvn, e){
    var cRect = cvn.getBoundingClientRect();
    return{
        canvasX: (e.clientX - cRect.left)*fondo.factor_de_ancho,
        canvasY: (e.clientY - cRect.top)*fondo.factor_de_ancho
    } 
}

function getElementoPulsado(pos){
    s_a = null;
    for(i=0 ; i<stickers.length; i++){
        if(stickers[i].activo &&
           stickers[i].pos_x <= pos.canvasX && stickers[i].pos_x+stickers[i].x >= pos.canvasX &&
           stickers[i].pos_y <= pos.canvasY && stickers[i].pos_y+stickers[i].y >= pos.canvasY)
            
            s_a = i;
    }

    if(s_a)
        activarSticker(s_a);
}

function activarSticker(i){
    stickerActivo = i;
    stickers[i].activo = true;
    document.getElementById('slider').value = stickers[stickerActivo].tamano*50;
}

// Funcionalidad para mover un sticker a través de la imagen
let isDragging = true;

// Funcionalidad del ratón
$("#resultado").mousedown(function(e){
    isDragging = true;
    let pos = getPosicionMouse(canvas, e);
    getElementoPulsado(pos);
});

$(window).mouseup(function(){
    isDragging = false;
});

$("#resultado").mousemove(function(e) {
    if( isDragging == true && canvas)
    {   
        let pos = getPosicionMouse(canvas, e);
        stickers[stickerActivo].pos_x = pos.canvasX-stickers[stickerActivo].x/2;
        stickers[stickerActivo].pos_y = pos.canvasY-stickers[stickerActivo].y/2;

        crearImagen();
    }
});

// Set up touch events for mobile, etc
let cv = document.getElementById('resultado');

cv.addEventListener("touchstart", function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });

    cv.dispatchEvent(mouseEvent);
}, false);

cv.addEventListener("touchend", function (e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    cv.dispatchEvent(mouseEvent);
}, false);

cv.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });

    cv.dispatchEvent(mouseEvent);
}, false);

// Descarga de la imagen
function descargar(){
    let link = document.createElement('a');
    link.download = 'osl_navidad.png';
    link.href = document.getElementById('resultado').toDataURL();
    link.click();
}

// Cambia el tamaño del sticker 
function cambiarTamano(valor){
    ratio = valor/50;
    stickers[stickerActivo].tamano = ratio;

    stickers[stickerActivo].x = stickers[stickerActivo].defecto_x*ratio;
    stickers[stickerActivo].y = stickers[stickerActivo].defecto_y*ratio;

    crearImagen();
}

// Cambia el estado de un sticker al ser pulsado
function cambiarEstado( el, i ){

    // El sticker se está mostrando
    if(stickers[i].activo){
        el.style.background = 'none';
        stickers[i].activo = false;
        stickerActivo = null;
        crearImagen();
    }
    // El sticker no se está mostrando
    else{
        el.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
        activarSticker(i);
        crearImagen();
    }

}

function nuevoTamanoPorDefectoStickers(){
    let nuevoAncho = canvas.width;

    for(i=0; i<stickers.length; i++){
        stickers[i].defecto_x = nuevoAncho/2;
        stickers[i].defecto_y = nuevoAncho/2;
        stickers[i].x = stickers[i].defecto_x*stickers[i].tamano;
        stickers[i].y = stickers[i].defecto_y*stickers[i].tamano;
    }
}