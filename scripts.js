// JavaScript to handle loading screen
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');

    // Simulate loading time
    setTimeout(function() {
        loader.style.display = 'none';
        content.style.display = 'block';
        initThreeJS(); // Initialize three.js after loading
    }, 2000); // 2 seconds delay for demonstration
});

// Initialize Three.js 3D Model
function initThreeJS() {
    const container = document.getElementById('three-d-container');
    
    // Create a scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121212);

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Add a basic cube geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();
}
