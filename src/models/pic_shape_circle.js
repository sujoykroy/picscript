import * as mathLib from '@/helpers/math_lib.js';
import { PicShape } from './pic_shape.js';

export class PicShapeCircle extends PicShape {
    static shapeType = 'circle';

    constructor(options) {
        super();
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
            this.cx = this.cx;
            this.cy = this.cy;
        } else {
            this.radius = Math.sqrt((this.cx - x) ** 2 + (this.cy - y) ** 2);
        }
    }
}
