import * as THREE from 'three';

export class coreThree {
    constructor(canvas,responsive = true, canvasSize = { width: window.innerWidth, height: window.innerHeight }, fov = 75, cameraPosition = { x: 0, y: 0, z: 5 }) {
        this.canvas = canvas;
        this.canvasSize = canvasSize;
        this.fov = fov;
        this.cameraPosition = cameraPosition;
        this.responsive = responsive;

        // Initialize scene
        this.scene = new THREE.Scene();

        // not creating any objects yet 

        // Initialize camera
        this.camera = new THREE.PerspectiveCamera(this.fov, this.canvasSize.width / this.canvasSize.height);
        this.camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);
        this.scene.add(this.camera);

        // Initialize renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        });
        this.renderer.setSize(this.canvasSize.width, this.canvasSize.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        // Setup responsive handling if enabled
        if (this.responsive) {
            window.addEventListener('resize', () => {
                this.canvasSize = { width: window.innerWidth, height: window.innerHeight };
                this.updateCanvas();
            });
        }
    }

    addObject(mesh) {
        this.scene.add(mesh);
        return mesh;
    }

    updateCanvas() {
        // Update camera aspect ratio
        this.camera.aspect = this.canvasSize.width / this.canvasSize.height;
        this.camera.updateProjectionMatrix();

        // Update renderer size
        this.renderer.setSize(this.canvasSize.width, this.canvasSize.height);
    }

    render() {// render once only:
        
        this.renderer.render(this.scene, this.camera);
        
    }
    render2(){ // render always
        const anim=()=>{
            this.renderer.render(this.scene,this.camera);
            requestAnimationFrame(()=>anim());
        }
        anim();
    }
    
    
}