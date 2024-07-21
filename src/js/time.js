import { FOURTEEN_DAYS } from "./config.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

class Time {
  ////// DOM
  _type = this._type || "";

  ////// DATA
  _future = new Date(Date.now() + FOURTEEN_DAYS);

  constructor() {
    if (this._type !== "") {
      this.domSetup();
      this.timer();
      this.startInterval();
    }
  }
  domSetup() {
    //prettier-ignore
    this._displayTop = document.getElementById(this._type)?.querySelector(".display-segment-top")
    //prettier-ignore
    this._displayBottom = document.getElementById(this._type)?.querySelector(".display-segment-bottom");
    //prettier-ignore
    this._overlayTop = document.getElementById(this._type)?.querySelector(".overlay-segment-top");
    //prettier-ignore
    this._overlayBottom = document.getElementById(this._type)?.querySelector(".overlay-segment-bottom");
    //prettier-ignore
    this._displaySegment = document.getElementById(this._type)?.querySelector('.display-segment')
  }
  timer(_type) {
    const now = Date.now();
    let output = "";
    const diffTime = this._future - now;
    /// end timer
    if (now > this._future) return;
    if (this._type === "seconds")
      output = Math.floor((diffTime % (1000 * 60)) / 1000);
    if (this._type === "minutes")
      output = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    if (this._type === "hours")
      output = Math.floor(
        (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
    if (this._type === "days")
      output = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (
      !this._overlayTop.classList.contains("flip") &&
      !this._overlayBottom.classList.contains("flip")
    ) {
      this._displayTop.textContent = output;
      this._overlayTop.textContent = output;
      this._overlayBottom.textContent = output;
      ///////////// add data-attributes /////////
      this._displaySegment.dataset.output = output;
      ///////////// add class ////////////
      // debugger;
      const mutationObserver = new MutationObserver((entries) => {
        if (this._displaySegment.dataset.output !== entries[0].oldValue) {
          this._overlayTop.classList.add("flip");
          this._overlayBottom.classList.add("flip");
        }
      });

      mutationObserver.observe(this._displaySegment, {
        attributes: true,
        attributeOldValue: true,
      });
    } else {
      this._displayBottom.textContent = output;
      ///////////// remove class ////////////
      this._overlayTop.classList.remove("flip");
      this._overlayBottom.classList.remove("flip");
    }
  }
  startInterval() {
    setInterval(this.timer.bind(this), 500);
  }
}

//////////// implement seconds /////////
class Seconds extends Time {
  constructor() {
    super();
    this._type = "seconds";
    this.domSetup();
    this.timer();
    this.startInterval();
  }
}
const seconds = new Seconds();

//////////// implement minutes /////////
class Minutes extends Time {
  constructor() {
    super();
    this._type = "minutes";
    this.domSetup();
    this.timer();
    this.startInterval();
  }
}
const minutes = new Minutes();

//////////// implement hours /////////
class Hours extends Time {
  constructor() {
    super();
    this._type = "hours";
    this.domSetup();
    this.timer();
    this.startInterval();
  }
}
const hours = new Hours();

//////////// implement days /////////
class Days extends Time {
  constructor() {
    super();
    this._type = "days";
    this.domSetup();
    this.timer();
    this.startInterval();
  }
}
const days = new Days();
