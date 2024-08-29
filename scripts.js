document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('three-d-container');

    // Create a scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121212); // Dark background color

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Initialize OrbitControls for interaction
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    // Load the GLB model using GLTFLoader
    const loader = new THREE.GLTFLoader();
    loader.load('assets/model.glb', function(gltf) {
        const model = gltf.scene;
        scene.add(model);

        // Scale the model
        model.scale.set(5, 5, 5);

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            controls.update(); // Update controls
            renderer.render(scene, camera);
        }

        animate();
    }, undefined, function(error) {
        console.error('An error occurred while loading the model:', error);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
});