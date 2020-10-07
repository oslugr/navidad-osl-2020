// Toma la imagen subida y la superpone con otra
function mostrarImagen(input){
    // Se han introducido imágenes
    if (input.files && input.files[0]) {
        
        var reader = new FileReader();

        reader.onload = function (e) {
            var canvas = document.getElementById('resultado'); 
            var context = canvas.getContext('2d'); 

            // Se crean las dos imágenes para superponerlas
            var img1 = new Image(); 
            var img2 = new Image(); 

            img1.onload = function() {
                canvas.width = img1.width; 
                canvas.height = img1.height; 
                img2.src = 'ugr.png'; 
            }; 

            img2.onload = function() { 
                context.globalAlpha = 1.0; 
                context.drawImage(img1, 0, 0);
                context.globalAlpha = 1;
                context.drawImage(img2, 0, 0); 
            };

            // Se asocia a la primera imagen la url generada al subirla,
            // para que no pase por un servidor
            img1.src = e.target.result;
        }

        // Se lee el primer archivo introducido
        reader.readAsDataURL(input.files[0]);
    }
}
