// Importante No ELIMINAR
angular.module('starter.controllers', [])


// Vista Principal Controller
.controller('vistaCtrl', function($scope, $state) {
  // Funcion para ir a la vista del ADN
  $scope.irAdn = function() {
    $state.go("ADN");
  }
  // Funcion para ir a la vista del Video
  $scope.irvideo = function(){
    $state.go("Video");
  }

  $scope.irinfogragia = function() {
    $state.go("juego");
  }


$scope.irjuego = function() {
    $state.go("tabla");
  }
  $scope.irtabla= function() {
    $state.go("");
  }
})

// ADN Controller

.controller('adnCtrl', function($scope,$state) {

})

.controller('infografiaCtrl', function($scope,$state) {

})

.controller('tablaCtrl', function($scope,$state) {

})

.controller('juegoCtrl', function ($scope) {
  // body...
  $(document).ready(function(){
  
var checkArray = []; // para verificar si las dos cartas con click son el mismo personaje
var idArray = []; //array para guardar los ids de las cartas que tienen click 
var contador = 0;
var fin = 0; 
var fields = document.querySelectorAll(".atras");


var images = [
"https://www.airbiotic.com/wp-content/uploads/2015/10/vitaminas-imprescindibles-para-tu-cuerpo.jpg",
"https://www.airbiotic.com/wp-content/uploads/2015/10/vitaminas.jpg",
"https://vitaminas.mundoasistencial.com/mundoasistencial/wp-content/uploads/sites/2/2016/03/rol-vitaminas-cuerpo-humano.jpg",
"http://innatia.info/images/galeria/alimentos-2.jpg",
"https://comofuncionaque.com/wp-content/uploads/2015/01/Come-de-manera-equilibrada-para-estar-sano-y-fuerte.jpg",
"https://www.infografiasyremedios.com/wp-content/uploads/2014/07/infografia-vitaminas-e1482951882171.jpg",
"http://3.bp.blogspot.com/-93_YVyoQQ5A/TmfmlUyIXXI/AAAAAAAAABA/ykrk4Y748-U/s1600/vitaminas1.jpg",
"https://s3.amazonaws.com/tinycards/image/b970e1440e02f7be58f271e0da2d8bf8",
"https://image.slidesharecdn.com/lasvitaminas-121004075028-phpapp02/95/las-vitaminas-1-728.jpg?cb=1429183970",
"https://www.airbiotic.com/wp-content/uploads/2015/10/vitaminas-imprescindibles-para-tu-cuerpo.jpg",
"https://www.airbiotic.com/wp-content/uploads/2015/10/vitaminas.jpg",
"https://vitaminas.mundoasistencial.com/mundoasistencial/wp-content/uploads/sites/2/2016/03/rol-vitaminas-cuerpo-humano.jpg",
"http://innatia.info/images/galeria/alimentos-2.jpg",
"https://comofuncionaque.com/wp-content/uploads/2015/01/Come-de-manera-equilibrada-para-estar-sano-y-fuerte.jpg",
"https://www.infografiasyremedios.com/wp-content/uploads/2014/07/infografia-vitaminas-e1482951882171.jpg",
"http://3.bp.blogspot.com/-93_YVyoQQ5A/TmfmlUyIXXI/AAAAAAAAABA/ykrk4Y748-U/s1600/vitaminas1.jpg",
"https://s3.amazonaws.com/tinycards/image/b970e1440e02f7be58f271e0da2d8bf8",
"https://image.slidesharecdn.com/lasvitaminas-121004075028-phpapp02/95/las-vitaminas-1-728.jpg?cb=1429183970"
];
// verificacion de los clicks
function clicked() { 
  if ($(this).find(".inner-wrap").hasClass("flipped")) {
    return;
  }
  $(this).find(".inner-wrap").toggleClass("flipped");
  checkArray.push($(this).find("img").attr("src"));
  idArray.push($(this).attr("id"));
  check();
}

$(".carta").on("click", clicked);
  
//reiniciar el juego
function reiniciar() {
  $(".atras").find("img").remove(); //quitar todas las imagenes actuales
  $(".carta .inner-wrap").removeClass("flipped"); // quitar la classe flipped para volver a su estado inicial
  checkArray = []; 
  idArray = [];
  contador = 0; 
  fin = 0;
  iniciarJuego();
}
//para verificar el fin del juego
function verificarFin() {
  if (fin === 18) { //si todas las cartas estan volteadas
    alert("Juego finalizado, lo has logrado en " + contador + " intentos");
    reiniciar();
  }
}
//para random de las imagenes 
function shuffleArray(array) { 
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function iniciarJuego() {

  

  var arr = shuffleArray(images); //array con las imagenes de forma aleatoria
 // append de las imagenes a la clase para la parte de atras de las cartas
  for (var i = 0; i < fields.length; i++) {
    var img = document.createElement("img");
    img.src = arr[i];
    fields[i].appendChild(img);
  }


}

function check() {
  //si los fields se  han hecho dos clicks 
  if (checkArray.length === 2) {
    $(".carta").off("click", clicked); 
    setTimeout(function(){
      //si no hay match
      if (checkArray[0] !== checkArray[1]) { 
        //voltear las dos cartas seleccionadas
        $("#" + idArray[0]).find(".inner-wrap").removeClass("flipped"); 
        $("#" + idArray[1]).find(".inner-wrap").removeClass("flipped"); 
        contador++;
        //vaciar los arrays para la siguiente eleccion
        checkArray = []; 
        idArray = []; 
        //habilitar el click de nuevo
        $(".carta").on("click", clicked);
      } else {

        contador++;
        
        fin += 2; // contador para el final del juego, se agregan dos para el contador de fin
        //vaciar los dos arrays
        checkArray = []; 
        idArray = []; 
        verificarFin(); 
        $(".carta").on("click", clicked); 
      }
      document.querySelector(".counter").innerHTML = contador;
    }, 800);  
  }
}



iniciarJuego();

});   
})

.controller("subCategoriaCtrl",function($scope,$state) {
    $scope.redireccionar = function() {
    $state.go("tab.dash")
    }
});

// Video Controller



  
   
  
    


