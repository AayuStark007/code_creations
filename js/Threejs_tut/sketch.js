'use strict';

/* global THREE */

function makeInstance(scene, geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
}

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio;
    const height = canvas.clientHeight * pixelRatio;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

function addObject(scene, x, y, obj, objects, spread) {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objects.push(obj);
}

function createMaterial() {
    const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = 0.5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
}

function addSolidGeometry(scene, x, y, geometry, objects, spread) {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(scene, x, y, mesh, objects, spread);
}

function main() {
    // Setup Canvas
    const canvas = document.querySelector('#c');
    // Setup Renderer
    const renderer = new THREE.WebGLRenderer({canvas});

    // Setup Camera
    const fov = 40;
    const aspect = 2;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 120;

    // Create Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xAAAAAA);

    // Add Objects
    const objects = [];
    const spread = 15;

    const width = 8;
    const height = 8;
    const depth = 8;
    addSolidGeometry(scene, -2, -2, new THREE.BoxBufferGeometry(width, height, depth), objects, spread);

    // Directional Light
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    function render(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        objects.forEach((obj, ndx) => {
            const speed = 1 + ndx * 0.1;
            const rot = time * speed;
            obj.rotation.x = rot;
            obj.rotation.y = rot;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();