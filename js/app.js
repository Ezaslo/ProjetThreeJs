import * as THREE from 'three';
import { OrbitControls } from './threejs/examples/jsm/controls/OrbitControls.js';
import { GUI } from './dat.gui/dat.gui.module.js';
import { Clock } from 'three';


var _scene // Scene
var _renderer // Renderer
var _camera // Camera
var _control // Controle de la camera
var _clock = new THREE.Clock() // Timer
var _elapsedTime = 0 
var _focusEnabledterre = false 
var _focusEnabledmars = false 
var _focusEnabledlune = false 
var _focusEnabledsaturne = false 

var _orbitterreMesh
var _orbitmarsMesh
var _orbitsaturneMesh
var _orbitluneMesh
var _terreMesh
var _luneMesh
var _marsMesh
var _saturneMesh
var _soleilMesh


//  Initialisation de la scene 3D
function InitScene() {

    // Initialisation de la scene
    _scene = new THREE.Scene()

    // Initialisation du renderer et activation de l'anti aliasing
    _renderer = new THREE.WebGLRenderer({ antialias: true });
    _renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(_renderer.domElement);

    // Initialisation et placement de la camera
    _camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    _camera.position.set(0, 2, 150);

    // Création du controle camera
    _control = new OrbitControls(_camera, _renderer.domElement);
    _control.enableDamping = true;
    _control.dampingFactor = 0.1;
    _control.enablePan = false;

    // Création des axes helper
    const GridHelper = new THREE.GridHelper(100,10)
    _scene.add(GridHelper);

    // chargement des textures pour l'espace
    const skydometexture = new THREE.TextureLoader().load("./assets/textures/space-background.jpg");
    skydometexture.wrapS = THREE.RepeatWrapping;
    skydometexture.wrapT = THREE.RepeatWrapping;
    skydometexture.repeat.set( 3,3 );

    // Création du skydome pour l'espace
    const skydomeGeo = new THREE.SphereGeometry(400,25,15);
    const skydomeMaterial = new THREE.MeshBasicMaterial({ map : skydometexture ,side: THREE.DoubleSide});
    const skydomeMesh = new THREE.Mesh(skydomeGeo,skydomeMaterial);
    _scene.add(skydomeMesh);

    // chargement de toutes les textures
    const soleiltexture = new THREE.TextureLoader().load("./assets/textures/sun-texture.jpg");
    soleiltexture.wrapS = THREE.RepeatWrapping;
    soleiltexture.wrapT = THREE.RepeatWrapping;
    soleiltexture.repeat.set( 3,3 );

    const terretexture = new THREE.TextureLoader().load("./assets/textures/earth-texture.jpg");
    terretexture.wrapS = THREE.RepeatWrapping;
    terretexture.wrapT = THREE.RepeatWrapping;
    terretexture.repeat.set( 3,3 );

    const marstexture = new THREE.TextureLoader().load("./assets/textures/mars-texture.jpg");
    marstexture.wrapS = THREE.RepeatWrapping;
    marstexture.wrapT = THREE.RepeatWrapping;
    marstexture.repeat.set( 3,3 );

    const saturnetexture = new THREE.TextureLoader().load("./assets/textures/saturn-texture.jpg");
    saturnetexture.wrapS = THREE.RepeatWrapping;
    saturnetexture.wrapT = THREE.RepeatWrapping;
    saturnetexture.repeat.set( 3,3 );

    const lunetexture = new THREE.TextureLoader().load("./assets/textures/moon-texture.jpg");
    lunetexture.wrapS = THREE.RepeatWrapping;
    lunetexture.wrapT = THREE.RepeatWrapping;
    lunetexture.repeat.set( 3,3 );

    const ringtexture = new THREE.TextureLoader().load("./assets/textures/saturn-ring-texture.png");
    // ringtexture.wrapS = THREE.RepeatWrapping;
    // ringtexture.wrapT = THREE.RepeatWrapping;
    // ringtexture.repeat.set( 3,3 );
    // Création du Soleil
    const soleilGeo = new THREE.SphereGeometry(30,64,32);
    const soleilMaterial = new THREE.MeshBasicMaterial({ map : soleiltexture ,side: THREE.DoubleSide});
        _soleilMesh = new THREE.Mesh(soleilGeo,soleilMaterial);
    _scene.add(_soleilMesh);

    // Création d'une lumiere pointLight
    const pointLight = new THREE.PointLight(0xFFFFFF, 2,300)
    pointLight.position.set(0, 0, 0)
    _scene.add(pointLight)

    // helper pointlight
    const dlHelper = new THREE.PointLightHelper(pointLight)
    _scene.add(dlHelper)


    // orbite terre
    const orbitterreGeo = new THREE.TorusGeometry(75, 0.2, 32, 200)
    orbitterreGeo.rotateX(-0.5*Math.PI)
    const orbitterreMat = new THREE.MeshLambertMaterial({ color: 0xDBDBDB, transparent : true, opacity : 0.2 })
    _orbitterreMesh = new THREE.Mesh(orbitterreGeo, orbitterreMat)
    _orbitterreMesh.position.set(0, 0, 0)
    _scene.add(_orbitterreMesh)

    // orbite mars
   
    const orbitmarsGeo = new THREE.TorusGeometry(100, 0.2, 32, 200)
    orbitmarsGeo.rotateX(-0.5*Math.PI)
    const orbitmarsMat = new THREE.MeshLambertMaterial({ color: 0xDBDBDB, transparent : true, opacity : 0.2 })
    _orbitmarsMesh = new THREE.Mesh(orbitmarsGeo, orbitmarsMat)
    _orbitmarsMesh.position.set(0, 0, 0)
    _scene.add(_orbitmarsMesh)
   
    // orbite saturne
   
    const orbitsaturneGeo = new THREE.TorusGeometry(160, 0.2, 32, 200)
    orbitsaturneGeo.rotateX(-0.5*Math.PI)
    const orbitsaturneMat = new THREE.MeshLambertMaterial({ color: 0xDBDBDB, transparent : true, opacity : 0.2 })
    _orbitsaturneMesh = new THREE.Mesh(orbitsaturneGeo, orbitsaturneMat)
    _orbitsaturneMesh.position.set(0, 0, 0)
    _scene.add(_orbitsaturneMesh)

    // Création de la terre
    const terreGeo = new THREE.SphereGeometry(5,64,32);
    const terreMaterial = new THREE.MeshStandardMaterial({ map : terretexture });
    _terreMesh = new THREE.Mesh(terreGeo,terreMaterial);
    _orbitterreMesh.add(_terreMesh)
    _terreMesh.position.x = 75
    

    // Création de mars
    const marsGeo = new THREE.SphereGeometry(3,64,32);
    const marsMaterial = new THREE.MeshStandardMaterial({ map : marstexture ,side: THREE.DoubleSide});
    _marsMesh = new THREE.Mesh(marsGeo,marsMaterial);
    _orbitmarsMesh.add(_marsMesh)
    _marsMesh.position.x = 100
    

    // Création de saturne
    const saturneGeo = new THREE.SphereGeometry(8,64,32);
    const saturneMaterial = new THREE.MeshStandardMaterial({ map : saturnetexture ,side: THREE.DoubleSide});
    _saturneMesh = new THREE.Mesh(saturneGeo,saturneMaterial);
    _orbitsaturneMesh.add(_saturneMesh)
    _saturneMesh.position.x = 160
    
    // orbite lune
    const orbitluneGeo = new THREE.TorusGeometry(10, 0.2, 32, 200)
    const orbitluneMat = new THREE.MeshLambertMaterial({ color: 0xDBDBDB, transparent : false, opacity : 0.2 })
    _orbitluneMesh = new THREE.Mesh(orbitluneGeo, orbitluneMat)
    _orbitluneMesh.position.set(75, 0, 0)
    _orbitluneMesh.rotateX(0.436332)
    _orbitterreMesh.add(_orbitluneMesh)

    // Création de la lune
    const luneGeo = new THREE.SphereGeometry(0.75,64,32);
    const luneMaterial = new THREE.MeshStandardMaterial({ map : lunetexture ,side: THREE.DoubleSide});
    _luneMesh = new THREE.Mesh(luneGeo,luneMaterial);
    _luneMesh.position.set(10, 0, 0)
    _orbitluneMesh.add(_luneMesh)

    // ring saturne
    const anneausaturneGeo = new THREE.RingGeometry(8, 14, 19)
    const anneausaturneMat = new THREE.MeshLambertMaterial({ map : ringtexture, transparent : true })
    const anneausaturneMesh = new THREE.Mesh(anneausaturneGeo, anneausaturneMat)
    anneausaturneGeo.rotateX(-0.5*Math.PI)
    anneausaturneMesh.position.set(160, 0, 0)
    _orbitsaturneMesh.add(anneausaturneMesh)
   
    
}

