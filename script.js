document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  const colors = ['#ffffff']; // Puedes agregar más colores si lo deseas
  const lines = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Line {
    constructor() {
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
      this.angle = Math.random() * 2 * Math.PI;
      this.length = Math.random() * (canvas.width + canvas.height) / 4;
      this.speed = Math.random() * 2 + 1;
    }

    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.length += 2;

      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + Math.cos(this.angle) * this.length, this.y + Math.sin(this.angle) * this.length);
      ctx.stroke();
    }
  }

  function createLines() {
    for (let i = 0; i < 50; i++) {
      lines.push(new Line());
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    lines.forEach(line => {
      line.update();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    lines.length = 0; // Limpiar el array de líneas al cambiar el tamaño de la ventana
    createLines(); // Volver a crear líneas con el nuevo tamaño de la ventana
  });

  createLines();
  draw();
});
