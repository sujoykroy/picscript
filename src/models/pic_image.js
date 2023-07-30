import * as mathLib from '@/helpers/math_lib.js';

class PicShape {
    constructor({ points }) {
        this.points = points || [];
    }

    toJSON() {
        return {
            points: this.points.concat()
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

    addPointFromEvent(event, targetElem) {
        let x, y;
        if (event.touches && event.touches.length) {
            x = event.touches[0].clientX;
            y = event.touches[0].clientY;
        } else {
            x = event.clientX;
            y = event.clientY;
        }
        let targetRect = targetElem.getBoundingClientRect();
        x -= targetRect.left;
        y -= targetRect.top;
        this.addPoint((100 * x) / targetRect.width, (100 * y) / targetRect.height);
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

    addShapeType(shapeType, options) {
        let points;
        options = options || {};
        if (shapeType == 'circle') {
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
            for (let i = 0; i < options.steps / 4; i++) {
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
        this.shapes.push(new PicShape({ points: points }));
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
