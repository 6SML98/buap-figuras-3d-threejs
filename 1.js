// Obtener el canvas por su ID
const canvas = document.getElementById('myCanvas');


// Crear el renderizador y establecer el canvas como el lienzo de renderizado
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, Math.max(200, window.innerHeight - 100));

// Crear la escena
const scene = new THREE.Scene();

// Crear la cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / Math.max(200, window.innerHeight - 100), 0.1, 1000);
camera.position.z = 5;

// Crear figuras geométricas
const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry1, material1);
cube.position.x = -2;
scene.add(cube);

const geometry2 = new THREE.SphereGeometry(0.5, 32, 32);
const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const sphere = new THREE.Mesh(geometry2, material2);
sphere.position.x = 2;
scene.add(sphere);

const geometry3 = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cylinder = new THREE.Mesh(geometry3, material3);
cylinder.position.y = 2;
scene.add(cylinder);

const geometry4 = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
const material4 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const torus = new THREE.Mesh(geometry4, material4);
torus.position.y = -2;
scene.add(torus);

const geometry5 = new THREE.DodecahedronGeometry(0.7);
const material5 = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const dodecahedron = new THREE.Mesh(geometry5, material5);
dodecahedron.position.z = -4;
scene.add(dodecahedron);




const animate = () => {
    requestAnimationFrame(animate);
  
    // Movimiento del cubo
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
  
    // Movimiento de la esfera
    sphere.rotation.x += 0.02; // Puedes ajustar la velocidad de rotación modificando el valor aquí
  sphere.rotation.y += 0.02;

    // Movimiento del cilindro
    cylinder.position.z = 2 * Math.sin(Date.now() * 0.002); // Movimiento hacia atrás y adelante
  cylinder.rotation.y -= 0.01;

    // Movimiento del toro
    torus.position.y = 2 * Math.sin(Date.now() * 0.001); // Movimiento de abajo a arriba
  torus.rotation.x += 0.01; // Rotación del toro en el eje x
  torus.rotation.y += 0.02;
  
    // Movimiento del dodecaedro
    dodecahedron.position.x = 3 * Math.sin(Date.now() * 0.001); // Cambia la amplitud para el movimiento
  dodecahedron.rotation.y += 0.01; 

    renderer.render(scene, camera);
  };
  
  // Llamar a la función para iniciar la animación
  animate();

  
// Crear luces
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(-1, -1, -1);
scene.add(pointLight);

// Asociar luces a cada figura
cube.add(directionalLight.clone()); // Clonar y asociar la luz direccional al cubo
cube.add(pointLight.clone()); // Clonar y asociar la luz puntual al cubo

sphere.add(directionalLight.clone()); // Clonar y asociar la luz direccional a la esfera
sphere.add(pointLight.clone()); // Clonar y asociar la luz puntual a la esfera

cylinder.add(directionalLight.clone()); // Clonar y asociar la luz direccional al cilindro
cylinder.add(pointLight.clone()); // Clonar y asociar la luz puntual al cilindro

torus.add(directionalLight.clone()); // Clonar y asociar la luz direccional al toro
torus.add(pointLight.clone()); // Clonar y asociar la luz puntual al toro

dodecahedron.add(directionalLight.clone()); // Clonar y asociar la luz direccional al dodecaedro
dodecahedron.add(pointLight.clone()); // Clonar y asociar la luz puntual al dodecaedro

/////////////////////////////7
const canvasTextureCube = document.createElement('canvas');
const ctxCube = canvasTextureCube.getContext('2d');
canvasTextureCube.width = 512;
canvasTextureCube.height = 512;

// Colores para cada cara del cubo
const colorsCube = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']; // Rojo, Verde, Azul, Amarillo, Magenta, Cian

// Dibujar líneas diagonales con colores diferentes para cada cara del cubo
for (let i = 0; i < colorsCube.length; i++) {
    ctxCube.fillStyle = colorsCube[i];
    ctxCube.fillRect(i * (canvasTextureCube.width / colorsCube.length), 0, canvasTextureCube.width / colorsCube.length, canvasTextureCube.height);
    ctxCube.beginPath();
    ctxCube.moveTo(0, i * (canvasTextureCube.height / colorsCube.length));
    ctxCube.lineTo(canvasTextureCube.width, i * (canvasTextureCube.height / colorsCube.length));
    ctxCube.strokeStyle = '#ffffff'; // Color de las líneas
    ctxCube.lineWidth = 5;
    ctxCube.stroke();
}

const cubeMaterialWithTexture = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvasTextureCube) });
cube.material = cubeMaterialWithTexture;

//////////////////////77777

const canvasTextureSphere = document.createElement('canvas');
const ctxSphere = canvasTextureSphere.getContext('2d');
canvasTextureSphere.width = 512;
canvasTextureSphere.height = 512;

