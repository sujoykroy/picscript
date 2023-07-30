import * as mathLib from '@/helpers/math_lib.js';

export function getPointFromEvent(event, boundingElem) {
    let x, y;
    if (event.touches && event.touches.length) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    } else {
        x = event.clientX;
        y = event.clientY;
    }
    let targetRect = boundingElem.getBoundingClientRect();
    x -= targetRect.left;
    y -= targetRect.top;
    x = (100 * x) / targetRect.width;
    y = (100 * y) / targetRect.height;
    return { x: x, y: y };
}

class PicShape {
    constructor({ points }) {
        this.points = points || [];
    }

    toJSON() {
        return {
            points: this.points.map((pt) => {
                return { x: pt.x, y: pt.y };
            })
        };
    }

    addPoint(x, y) {
        if (x == null || y == null) return;
        this.points.push({ x: x, y: y });
    }

    moveOffset(x, y) {
        for (let point of this.points) {
            point.x += x;
            point.y += y;
        }
    }

    scale(sx, sy) {
        let cpt = mathLib.getCenterPoint(this.points);

        for (let point of this.points) {
            point.x = (point.x - cpt.x) * sx + cpt.x;
            point.y = (point.y - cpt.y) * sy + cpt.y;
        }
    }

    rotate(angleDeg) {
        let cpt = mathLib.getCenterPoint(this.points);

        for (let point of this.points) {
            let dx = point.x - cpt.x;
            let dy = point.y - cpt.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            let angle = Math.atan2(dy, dx) + (Math.PI * angleDeg) / 180.0;
            point.x = cpt.x + dist * Math.cos(angle);
            point.y = cpt.y + dist * Math.sin(angle);
        }
    }

    flip(fx, fy) {
        let cpt = mathLib.getCenterPoint(this.points);

        for (let point of this.points) {
            point.x = cpt.x + (point.x - cpt.x) * fx;
            point.y = cpt.y + (point.y - cpt.y) * fy;
        }
    }

    addPointFromEvent(event, targetElem) {
        let point = getPointFromEvent(event, targetElem);
        this.addPoint(point.x, point.y);
    }

    get flatPoints() {
        let points = [];
        for (let point of this.points) {
            points.push(`${point.x}, ${point.y}`);
        }
        return points.join(' ');
    }
}

export class PicImage {
    constructor({ name, shapes, constiWords }) {
        this.name = name;
        this.shapes = [];
        this.constiWords = constiWords || '';
        for (let shapeData of shapes) {
            this.shapes.push(new PicShape(shapeData));
        }
    }

    addNewShape() {
        this.shapes.push(new PicShape({}));
    }

    cloneShape(picShape) {
        picShape = new PicShape(picShape.toJSON());
        this.shapes.push(picShape);
        return picShape;
    }

    addShapeType(shapeType, options) {
        let points;
        options = options || {};
        if (shapeType == 'line') {
            points = [
                { x: 10, y: 10 },
                { x: 90, y: 10 }
            ];
        } else if (shapeType == 'circle') {
            options.radius = options.radius || 20;
            options.steps = options.steps || 50;
            let cx = 50;
            let cy = 50;
            points = [];
            for (let i = 0; i < options.steps; i++) {
                points.push({
                    x: cx + options.radius * Math.cos((2 * Math.PI * i) / options.steps),
                    y: cy + options.radius * Math.sin((2 * Math.PI * i) / options.steps)
                });
            }
            for (let i = 0; i < 2; i++) {
                points.push({ x: points[i].x, y: points[i].y });
            }
        } else {
            points = [
                { x: 10, y: 10 },
                { x: 30, y: 10 },
                { x: 30, y: 30 },
                { x: 10, y: 30 },
                { x: 10, y: 10 },
                { x: 30, y: 10 }
            ];
        }
        if (!points) return;
        let picShape = new PicShape({ points: points });
        this.shapes.push(picShape);
        return picShape;
    }

    deleteShape(targetShape) {
        this.shapes = this.shapes.filter((shape) => shape != targetShape);
    }

    toJSON() {
        return {
            name: this.name,
            shapes: this.shapes.concat(),
            constiWords: this.constiWords
        };
    }
}
