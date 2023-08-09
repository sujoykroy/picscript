import { PicShapePolyline } from './pic_shape_polyline.js';
import { PicShapeLine } from './pic_shape_line.js';
import { PicShapeCircle } from './pic_shape_circle.js';
import { PicShapeRectangle } from './pic_shape_rectangle.js';

export class PicImage {
    constructor({ name, shapes, constiWords }) {
        this.name = name;
        this.shapes = [];
        this.constiWords = constiWords || '';
        for (let shapeData of shapes) {
            this.addNewShape(shapeData);
        }
    }

    addNewShape(shapeData) {
        if (!shapeData) {
            shapeData = { shapeType: PicShapePolyline.shapeType };
        }
        let shapeObj = null;
        if (shapeData.shapeType == PicShapePolyline.shapeType) {
            shapeObj = new PicShapePolyline(shapeData);
        } else if (shapeData.shapeType == PicShapeLine.shapeType) {
            shapeObj = new PicShapeLine(shapeData);
        } else if (shapeData.shapeType == PicShapeCircle.shapeType) {
            shapeObj = new PicShapeCircle(shapeData);
        } else if (shapeData.shapeType == PicShapeRectangle.shapeType) {
            shapeObj = new PicShapeRectangle(shapeData);
        } else {
            shapeObj = new PicShapePolyline(shapeData);
        }
        this.shapes.push(shapeObj);
        return shapeObj;
    }

    cloneShape(picShape) {
        this.addNewShape(picShape.toJSON());
        return this.shapes.at(-1);
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