// Colores para el patrón de espiral
const c1 = '#00FFF3'; // Rojo
const c2 = '#8F00FF'; // Azul

// Dibujar un patrón de espiral en la textura de la esfera
const centerX = canvasTextureSphere.width / 2;
const centerY = canvasTextureSphere.height / 2;
const numLoops = 10;
const maxRadius = Math.min(centerX, centerY);
const numSegments = 200;

for (let i = 0; i < numSegments; i++) {
    const angle = (i / numSegments) * numLoops * Math.PI * 2;
    const radius = i * maxRadius / numSegments;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    const gradient = ctxSphere.createRadialGradient(x, y, 0, x, y, 20);
    gradient.addColorStop(0, i % 2 === 0 ? c1 : c2);
    gradient.addColorStop(1, i % 2 === 0 ? c2 : c1);

    ctxSphere.fillStyle = gradient;
    ctxSphere.beginPath();
    ctxSphere.arc(x, y, 20, 0, Math.PI * 2);
    ctxSphere.fill();
}

const sphereMaterialWithTexture = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvasTextureSphere) });
sphere.material = sphereMaterialWithTexture;


//////////////////////////////////////////

const canvasTextureCylinder = document.createElement('canvas');
const ctxCylinder = canvasTextureCylinder.getContext('2d');
canvasTextureCylinder.width = 512;
canvasTextureCylinder.height = 512;

// Colores para el patrón de celdas
const color1 = '#0000FF'; // Rojo
const color2 = '#E8FF00'; // Azul

// Dibujar un patrón de celdas alternadas en dos colores para la textura del cilindro
const cellSize = 50;

for (let x = 0; x < canvasTextureCylinder.width; x += cellSize) {
    for (let y = 0; y < canvasTextureCylinder.height; y += cellSize) {
        ctxCylinder.fillStyle = (x + y) % (cellSize * 2) === 0 ? color1 : color2;
        ctxCylinder.fillRect(x, y, cellSize, cellSize);
    }
}

const cylinderMaterialWithTexture = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvasTextureCylinder) });
cylinder.material = cylinderMaterialWithTexture;


//////////////////////////////////////

const canvasTextureTorus = document.createElement('canvas');
const ctxTorus = canvasTextureTorus.getContext('2d');
canvasTextureTorus.width = 512;
canvasTextureTorus.height = 512;

// Crea un patrón de líneas diagonales en el canvas para el toro
ctxTorus.fillStyle = '#00FF87'; // Magenta de fondo
ctxTorus.fillRect(0, 0, canvasTextureTorus.width, canvasTextureTorus.height);
ctxTorus.strokeStyle = '#FF0000'; // Líneas negras
ctxTorus.lineWidth = 4;

for (let i = 0; i < canvasTextureTorus.width + canvasTextureTorus.height; i += 20) {
    ctxTorus.beginPath();
    ctxTorus.moveTo(i, 0);
    ctxTorus.lineTo(0, i);
    ctxTorus.stroke();
}

const torusMaterialWithTexture = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(canvasTextureTorus) });
torus.material = torusMaterialWithTexture;
////////////////////////////////////////7

// Crear una textura de cuadros blancos y negros más pequeños para el dodecaedro
const canvasTextureDodecahedron = document.createElement('canvas');
const ctxDodecahedron = canvasTextureDodecahedron.getContext('2d');
canvasTextureDodecahedron.width = 512;
canvasTextureDodecahedron.height = 512;

// Tamaño más pequeño del cuadro
const squareSize = 16;
const halfSquareSize = squareSize / 2;

// Crear una textura de cuadros naranjas y azules para el dodecaedro
for (let x = 0; x < canvasTextureDodecahedron.width; x += squareSize) {
    for (let y = 0; y < canvasTextureDodecahedron.height; y += squareSize) {
        const isOrange = (x + y) % (2 * squareSize) === 0; // Alternar entre naranja y azul

        if ((x / squareSize + y / squareSize) % 2 === 0) {
            ctxDodecahedron.fillStyle = isOrange ? '#FFA500' : '#0000FF'; // Cuadro naranja o azul
        } else {
            ctxDodecahedron.fillStyle = isOrange ? '#0000FF' : '#FFA500'; // Cuadro azul o naranja
        }

        ctxDodecahedron.fillRect(x, y, halfSquareSize, halfSquareSize);
        ctxDodecahedron.fillRect(x + halfSquareSize, y + halfSquareSize, halfSquareSize, halfSquareSize);
    }
}


// Crear la textura a partir del canvas
const dodecahedronTexture = new THREE.CanvasTexture(canvasTextureDodecahedron);

// Aplicar la textura al material del dodecaedro
const dodecahedronMaterial = new THREE.MeshBasicMaterial({ map: dodecahedronTexture });
dodecahedron.material = dodecahedronMaterial;

window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = Math.max(200, window.innerHeight - 100);
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
