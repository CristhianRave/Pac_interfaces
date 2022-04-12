$(function () {
  $(".btn-restart").hide();

  /* Ancho de la ventana */
  var windowWidth = $(window).width();
  console.log(windowWidth);

  /* Tamaño del coche */
  var carWidth = $(".car").width();

  /* Longitud de la pista */
  var raceLenght = windowWidth - carWidth * 2;;

  /* Meta final */
  var finalRace = raceLenght - carWidth;

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

  /* Boton inicio carrera */
  $(".btn-start").on("click", function () {
    var speedsCars = [{}];
    var car;
    var moveCar;
    var speedCar = {};

    $(".btn-start").hide();
    $(".btn-restart").show();

    /* cantidad de jugadores seleccionados por pantalla */
    var option = $("#players option:selected").val();

    /* cantidad de coches a mostrar  */
    for (let index = 0; index < option; index++) {

      /* Valor random de la velocidad de los coches */
      var speed = Math.random() * (10 - 1) + 1; //cambiar valor
      var speedRace = Math.round(speed) * 1000;

      car = coches[index];
      car.show();

      /* Animacion de los coches */
      moveCar = $("#car" + (index + 1)).animate(
        { left: raceLenght },
        speedRace
      );
      console.log(raceLenght);

      /* Agregar coche y su velocidad al array */
      speedCar = { moveCar, speedRace };
      speedsCars.push(speedCar);
    }
    /* Eliminar el primer elemento de el array */
    speedsCars.shift();
    
    /* Orden de llegada de los coches  */
    speedsCars.sort((a, b) => (a.speedRace > b.speedRace ? 1 : -1));
    console.log(speedsCars);
    var key;
    for (key in speedsCars) {
      if (key == 0) {
        key = "primero";
      } else if (key == 1) {
        key = "segundo";
      } else if (key == 2) {
        key = "tercero";
      } else if (key == 3) {
        key = "cuarto";
      } else if (key == 4) {
        key = "quinto";
      } else if (key == 5) {
        key = "sexto";
      } else if (key == 6) {
        key = "septimo";
      } else if (key == 7) {
        key = "octavo";
      } else if (key == 8) {
        key = "noveno";
      }
      console.log(key);
    }

  });

  $(".btn-restart").on("click", function () {
    $(".btn-restart").hide();
    $(".btn-start").show();
    $(".car").css("left", "0");
  });
});
