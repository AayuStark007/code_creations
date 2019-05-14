class Particle {
    constructor() {
        this.fov = 45;
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        this.heading = 0;
        for (let i = -this.fov / 2; i < this.fov / 2; i += 1) {
            this.rays.push(new Ray(this.pos, radians(i)));
        }
    }

    rotate(angle){
        this.heading += angle;
        let idx = 0;
        for (let i = -this.fov / 2; i < this.fov / 2; i += 1) {
            this.rays[idx].setAngle(radians(i) + this.heading);
            idx++;
        }
    }

    updateFOV(fov) {
        this.fov = fov;
        this.rays = [];
        for (let i = -this.fov / 2; i < this.fov / 2; i += 1) {
            this.rays.push(new Ray(this.pos, radians(i) + this.heading));
        }
    }

    move(amount) {
        const vel = p5.Vector.fromAngle(this.heading);
        vel.setMag(amount);
        this.pos.add(vel);
    }
    
    update(x, y) {
        this.pos.set(x, y);
    }

    look(walls) {
        const scene = [];
        for (let i = 0; i < this.rays.length; i++) {
            const ray = this.rays[i];
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if (closest) {
                //colorMode(HSB);
                //stroke((i + frameCount * 2) % 360, 255, 255, 50);
                stroke(color(125, 125, 200, 100));
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
            scene[i] = record;
        }
        return scene;
    }

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        for (let ray of this.rays) {
            ray.show();
        }
    }
}