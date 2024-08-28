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

    // Add a basic ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add a directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(directionalLight);

    // Load the GLB model
    const loader = new THREE.GLTFLoader();
    loader.load('assets/model.glb', function(gltf) {
        const model = gltf.scene;
        scene.add(model);
        
        // Optional: Adjust model position, scale, or rotation
        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1); // Adjust scale if necessary

        // Animate the model (e.g., rotate)
        function animate() {
            requestAnimationFrame(animate);

            // Example animation: rotate model
            model.rotation.y += 0.01;

            renderer.render(scene, camera);
        }

        animate();
    }, undefined, function(error) {
        console.error('An error happened while loading the model:', error);
    });
}
