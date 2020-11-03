let stickers = [
    {
        url: 'stickers/arbol.png',
        imagen: new Image(),
        defecto_x: 100,
        defecto_y: 100,
        x: 100,
        y: 100,
        pos_x: 0,
        pos_y: 0,
        activo: false,
        tamano: 1.0
    },
    {
        url: 'stickers/bola.png',
        imagen: new Image(),
        defecto_x: 100,
        defecto_y: 100,
        x: 100,
        y: 100,
        pos_x: 0,
        pos_y: 0,
        activo: false,
        tamano: 1.0
    },
    {
        url: 'stickers/copo.png',
        imagen: new Image(),
        defecto_x: 100,
        defecto_y: 100,
        x: 100,
        y: 100,
        pos_x: 0,
        pos_y: 0,
        activo: false,
        tamano: 1.0
    },
    {
        url: 'stickers/galleta.png',
        imagen: new Image(),
        defecto_x: 100,
        defecto_y: 100,
        x: 100,
        y: 100,
        pos_x: 0,
        pos_y: 0,
        activo: false,
        tamano: 1.0
    },
    {
        url: 'stickers/gato.png',
        imagen: new Image(),
        defecto_x: 100,
        defecto_y: 100,
        x: 100,
        y: 100,
        pos_x: 0,
        pos_y: 0,
        activo: false,
        tamano: 1.0
    },
    {
        url: 'stickers/gorro.png',
        imagen: new Image(),
        defecto_x: 100,
        defecto_y: 100,
        x: 100,
        y: 100,
        pos_x: 0,
        pos_y: 0,
        activo: false,
        tamano: 1.0
    },
    {
        url: 'stickers/hoja.png',
        imagen: new Image(),
        defecto_x: 100,
        defecto_y: 100,
        x: 100,
        y: 100,
        pos_x: 0,
        pos_y: 0,
        activo: false,
        tamano: 1.0
    },
    {
        url: 'stickers/merry.png',
        imagen: new Image(),
        defecto_x: 100,
        defecto_y: 100,
        x: 100,
        y: 100,
        pos_x: 0,
        pos_y: 0,
        activo: false,
        tamano: 1.0
    },
    {
        url: 'stickers/piruleta.png',
        imagen: new Image(),
        defecto_x: 100,
        defecto_y: 100,
        x: 100,
        y: 100,
        pos_x: 0,
        pos_y: 0,
        activo: false,
        tamano: 1.0
    },
    {
        url: 'stickers/regalo.png',
        imagen: new Image(),
        defecto_x: 100,
        defecto_y: 100,
        x: 100,
        y: 100,
        pos_x: 0,
        pos_y: 0,
        activo: false,
        tamano: 1.0
    }

]

function stickersPorDefecto(){

    items_carousel = document.getElementsByClassName('sticker-click');
    // Cambiar el fondo del sticker en el carousel
    for(i=0; i<stickers.length; i++){
        if(stickers[i].activo){
            cambiarEstado(items_carousel[i], i);
        }
    }

    stickers = [
        {
            url: 'stickers/arbol.png',
            imagen: new Image(),
            defecto_x: 100,
            defecto_y: 100,
            x: 100,
            y: 100,
            pos_x: 0,
            pos_y: 0,
            activo: false,
            tamano: 1.0
        },
        {
            url: 'stickers/bola.png',
            imagen: new Image(),
            defecto_x: 100,
            defecto_y: 100,
            x: 100,
            y: 100,
            pos_x: 0,
            pos_y: 0,
            activo: false,
            tamano: 1.0
        },
        {
            url: 'stickers/copo.png',
            imagen: new Image(),
            defecto_x: 100,
            defecto_y: 100,
            x: 100,
            y: 100,
            pos_x: 0,
            pos_y: 0,
            activo: false,
            tamano: 1.0
        },
        {
            url: 'stickers/galleta.png',
            imagen: new Image(),
            defecto_x: 100,
            defecto_y: 100,
            x: 100,
            y: 100,
            pos_x: 0,
            pos_y: 0,
            activo: false,
            tamano: 1.0
        },
        {
            url: 'stickers/gato.png',
            imagen: new Image(),
            defecto_x: 100,
            defecto_y: 100,
            x: 100,
            y: 100,
            pos_x: 0,
            pos_y: 0,
            activo: false,
            tamano: 1.0
        },
        {
            url: 'stickers/gorro.png',
            imagen: new Image(),
            defecto_x: 100,
            defecto_y: 100,
            x: 100,
            y: 100,
            pos_x: 0,
            pos_y: 0,
            activo: false,
            tamano: 1.0
        },
        {
            url: 'stickers/hoja.png',
            imagen: new Image(),
            defecto_x: 100,
            defecto_y: 100,
            x: 100,
            y: 100,
            pos_x: 0,
            pos_y: 0,
            activo: false,
            tamano: 1.0
        },
        {
            url: 'stickers/merry.png',
            imagen: new Image(),
            defecto_x: 100,
            defecto_y: 100,
            x: 100,
            y: 100,
            pos_x: 0,
            pos_y: 0,
            activo: false,
            tamano: 1.0
        },
        {
            url: 'stickers/piruleta.png',
            imagen: new Image(),
            defecto_x: 100,
            defecto_y: 100,
            x: 100,
            y: 100,
            pos_x: 0,
            pos_y: 0,
            activo: false,
            tamano: 1.0
        },
        {
            url: 'stickers/regalo.png',
            imagen: new Image(),
            defecto_x: 100,
            defecto_y: 100,
            x: 100,
            y: 100,
            pos_x: 0,
            pos_y: 0,
            activo: false,
            tamano: 1.0
        }
    
    ]
}