import * as mathLib from '@/helpers/math_lib.js';
import { PicShapeLine } from './pic_shape_line.js';

export class PicShapeRectangle extends PicShapeLine {
    static shapeType = 'rectangle';

    get x() {
        if (this.points.length < 2) return 0;
        return Math.min(this.points[0].x, this.points[1].x);
    }
    get y() {
        if (this.points.length < 2) return 0;
        return Math.min(this.points[0].y, this.points[1].y);
    }

    get width() {
        if (this.points.length < 2) return 0;
        return Math.abs(this.points[0].x - this.points[1].x);
    }

    get height() {
        if (this.points.length < 2) return 0;
        return Math.abs(this.points[0].y - this.points[1].y);
    }
}
