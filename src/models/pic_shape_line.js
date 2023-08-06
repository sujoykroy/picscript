import * as mathLib from '@/helpers/math_lib.js';
import { PicShapePolyline } from './pic_shape_polyline.js';

export class PicShapeLine extends PicShapePolyline {
    static shapeType = 'line';

    toJSON() {
        return {
            ...super.toJSON(),
            points: this.points.map((pt) => {
                return { x: pt.x, y: pt.y };
            })
        };
    }

    addPoint(x, y) {
        if (x == null || y == null) return;
        if (this.points.length < 2) {
            this.points.push({ x: x, y: y });
        } else {
            this.points.at(-1).x = x;
            this.points.at(-1).y = y;
        }
    }
}
