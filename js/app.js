//Selectores
const btnStart = document.getElementById("btnEmpezar");
const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");

class Juego {
  constructor() {
    this.inicializador();
    this.generarSecuencia();
    this.siguienteNivel();
  }
  inicializador() {
    this.elegirColor = this.elegirColor.bind(this);
    btnStart.classList.add("hide");
    this.nivel = 1;
    this.colores = {
      naranja,
      verde,
      violeta,
      celeste,
    };
  }

  generarSecuencia() {
    this.secuencia = new Array(10)
      .fill(0)
      .map((n) => Math.floor(4 * Math.random()));
  }
  siguienteNivel() {
    this.iluminarSecuencia();
    this.agregarEventosClick();
  }

  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return "celeste";
      case 1:
        return "naranja";
      case 2:
        return "violeta";
      case 3:
        return "verde";
    }
  }
  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), 1000 * i);
    }
  }
  iluminarColor(color) {
    this.colores[color].classList.add("light");
    setTimeout(() => {
      this.apagarColor(color);
    }, 500);
  }
  apagarColor(color) {
    this.colores[color].classList.remove("light");
  }
  agregarEventosClick() {
    this.colores.celeste.addEventListener("click", this.elegirColor);
    this.colores.verde.addEventListener("click", this.elegirColor);
    this.colores.naranja.addEventListener("click", this.elegirColor);
    this.colores.violeta.addEventListener("click", this.elegirColor);
  }
  elegirColor(evento) {
    console.log(this);
  }
}
function empezarJuego() {
  const juego = new Juego();
}
