'use strict';

class SnowEffect {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d', { willReadFrequently: false, alpha: false });
        
        // Style the canvas
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.backgroundColor = 'rgba(255,0,0,0.1)';
        
        this.container.appendChild(this.canvas);
        
        // Initialize properties
        this.w = 0;
        this.h = 0;
        this.center = { x: 0, y: 0 };
        this.particleAmount = 75000;
        this.particlePropertiesAmount = 7;
        this.particleHolderLength = this.particleAmount * this.particlePropertiesAmount;
        this.particleHolder = null;
        this.particleSpeedFactor = 10;
        this.particlesRGBMax = 255;
        this.particlesRGBMin = 200;
        this.deltaTime = 0.175;
        this.waveFrequency = 0.005;
        this.waveAmplitude = 2;
        this.windStrength = 0.25;
        this.mouseInfluence = 0.25;
        this.pointerEasing = 0.15;
        this.buffer = null;
        this.bufferBorder = 0;
        this.particleColor = { r: 255, g: 59, b: 48 };
        
        // Mouse/touch interaction
        this.pointer = { x: 0, y: 0 };
        this.pointerPos = { x: 0, y: 0 };
        this.pointerActive = false;
        
        // Setup
        this.init();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        this.onResize();
        this.setSinusTable();
        this.setParticles();
        this.setClearImageData();
    }
    
    onResize() {
        const rect = this.container.getBoundingClientRect();
        this.w = rect.width;
        this.h = rect.height;
        
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        
        this.center.x = this.w / 2;
        this.center.y = this.h / 2;
        
        this.pointer.x = this.center.x;
        this.pointerPos.x = this.center.x;
        
        this.imageData = this.context.getImageData(0, 0, this.w, this.h);
        this.data = this.imageData.data;
        this.buffer = new Uint8Array(this.w * this.h);
        this.buffer.fill(0);
        this.bufferBorder = this.h;
    }
    
    setupEventListeners() {
        console.log('Setting up event listeners');
        console.log('Canvas element:', this.canvas);
        
        if ('ontouchstart' in window) {
            this.container.addEventListener('touchmove', (e) => this.handlePointerMove(e), false);
            this.container.addEventListener('touchend', () => this.handlePointerLeave(), false);
        } else {
            this.container.addEventListener('mousemove', (e) => this.handlePointerMove(e), false);
            this.container.addEventListener('mouseleave', () => this.handlePointerLeave(), false);
        }
        
        window.addEventListener('resize', () => this.onResize(), false);
    }
    
    handlePointerMove(event) {
        event.preventDefault();
        
        console.log('Pointer move detected', {
            active: this.pointerActive,
            pos: this.pointerPos,
            event: event
        });
        
        this.pointerActive = true;
        const rect = this.container.getBoundingClientRect();
        if (event.touches) {
            this.pointerPos.x = event.touches[0].clientX - rect.left;
            this.pointerPos.y = event.touches[0].clientY - rect.top;
        } else {
            this.pointerPos.x = event.clientX - rect.left;
            this.pointerPos.y = event.clientY - rect.top;
        }
    }
    
    handlePointerLeave() {
        console.log('Pointer leave detected');
        this.pointerActive = false;
        this.pointerPos.x = this.center.x;
    }
    
    setSinusTable() {
        this.sinTableLength = Math.ceil((2 * Math.PI) / this.waveFrequency);
        this.sinTable = new Float32Array(this.sinTableLength);
        
        for (let i = 0; i < this.sinTableLength; i++) {
            this.sinTable[i] = Math.sin(i * this.waveFrequency) * this.waveAmplitude;
        }
    }
    
    setParticles() {
        this.particleHolder = new Float32Array(this.particleHolderLength);
        
        for (let i = 0; i < this.particleHolderLength; i += this.particlePropertiesAmount) {
            const brightness = Math.floor((i / (this.particleHolderLength - 1)) * (this.particlesRGBMax - this.particlesRGBMin)) + this.particlesRGBMin;
            const speed = (brightness / 255) * this.particleSpeedFactor;
            
            this.particleHolder[i] = Math.random() * this.w; // x
            this.particleHolder[i + 1] = Math.random() * this.h; // y
            this.particleHolder[i + 2] = speed; // velocity
            this.particleHolder[i + 3] = (this.particleColor.r * brightness) / 255; // r
            this.particleHolder[i + 4] = (this.particleColor.g * brightness) / 255; // g
            this.particleHolder[i + 5] = (this.particleColor.b * brightness) / 255; // b
            this.particleHolder[i + 6] = Math.random(); // start time
        }
    }
    
    setClearImageData() {
        this.clearRow = new Uint8ClampedArray(this.w * 4);
        for (let i = 0; i < this.w * 4; i += 4) {
            this.clearRow[i] = 17;     // R
            this.clearRow[i + 1] = 17; // G
            this.clearRow[i + 2] = 17; // B
            this.clearRow[i + 3] = 255; // A
        }
    }
    
    clearImageData() {
        for (let y = 0; y < this.h; y++) {
            this.data.set(this.clearRow, y * this.w * 4);
        }
    }
    
    update() {
        this.clearImageData();
        
        if (this.pointerActive) {
            this.pointer.x += (this.pointerPos.x - this.pointer.x) * this.pointerEasing;
        } else {
            this.pointer.x += (this.center.x - this.pointer.x) * 0.02;
        }
        
        const distX = this.pointer.x - this.center.x;
        
        for (let i = 0; i < this.particleHolderLength; i += this.particlePropertiesAmount) {
            let x = this.particleHolder[i];
            let y = this.particleHolder[i + 1];
            const vy = this.particleHolder[i + 2];
            const r = this.particleHolder[i + 3];
            const g = this.particleHolder[i + 4];
            const b = this.particleHolder[i + 5];
            const startTime = this.particleHolder[i + 6];
            
            const t = y / this.h;
            
            let vx = distX * this.windStrength * t;
            
            const dx = x - this.pointer.x;
            const dy = y - this.pointerPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const influence = Math.max(0, 1 - distance / (this.w * 0.2));
            
            vx += (dx * influence * this.mouseInfluence);
            
            const time = startTime + t;
            const sinIndex = ((time * this.sinTableLength) | 0) % this.sinTableLength;
            vx += this.sinTable[sinIndex] * t;
            
            x += vx * this.deltaTime * 1.5;
            y += vy * this.deltaTime;
            
            if (x > this.w) x = 0;
            if (x < 0) x = this.w;
            if (y > this.h) y = 0;
            
            this.particleHolder[i] = x;
            this.particleHolder[i + 1] = y;
            
            const xRounded = x | 0;
            const yRounded = y | 0;
            
            if (xRounded >= 0 && xRounded < this.w && yRounded >= 0 && yRounded < this.h) {
                const indexBuffer = xRounded + yRounded * this.w;
                const indexBufferBottom = xRounded + (yRounded + 1) * this.w;
                
                // Check neighboring pixels for more natural accumulation
                const leftPixel = xRounded > 0 ? this.buffer[indexBuffer - 1] : 0;
                const rightPixel = xRounded < this.w - 1 ? this.buffer[indexBuffer + 1] : 0;
                const bottomPixel = this.buffer[indexBufferBottom];
                
                // Create more natural snow piling
                if (yRounded === this.h - 1 || bottomPixel === 1) {
                    // Check height difference with neighbors
                    const leftHeight = this.getSnowHeight(xRounded - 1, yRounded);
                    const rightHeight = this.getSnowHeight(xRounded + 1, yRounded);
                    const currentHeight = this.getSnowHeight(xRounded, yRounded);
                    
                    // Only accumulate if it wouldn't create too steep a slope
                    if (currentHeight <= leftHeight + 2 && currentHeight <= rightHeight + 2) {
                        this.buffer[indexBuffer] = 1;
                        y = 0;
                        this.particleHolder[i + 1] = y;
                    }
                }
                
                const index = indexBuffer * 4;
                this.data[index] = r;
                this.data[index + 1] = g;
                this.data[index + 2] = b;
                this.data[index + 3] = 255;
            }
        }
        
        // Draw accumulated snow
        for (let i = 0; i < this.buffer.length; i++) {
            if (this.buffer[i] === 1) {
                const index = i * 4;
                this.data[index] = this.particleColor.r;
                this.data[index + 1] = this.particleColor.g;
                this.data[index + 2] = this.particleColor.b;
                this.data[index + 3] = 255;
            }
        }
        
        this.context.putImageData(this.imageData, 0, 0);
    }
    
    animate() {
        this.update();
        requestAnimationFrame(() => this.animate());
    }
    
    getSnowHeight(x, y) {
        if (x < 0 || x >= this.w) return 0;
        
        let height = 0;
        while (y >= 0 && this.buffer[x + y * this.w] === 1) {
            height++;
            y--;
        }
        return height;
    }
} 