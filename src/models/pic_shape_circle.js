import * as mathLib from '@/helpers/math_lib.js';
import { PicShape } from './pic_shape.js';

export class PicShapeCircle extends PicShape {
    static shapeType = 'circle';

    constructor(options) {
        super(options);
        if (!options) options = {};
        this.cx = options.cx;
        this.cy = options.cy;
        this.radius = options.radius;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            cx: this.cx,
            cy: this.cy,
            radius: this.radius
        };
    }

    addPoint(x, y) {
        if (this.cx == null) {
            this.cx = x;
            this.cy = y;
        } else {
            this.radius = Math.sqrt((this.cx - x) ** 2 + (this.cy - y) ** 2);
        }
    }

    moveOffset(x, y) {
        this.cx += x;
        this.cy += y;
    }

    scale(sx, sy) {
        this.radius *= (sx + sy) / 2;
    }
}
