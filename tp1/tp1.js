let estado = 0;
let frameIniciar;
let contador = 0;

let personajeX = 400;
let personajeY = 170;

let fondo;
let caminaAbajo = []; // guarda los frames de la animación del personaje caminando para abajo
let caminaDerecha = [];
let sentarse = [];
let nintendoInicio = [];

function preload() {
  fondo = loadImage("fondo.png");

  caminaAbajo[0] = loadImage("frames/caminandoAbajo-0.png");
  caminaAbajo[1] = loadImage("frames/caminandoAbajo-1.png");
  caminaAbajo[2] = loadImage("frames/caminandoAbajo-2.png");
  caminaAbajo[3] = loadImage("frames/caminandoAbajo-3.png");
  caminaAbajo[4] = loadImage("frames/caminandoAbajo-4.png");

  caminaDerecha[0] = loadImage("frames/caminandoDerecha-0.png");
  caminaDerecha[1] = loadImage("frames/caminandoDerecha-1.png");
  caminaDerecha[2] = loadImage("frames/caminandoDerecha-2.png");
  caminaDerecha[3] = loadImage("frames/caminandoDerecha-3.png");

  sentarse[0] = loadImage("frames/sentada-0.png");
  sentarse[1] = loadImage("frames/sentada-1.png");

  nintendoInicio[0] = loadImage("frames/nintendo-0.png");
  nintendoInicio[1] = loadImage("frames/nintendo-1.png");
}

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(0);
  image(fondo, 0, 0, width, height);

  acciones()
}

function acciones() {
  if (estado === 0 ) {
    contador++;
    personajeY += 2;

    dibujarEnBucle(caminaAbajo, personajeX, personajeY, 15);

    if (personajeY>= 400 ) {
      estado = 1;
      contador = 0;
    }
  } else if (estado === 1 ) {
    contador++;
    personajeX += 2;

    dibujarEnBucle(caminaDerecha, personajeX, personajeY, 15);

    if (personajeX>= 460 ) {
      estado = 2;
      contador = 0;
    }
  } else if  (estado === 2 ) {
    contador++;

    dibujarEnBucle(sentarse, personajeX, personajeY, 30);

    if (pasaTiempo(contador, 1)) {
      estado = 3;
      contador = 0;
    }
  } else if  (estado === 3 ) {
    contador++;

    let frameActual = floor(frameCount/20) % 2;
    dibujarCentrado(nintendoInicio[frameActual], 400, 300);

    if (pasaTiempo(contador, 3)) {
      estado = 4;
      contador = 0;
    }
  } else if  (estado === 4 ) {
    dibujarCentrado(nintendoInicio[1], 400, 300);
  }
}

function keyPressed() {
  if (key === ' ' && estado === 4  ) {
    reiniciarAnimacion();
  }
}
function reiniciarAnimacion() {
  estado = 0;
  contador = 0;
  personajeX = 400;
  personajeY = 170;
}

function pasaTiempo(contadorActual, segundos) {
  let objetivoTiempo = segundos * 60;
  return contadorActual >= objetivoTiempo;
}
function dibujarCentrado(imagen, x, y) {
  push();
  imageMode(CENTER);
  image(imagen, x, y);
  pop();
}
function dibujarEnBucle(imagenes, x, y, velocidad) {
  let frameActual = floor(frameCount/velocidad) % imagenes.length;
  image(imagenes[frameActual], x, y);
}