// Fonction appelée lors du clic sur le bouton Focus Atom. Permet à la camera de focus l'atome
function focusterre() {
    _focusEnabledterre = true
}
// Bind la fonction OnClickFocusAtom à l'event click du bouton
document.getElementById("button-terre").addEventListener("click", focusterre)

// Fonction appelée lors du clic sur le bouton Focus Atom. Permet à la camera de focus l'atome
function focusmars() {
    _focusEnabledmars = true
}
// Bind la fonction OnClickFocusAtom à l'event click du bouton
document.getElementById("button-mars").addEventListener("click", focusmars)

// Fonction appelée lors du clic sur le bouton Focus Atom. Permet à la camera de focus l'atome
function focuslune() {
    _focusEnabledlune = true
}
// Bind la fonction OnClickFocusAtom à l'event click du bouton
document.getElementById("button-lune").addEventListener("click", focuslune)

// Fonction appelée lors du clic sur le bouton Focus Atom. Permet à la camera de focus l'atome
function focussaturne() {
    _focusEnabledsaturne= true
}
// Bind la fonction OnClickFocusAtom à l'event click du bouton
document.getElementById("button-saturne").addEventListener("click", focussaturne)

// Fonction appelée lors du clic sur le bouton Focus Atom. Permet à la camera de focus l'atome
function stop() {
    _focusEnabledsaturne= false
    _focusEnabledlune= false
    _focusEnabledterre= false
    _focusEnabledmars= false
    _camera.position.set(0, 2, 150);
}
// Bind la fonction OnClickFocusAtom à l'event click du bouton
document.getElementById("button-stop").addEventListener("click", stop)



