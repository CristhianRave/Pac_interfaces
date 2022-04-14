$(function () {
  $(".btn-restart").hide();
  $("table").hide();
  $("#win").hide();
  var speedsCars = [{}];
  var carFinish = 0;

  /* Array con las imgs de los coches y la pista */
  var cars = [
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

  //-----------------------------------------------------;

  /* Boton inicio carrera */
  $(".btn-start").on("click", function () {
    /* cantidad de jugadores seleccionados */
    var option = $("#players option:selected").val();

    $(".btn-start").hide();
    $(".btn-restart").show();

    carProperties(option, speedsCars);
    tablePositions(speedsCars);
  });

  //-----------------------------------------------------;

  function random(min, max) {
    var speed = Math.floor(Math.random() * (max - min + 1) + min);
    return speed;
  }
  //-----------------------------------------------------;

  /* Propiedades de los coches y la pista*/
  function carProperties(option) {
    var windowWidth = $(".track").width();
    var finalRace = windowWidth - $(".car").width() * 1.4;

    for (let index = 0; index < option; index++) {
      var speedRandom = random(1, 10); //cambiar valor

      var car = cars[index];
      car.show();

      /* Animacion de los coches */
      var animateCar = $("#car" + (index + 1)).animate(
        { left: finalRace },
        {
          duration: speedRandom * 1001,
          complete: function () {
            carFinish += 1;

            if (option == carFinish) {
              $("table").show();
              carFinish = 0;
              $("#win").show();
            }
          },
        }
      );
      /* Agregar coche/velocidad al array */
      var speedCar = { animateCar, speedRandom };
      speedsCars.push(speedCar);
    }

    /* Ordenar por llegada */
    speedsCars.sort((a, b) => (a.speedRandom > b.speedRandom ? 1 : -1));
  }

  //-----------------------------------------------------;

  /* tabla de posiciones */
  function tablePositions(speedsCars) {
    for (let i = 0; i < speedsCars.length; i++) {
      var value = speedsCars[i];
      var nameCar = value.animateCar[0].alt;

      /* Crear filas en tabla posiciones */
      $("#tbody-car").append(
        "<tr id='tr-coche'><td>" +
          (i + 1) +
          "</td><td>" +
          nameCar +
          "</td></tr>"
      );
      if (i == 0) {
        $("#win").append(
          "<h1>Ganador</h1><h1>" +
            nameCar +
            "</h1><img class='carWin' src=" +
            value.animateCar[0].src +
            ">"
        );

        console.log(value.animateCar[0]);
      }
    }
  }

  //-----------------------------------------------------;
  /* Boton de reinicio */
  $(".btn-restart").on("click", function () {
    speedsCars.length = 0;
    $(".btn-restart").hide();
    $(".btn-start").show();
    $(".car").clearQueue().stop().css("left", "0");
    $("table").hide();
    $("#win").hide();
    $("#tbody-car").empty();
    $("#win").empty();
  });
});
