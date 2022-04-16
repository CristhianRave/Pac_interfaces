$(function () {
  $(".btn-restart").hide();
  $("table").hide();
  $("#win").hide();
  $(".track").hide();

  //Declaracion de variables globales

  var speedsCars = [{}];
  //-----------------------------------------------------;

  /* Funcion de inicio carrera */
  $(".btn-start").on("click", function () {
    /* cantidad de jugadores seleccionados */
    $(".railCar").hide();
    $(".btn-start").hide();
    $(".btn-restart").show();
    $(".track").show();

    // LLamadas a funciones
    carProperties();
    tablePositions(speedsCars);
  });

  //-----------------------------------------------------;

  /* Funcion que inicializa y asigna valores y Propiedades 
  a los coches y la pista*/
  function carProperties() {
    var carFinish = 0;
    //participantes seleccionados 
    var option = $("#players option:selected").val();
    var cPlayer = new Array(parseInt(option));
    var car;

    //Valor para linea de meta
    var finalRace = $(".track").width() - $(".car").width()*1.5;
    
    //Asignacion de velocidad, imagen y animacion al coche
    for (let index = 0; index < option; index++) {
      var speedRandom = Math.floor(Math.random() * (10 - 1 + 1) + 1);

      cPlayer[index] = $("#rail" + (index + 1));
      car = cPlayer[index];
      car.show();
      
      /* Animacion */
      var animateCar = $("#car" + (index + 1)).animate(
        { left: finalRace },
        {
          duration: speedRandom * 1001,
          complete: function () {
            carFinish += 1;
            /* mostar tabla de posiciones y ganador 
            una vez esten todos en la meta */
            if (option == carFinish) {
              $("table").show("slow");
              $("#win").show();
              carFinish = 0;
            }
          },
        }
      );
        /* Agregar coche/velocidad al array */
        var speedCar = { animateCar, speedRandom };
        speedsCars.push(speedCar);
      }
      /* Ordenar por llegada a la meta*/
      speedsCars.sort((a, b) => (a.speedRandom > b.speedRandom ? 1 : -1));
    }
    //-----------------------------------------------------;

  /* tabla de posiciones */
  function tablePositions(speedsCars) {
    for (let i = 0; i < speedsCars.length; i++) {
      var value = speedsCars[i];      
      var nameCar = value.animateCar[0].alt;
      
      /* Crear filas en tabla de posiciones
      en el html */
      $("#tbody-car").append(
        "<tr id='tr-coche'><td>" +
          (i + 1) +
          "</td><td>" +
          nameCar +
          "</td></tr>"
      );
      //Mostramos el ganador
      if (i == 0) {
        $("#win").append(
          "<h1>Ganador</h1><h1>" +
            nameCar +
            "</h1><img class='carWin' src=" +
            value.animateCar[0].src +
            ">"
        );
      }
    }
  }
  //-----------------------------------------------------;
  /* Boton de reinicio */
  $(".btn-restart").on("click", function () {
    /* Reiniciamos valores y ocultamos elementos
      para la siguiente carrera */
    speedsCars.length = 0;
    $(".btn-restart").hide();
    $(".btn-start").show();
    $(".car").clearQueue().stop().css("left", "0");
    $("table").hide("fast");
    $("#win").hide("fast");
    $("#tbody-car").empty();
    $("#win").empty();
  });
});
