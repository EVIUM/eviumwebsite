(function () {
  'use strict';
  window.addEventListener('load', function () {
    var canvas1 = document.getElementById('canvas1');

    if (!canvas1 || !canvas1.getContext) {
      return false;
    }

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var ctx = canvas1.getContext('2d');
    var X = canvas1.width = window.innerWidth;
    var Y = canvas1.height = window.innerHeight;
    var mouseX = X;
    var mouseY = Y;
    var shapeNum = 30;
    var shapes = [];
    var startColor = rand(0, 360);
    var style = {
      black: 'black',
      white: 'white',
      lineWidth: 4,
    };
    
    if (X < 768) {
      shapeNum = 30;
    }

    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(cb) {
        setTimeout(cb, 17);
      };
     
    function Shape(ctx, x, y, c) {
      this.ctx = ctx;
      this.init(x, y, c);
    }
    
    Shape.prototype.init = function(x, y, c) {
      this.x = x;
      this.y = y;
      this.c = c;
      this.r = rand(1, 2);
      this.l = rand(0, 100);
      this.sl = this.l;
      this.ga = Math.random();
      this.v = {
        x: rand(-1, 1) * Math.random(),
        y: 0
      };
    };

    Shape.prototype.draw = function() {
      var ctx  = this.ctx;
      ctx.save();
      ctx.globalAlpha = this.ga;
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = 'hsl(' + this.c  + ', 80%, 60%)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.restore();
    };

    Shape.prototype.updateParams = function() {
      var ratio = this.l / this.sl * 1.1;
      this.r *= ratio;
      this.x += this.v.x;
      this.v.y = Y / 2 - this.y;
      this.y += this.v.y / 160;
      this.l -= 1;
      if (this.l < 0) {
        this.c += 10;
        this.init(rand(0, X), Y / 2 * Math.random(), this.c);
      }
    };

    Shape.prototype.render = function(i) {
      this.updateParams();
      this.draw();
      ctx.translate(0, Y);
      ctx.scale(1, -1);
      this.draw();
    };

    for (var i = 0; i < shapeNum; i++) {
      var s = new Shape(ctx, rand(0, X), Y / 2 * Math.random(), startColor);
      shapes.push(s);
    }
    
    function render() {
      //ctx.clearRect(0, 0, X, Y);
      ctx.globalCompositeOperation = "darken";
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = "rgb(0,0,0)";
      ctx.fillRect(0, 0, X, Y);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      for (var i = 0; i < shapes.length; i++) {
        shapes[i].render(i);
      }
      requestAnimationFrame(render);
    }

    render();
    
    function onResize() {
      X = canvas1.width = window.innerWidth;
      Y = canvas1.height = window.innerHeight;
      if (X < 768) {
        shapeNum = 30;
      } else {
        shapeNum = 30;
      }
    }

    window.addEventListener('resize', function() {
      onResize();
    });

    window.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, false);

  });
})();