// Initialize Three.js 3D Model
// function initThreeJS() {
//     const container = document.getElementById('three-d-container');

//     // Create a scene
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0x121212);

//     // Create a camera
//     const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
//     camera.position.z = 5;

//     // Create a renderer
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(container.clientWidth, container.clientHeight);
//     container.appendChild(renderer.domElement);

//     // Add lights
//     const ambientLight = new THREE.AmbientLight(0xffffff, 1);
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(5, 5, 5).normalize();
//     scene.add(directionalLight);

//     // Load the GLB model
//     const loader = new THREE.GLTFLoader(); // Ensure this is defined correctly
//     loader.load('assets/model.glb', function(gltf) {
//         const model = gltf.scene;
//         scene.add(model);

//         model.position.set(0, 0, 0);
//         model.scale.set(1, 1, 1); // Adjust scale if necessary

//         // Animate the model
//         function animate() {
//             requestAnimationFrame(animate);
//             model.rotation.y += 0.01;
//             renderer.render(scene, camera);
//         }

//         animate();
//     }, undefined, function(error) {
//         console.error('An error occurred:', error);
//     });
// }

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