document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');

    // Simulate loading time
    setTimeout(function () {
        loader.style.display = 'none';
        content.style.display = 'block';
        initThreeJS(); // Initialize three.js after loading
    }, 2000); // 2 seconds delay for demonstration
});

function initThreeJS() {
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // White ambient light
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Initialize OrbitControls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping (inertia)
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.screenSpacePanning = false; // Disable panning

    // Load the MTL and OBJ files together
    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('assets/model.mtl', function (materials) {
        materials.preload();

        const objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('assets/model.obj', function (obj) {
            obj.scale.set(5, 5, 5); // Adjust the scale if needed
            scene.add(obj);

            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                obj.rotation.y += 0.01;
                controls.update(); // Update controls
                renderer.render(scene, camera);
            }

            animate();
        }, undefined, function (error) {
            console.error('An error occurred while loading the model:', error);
        });
    }, function (error) {
        console.error('An error occurred while loading the materials:', error);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}