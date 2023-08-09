import * as mathLib from '@/helpers/math_lib.js';
import { PicShape } from './pic_shape.js';

export class PicShapePolyline extends PicShape {
    static shapeType = 'polyline';

    constructor(options) {
        super(options);
        if (!options) options = {};
        this.points = options.points || [];
    }

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
        let point = this.constructor.getPointFromEvent(event, targetElem);
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
