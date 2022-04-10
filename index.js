$(function () {
  /* Ancho de la ventana */
  var windowWidth = $(window).width();
  /* Longitud de la pista */
  var raceLenght = windowWidth - 100;

  var h; 
  
  /* Array con las imgs de los coches */
  var coches = [
    $("#rail1").hide(),
    $("#rail2").hide(),
    $("#rail3").hide(),
    $("#rail4").hide(),
    $("#rail5").hide(),
    $("#rail6").hide(),
    $("#rail7").hide(),
    $("#rail8").hide(),
    $("#rail9").hide(),
  ];
  
  $(".btn-start").on("click", function () {
    /* cantidad de jugadores seleccionados por pantalla */
    var option = $("#players option:selected").val();

    
    /* cantidad de coches a mostrar  */
    for (let index = 0; index < option; index++) {
      
      /* Valor random de la velocidad de los coches */
      var raceSpeed = Math.floor(Math.random() * 5000 + 1);

      h = coches[index];
      h.show();

      /* Animacion de los coches */
      $("#car" + (index + 1)).animate(
        {left: raceLenght},raceSpeed);
    } 

  });


  $(".btn-restart").on("click", function () {
      $(".car").css("left", "0");
    
  });
});
