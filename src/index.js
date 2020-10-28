let canvas = null;
let context = null;

let fondo = {
    imagen: null,
    url: ''
}

let stickerActivo = null;

// Construye el canvas donde se mostrará la fotografía con los stickers
function construirCanvas(){
    canvas = document.getElementById('resultado');
    context = canvas.getContext('2d'); 

    // Crea las imágenes que se van mostrar
    fondo.imagen = new Image();
    // Cargas los stickers de forma asíncrona
    for(i=0; i<stickers.length; i++){
        stickers[i].imagen.src = stickers[i].url;
    }

    fondo.imagen.onload = function(){
        crearImagen();
    }

    fondo.imagen.src = fondo.url;
    nuevoTamanoPorDefectoStickers();
}

// Crea la imagen cada vez que cambia algo
// (Modificación de stickers, etc...)
function crearImagen(){

    // Ajusta la imagen al espacio establecido para el elemento canvas
    canvas.width = document.getElementById('resultado').offsetWidth; 
    canvas.height = canvas.width*fondo.imagen.height/fondo.imagen.width;

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

function getPosicionMouse(cvn, e){
    var cRect = cvn.getBoundingClientRect();
    return{
        canvasX: e.clientX - cRect.left,
        canvasY: e.clientY - cRect.top
    } 
}

// Funcionalidad para mover un sticker a través de la imagen
let isDragging = true;

// Funcionalidad del ratón
$("#resultado").mousedown(function(e){
    isDragging = true;
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

    // El sticker no se está mostrando
    if(stickers[i].estado == 0){
        el.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
        stickers[i].estado = 1;
        stickers[i].activo = true;

        crearImagen();
    }
    // El sticker se está mostrando
    else if(stickers[i].estado == 1){
        el.style.backgroundColor = 'rgba(255, 255, 0, 0.2)';
        stickers[i].estado = 2;

        if(stickerActivo != null){
            // Se quita el estado de seleccionado a otro sticker
            // si este se está mostrando
            if(stickers[stickerActivo].estado){
                stickers[stickerActivo].estado = 1;
                document.getElementsByClassName('sticker-click')[stickerActivo].style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
            }
        }

        stickerActivo = i;
        // Cambia el valor del slider al correspondiente
        document.getElementById('slider').value = stickers[stickerActivo].tamano*50;
    }
    // El sticker está activo
    else{
        el.style.background = 'none';
        stickers[i].estado = 0;
        stickers[i].activo = false;
        stickerActivo = null;
        crearImagen();
    }
}

function nuevoTamanoPorDefectoStickers(){
    let nuevoAncho = document.getElementById('resultado').offsetWidth;

    for(i=0; i<stickers.length; i++){
        stickers[i].defecto_x = nuevoAncho/2;
        stickers[i].defecto_y = nuevoAncho/2;
        stickers[i].x = stickers[i].defecto_x*stickers[i].tamano;
        stickers[i].y = stickers[i].defecto_y*stickers[i].tamano;
    }
}