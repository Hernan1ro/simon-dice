//Selectores
const btnStart = document.getElementById("btnEmpezar");
const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const contadorNivel = document.querySelector(".nivel");

const ultimoNivel = 10;
class Juego {
  constructor() {
    this.inicializador = this.inicializador.bind(this);
    this.inicializador();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel(), 500);
  }
  inicializador() {
    this.limpiarHtml();
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.elegirColor = this.elegirColor.bind(this);
    this.toggleBtnEmpezar();
    this.nivel = 1;
    this.colores = {
      naranja,
      verde,
      violeta,
      celeste,
    };
  }
  limpiarHtml() {
    contadorNivel.innerHTML = "Nivel";
  }
  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains("hide")) {
      btnStart.classList.remove("hide");
    } else {
      btnStart.classList.add("hide");
    }
  }
  generarSecuencia() {
    this.secuencia = new Array(ultimoNivel)
      .fill(0)
      .map((n) => Math.floor(4 * Math.random()));
  }
  siguienteNivel() {
    this.subnivel = 0;
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
  transformarColorANumero(color) {
    switch (color) {
      case "celeste":
        return 0;
      case "naranja":
        return 1;
      case "violeta":
        return 2;
      case "verde":
        return 3;
    }
  }
  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      this.modificarNivelHtml(this.nivel);
      const color = this.transformarNumeroAColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), 1000 * i);
    }
  }
  modificarNivelHtml(nivel) {
    contadorNivel.innerHTML = `Nivel: ${nivel}`;
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
  eliminarEventosClick() {
    this.colores.celeste.removeEventListener("click", this.elegirColor);
    this.colores.verde.removeEventListener("click", this.elegirColor);
    this.colores.naranja.removeEventListener("click", this.elegirColor);
    this.colores.violeta.removeEventListener("click", this.elegirColor);
  }
  elegirColor(evento) {
    const nombreColor = evento.target.dataset.color;
    const numeroColor = this.transformarColorANumero(nombreColor);
    this.iluminarColor(nombreColor);
    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++;
      if (this.subnivel === this.nivel) {
        this.nivel++;
        // this.eliminarEventosClick()
        if (this.nivel === ultimoNivel + 1) {
          this.ganodElJuego();
        } else {
          setTimeout(this.siguienteNivel, 1500);
        }
      }
    } else {
      this.perdioElJuego();
    }
  }
  ganodElJuego() {
    swal("¡Woah!", "Felicitaciones, ganaste el juego!", "success").then(
      this.inicializador
    );
  }
  perdioElJuego() {
    swal(
      "Perdiste el juego hue hue",
      "¿Eso es todo lo que tienes?",
      "error"
    ).then(() => {
      this.eliminarEventosClick();
      this.inicializador();
    });
  }
}
function empezarJuego() {
  const juego = new Juego();
}
