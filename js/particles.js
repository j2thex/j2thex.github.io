var NUM_PARTICLES = ((ROWS = 50) * (COLS = 150)),
    THICKNESS = Math.pow(80, 2),
    SPACING = 3,
    MARGIN = 0,
    COLOR = 40,
    DRAG = 0.95,
    EASE = 0.25;

var particle = {
    vx: 0,
    vy: 0,
    x: 0,
    y: 0
};

function initParticles() {
    var container = document.querySelector('.particle-container');
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var man = false;
    var tog = true;
    var list = [];
    var w, h;
    var mx, my;
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    
    function resize() {
        w = canvas.width = container.offsetWidth;
        h = canvas.height = container.offsetHeight;
        
        var xSpacing = w / COLS;
        var ySpacing = h / ROWS;
        
        for (var i = 0; i < NUM_PARTICLES; i++) {
            var p = Object.create(particle);
            p.x = p.ox = (i % COLS) * xSpacing;
            p.y = p.oy = Math.floor(i / COLS) * ySpacing;
            list[i] = p;
        }
    }
    
    container.addEventListener('mousemove', function(e) {
        var bounds = container.getBoundingClientRect();
        mx = e.clientX - bounds.left;
        my = e.clientY - bounds.top;
        man = true;
    });
    
    container.addEventListener('mouseleave', function() {
        man = false;
        for (var i = 0; i < NUM_PARTICLES; i++) {
            var p = list[i];
            p.vx = 0;
            p.vy = 0;
        }
    });
    
    container.appendChild(canvas);
    resize();
    window.addEventListener('resize', resize);
    
    function step() {
        if (tog = !tog) {
            if (man) {
                for (i = 0; i < NUM_PARTICLES; i++) {
                    p = list[i];
                    d = (dx = mx - p.x) * dx + (dy = my - p.y) * dy;
                    f = -THICKNESS / d;
                    
                    if (d < THICKNESS) {
                        t = Math.atan2(dy, dx);
                        p.vx += f * Math.cos(t);
                        p.vy += f * Math.sin(t);
                    }
                    
                    p.x += (p.vx *= DRAG) + (p.ox - p.x) * EASE;
                    p.y += (p.vy *= DRAG) + (p.oy - p.y) * EASE;
                }
            } else {
                for (i = 0; i < NUM_PARTICLES; i++) {
                    p = list[i];
                    p.x += (p.ox - p.x) * 0.05;
                    p.y += (p.oy - p.y) * 0.05;
                }
            }
        } else {
            b = (a = ctx.createImageData(w, h)).data;
            
            for (i = 0; i < NUM_PARTICLES; i++) {
                p = list[i];
                if (p.x >= 0 && p.x < w && p.y >= 0 && p.y < h) {
                    n = (~~p.x + (~~p.y * w)) * 4;
                    b[n] = COLOR;
                    b[n+1] = COLOR;
                    b[n+2] = COLOR;
                    b[n+3] = 255;
                }
            }
            
            ctx.putImageData(a, 0, 0);
        }
        requestAnimationFrame(step);
    }
    
    step();
}

document.addEventListener('DOMContentLoaded', initParticles); 