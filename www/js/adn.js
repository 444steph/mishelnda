/* Environment Variable */
const updateFPS = 30;
const showMouse = true;
const bgColor = 'black';
let time = 0;





/* GUI Controls */
const controls = {
  // 頻率
  freq: 0.02,
  // 振幅
  amp: 30,
  // 雜訊
  noise: 30,
}

const gui = new dat.GUI();
gui.add(controls, 'freq', 0, 1).step(0.01).onChange((value) => {});
gui.add(controls, 'amp', 0, 30).step(0.01).onChange((value) => {});
gui.add(controls, 'noise', 0, 150).step(0.01).onChange((value) => {});





/* 2D Vector Class */
class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }
  move(x, y) {
    this.x += x;
    this.y += y;
  }
  add(v) {
    return new Vec2(this.x + v.x, this.y + v.y);
  }
  sub(v) {
    return new Vec2(this.x - v.x, this.y - v.y);
  }
  mul(s) {
    return new Vec2(this.x * s, this.y * s);
  }
  clone() {
    return new Vec2(this.x, this.y);
  }
  equal(v) {
    return this.x === v.x && this.y === v.y;
  }
  toString() {
    return `(${this.x}, ${this.y})`;
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  set length(newVal) {
    const newLength = this.unit.mul(newVal);
    this.set(newLength.x, newLength.y);
  }
  get angle() {
    return Math.atan2(this.y, this.x);
  }
  get unit() {
    return this.mul(1 / this.length);
  }
}





/* Initialize Canvas Settings */
const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
let ww;
let wh;

ctx.circle = function(v, r) {
  this.arc(v.x, v.y, r, 0, Math.PI * 2);
}
ctx.line = function(v1, v2) {
  this.moveTo(v1.x, v1.y);
  this.lineTo(v2.x, v2.y);
}

function initCanvas() {
  ww = canvas.width = document.documentElement.clientWidth;
  wh = canvas.height = document.documentElement.clientHeight;
}
initCanvas();





/* Initialize Game Logic */
function init() {
  
}





/* Update Game Logic */
function update() {
  time += 1;
}





/* Update Picture */
function draw() {
  // clear background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, ww, wh);

  // draw here
  // 雜訊
  ctx.beginPath();
  for (let i = 0; i < ww; i += 1) {
    const deg = i * controls.freq + time / 20;
    const wave = controls.amp * Math.sin(deg);
    const noise = controls.noise * Math.random();
    ctx.lineTo(i, wave + noise + wh / 2);
  }
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.stroke();
  
  // DNA 波
  ctx.beginPath();
  for (let i = 0; i < wh; i += 1) {
    const deg = i * controls.freq + time / 20;
    ctx.lineTo(controls.amp * Math.sin(deg) + ww / 2, i);
  }
  ctx.strokeStyle = 'white';
  ctx.stroke();
  
  // DNA 波（靜像）
  ctx.beginPath();
  for (let i = 0; i < wh; i += 1) {
    const deg = i * controls.freq + time / 20;
    // 加負號
    ctx.lineTo(-controls.amp * Math.sin(deg) + ww / 2, i);
  }
  ctx.stroke();
  
  // 連線
  ctx.beginPath();
  ctx.lineWidth = 1;
  for (let i = 0; i < wh; i += 15) {
    const deg = i * controls.freq + time / 20;
    const amp = controls.amp * Math.sin(deg);
    const x1 = ww / 2 + amp;
    const x2 = ww / 2 - amp;
    ctx.moveTo(x1, i);
    ctx.lineTo(x2, i);
    ctx.stroke();
    
    // 圓點
    ctx.beginPath();
    ctx.arc(x1, i, 3, 0, Math.PI * 2);
    ctx.arc(x2, i, Math.sin(i + time/ 10) + 5, 0, Math.PI * 2);
    ctx.fillStyle = `rgb(${i / 4}, ${i / 2}, ${50 + i / 1.5})`;
    ctx.fill();
  }

  // draw mouse
  ctx.fillStyle= 'red';
  ctx.beginPath();
  ctx.circle(mouseMovePos, 3);
  ctx.fill();

  ctx.save();
    ctx.translate(mouseMovePos.x, mouseMovePos.y);
      ctx.strokeStyle = 'red';
      const length = 20;
      ctx.beginPath();
      ctx.fillText(mouseMovePos, 10, -10);
      ctx.line(new Vec2(-length, 0), new Vec2(length, 0));
      ctx.rotate(Math.PI / 2);
      ctx.line(new Vec2(-length, 0), new Vec2(length, 0));
      ctx.stroke();
  ctx.restore();
  
  requestAnimationFrame(draw);
}





/* Page Loaded */
function loadHandler() {
  initCanvas();
  init();
  requestAnimationFrame(draw);
  setInterval(update, 1000 / updateFPS);
}

// load & resize event
window.addEventListener('load', loadHandler);
window.addEventListener('resize', initCanvas);





/* Mouse Events & Recording */
const mouseMovePos = new Vec2(0, 0);
let mouseUpPos = new Vec2(0, 0);
let mouseDownPos = new Vec2(0, 0);

window.addEventListener('mousemove', mouseMoveHandler);
window.addEventListener('mouseup', mouseUpHandler);
window.addEventListener('mousedown', mouseDownHandler);

function mouseMoveHandler(evt) {
  mouseMovePos.set(evt.x, evt.y);
}
function mouseUpHandler(evt) {
  mouseUpPos = mouseMovePos.clone();
}
function mouseDownHandler(evt) {
  mouseDownPos = mouseMovePos.clone();
}