function Resize() {
    _camera.aspect = window.innerWidth / window.innerHeight;
    _camera.updateProjectionMatrix();
    _renderer.setSize(window.innerWidth, window.innerHeight)
}
// Boucle d'animation
function Animate() {

    // Mise à jour d'elapsed time
    _elapsedTime = _clock.getDelta()
    
 

    
    var yAxis = new THREE.Vector3(0, 1, 0)
    var zAxis = new THREE.Vector3(0, 0, 1)

    _orbitterreMesh.rotateOnAxis(yAxis,0.0174533* _elapsedTime)
    _orbitmarsMesh.rotateOnAxis(yAxis,0.00914583* _elapsedTime)
    _orbitsaturneMesh.rotateOnAxis(yAxis,0.00058421* _elapsedTime)
    _orbitluneMesh.rotateOnAxis(zAxis,0.0174533* _elapsedTime)
    
    _terreMesh.rotateOnAxis(yAxis,6.28319* _elapsedTime)
    _marsMesh.rotateOnAxis(yAxis,6.28319* _elapsedTime)
    _saturneMesh.rotateOnAxis(yAxis,3.14159* _elapsedTime)
    _luneMesh.rotateOnAxis(zAxis,0.226893* _elapsedTime)
    _soleilMesh.rotateOnAxis(yAxis,0.226893* _elapsedTime)
    
    if (_focusEnabledterre == true) {
        var offset = new THREE.Vector3(7, 7, 7)
        // controlPosition = position de la planete + décalage de 7 unité sur l'axe x y et z
        var controlPosition = _terreMesh.position.clone().add(offset)
        // Applique la nouvelle position
        _control.object.position.copy(controlPosition)
        //  focus le control sur la position de l'atome
        _control.target = _terreMesh.position
    }

    if (_focusEnabledmars == true) {
        var offset = new THREE.Vector3(7, 7, 7)
        // controlPosition = position de la planete + décalage de 7 unité sur l'axe x y et z
        var controlPosition = _marsMesh.position.clone().add(offset)
        // Applique la nouvelle position
        _control.object.position.copy(controlPosition)
        //  focus le control sur la position de l'atome
        _control.target = _marsMesh.position
    }
   
    if (_focusEnabledlune== true) {
        var offset = new THREE.Vector3(7, 7, 7)
        // controlPosition = position de la planete + décalage de 7 unité sur l'axe x y et z
        var controlPosition = _luneMesh.position.clone().add(offset)
        // Applique la nouvelle position
        _control.object.position.copy(controlPosition)
        //  focus le control sur la position de l'atome
        _control.target = _luneMesh.position
    }



    if (_focusEnabledsaturne == true) {
        var offset = new THREE.Vector3(7, 7, 7)
        // controlPosition = position de la planete + décalage de 7 unité sur l'axe x y et z
        var controlPosition = _saturneMesh.position.clone().add(offset)
        // Applique la nouvelle position
        _control.object.position.copy(controlPosition)
        //  focus le control sur la position de l'atome
        _control.target = _saturneMesh.position
    }
    
    _control.update()
    _renderer.render(_scene, _camera)
    requestAnimationFrame(Animate)
    
}
InitScene()
Animate()
window.addEventListener('resize', Resize);