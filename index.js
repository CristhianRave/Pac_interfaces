$(function () {
  $(".btn-restart").hide();

  /* Ancho de la ventana */
  var windowWidth = $(window).width();

  /* Tamaño del coche */
  var carWidth = $(".car").width();

  /* Longitud de la pista */
  var raceLenght = windowWidth - carWidth * 2;

  /* Meta final */
  var finalRace = raceLenght - carWidth * 2;

  var speedsCars = [{}];
  var car;
  var moveCar;
  var speedCar = {};
  var speedRandom;

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

  function random(min, max) {
    var speed = Math.floor(Math.random() * (max - min + 1) + min);
    return speed;
  }

  /* Boton inicio carrera */
  $(".btn-start").on("click", function () {
    $(".btn-start").hide();
    $(".btn-restart").show();

    /* cantidad de jugadores seleccionados por pantalla */
    var option = $("#players option:selected").val();

    /* cantidad de coches a mostrar  */

    for (let index = 0; index < option; index++) {
      /* Valor random de la velocidad de los coches */
      speedRandom = random(1, 10); //cambiar valor

      car = coches[index];
      car.show();

      /* Animacion de los coches */
      moveCar = $("#car" + (index + 1)).animate(
        { left: raceLenght },
        speedRandom * 1001 /* ,
        function () {
          $(this).after(tablePositions());
        } */
      );

      /* Agregar coche y su velocidad al array */
      speedCar = { moveCar, speedRandom };
      speedsCars.push(speedCar);
    }

    /* Eliminar el primer elemento de el array */
    speedsCars.shift();

    /* Ordenar por llegada de los coches  */
    speedsCars.sort((a, b) => (a.speedRandom > b.speedRandom ? 1 : -1));

    /* tabla de posiciones */

    var keys = Object.keys(speedsCars);
    
    for (let i = 0; i < keys.length; i++) {
      
      var value = speedsCars[i];

      var d = value.moveCar[0].alt;

        //-----------------------------------------------------;
        var tr = "<tr><td>" + (i+1 )+ "</td><td>" + d + "</td></tr>";
        var tableBody = $("table tbody");
        tableBody.append(tr);
      }
    
  });

  $(".btn-restart").on("click", function () {
    $(".btn-restart").hide();
    $(".btn-start").show();
    $(".car").css("left", "0");
  });
});
