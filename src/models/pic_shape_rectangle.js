import * as mathLib from '@/helpers/math_lib.js';
import { PicShapeLine } from './pic_shape_line.js';

export class PicShapeRectangle extends PicShapeLine {
    static shapeType = 'rectangle';

    addPoint(x, y) {
        if (x == null || y == null) return;
        if (this.points.length == 0) {
            this.points.push({ x: x, y: y });
        } else {
            if (this.points.length == 1) {
                this.points.push({ x: x, y: this.points[0].y });
                this.points.push({ x: x, y: y });
                this.points.push({ x: this.points[0].x, y: y });
                this.points.push({ x: this.points[0].x, y: this.points[0].y });

                this.points.push({ x: x, y: this.points[0].y }); // extra
            } else {
                this.points[1].x = x;

                this.points[2].x = x;
                this.points[2].y = y;

                this.points[3].y = y;

                this.points[5].x = x;
            }
        }
    }
}
