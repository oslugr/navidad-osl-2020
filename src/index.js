let canvas = null;
let context = null;

let fondo = {
    imagen: null,
    url: ''
}

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

    stickers.filter(x => x.activo).map(dibujarSticker);   
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

// Funcionalidad para mover un sticker a través de la imagen
let isDragging = true;

$("#resultado").mousedown(function(e){
    isDragging = true;
});

$(window).mouseup(function(){
    isDragging = false;
});

$("#resultado").mousemove(function(e) {
    if( isDragging == true && canvas)
    {
        var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
        var canvasX = e.clientX - cRect.left;  // Subtract the 'left' of the canvas 
        var canvasY = e.clientY - cRect.top;   // from the X/Y positions to make  
        sticker.pos_x = canvasX;
        sticker.pos_y = canvasY;
        crearImagen();
    }
});

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

    sticker.x = sticker.defecto_x*ratio;
    sticker.y = sticker.defecto_y*ratio;

    crearImagen();
}