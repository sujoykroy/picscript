import * as mathLib from '@/helpers/math_lib.js';
import { PicShapePolyline } from './pic_shape_polyline.js';

export class PicShapePath extends PicShapePolyline {
    static shapeType = 'path';

    constructor(options) {
        super(options);
        this.curveCount = options.curveCount || 1;
    }

    toJSON() {
        let jsonData = super.toJSON();
        jsonData.curveCount = this.curveCount;
        return jsonData;
    }

    addPoint(x, y) {
        if (this.points.length < this.curveCount * 3 + 1) {
            super.addPoint(x, y);
        } else {
            this.points.at(-1).x = x;
            this.points.at(-1).y = y;
        }
    }

    addCurve() {
        if (this.points.length == this.curveCount * 3 + 1) {
            this.curveCount += 1;
        }
    }

    get flatPoints() {
        if (!this.points.length) return '';
        let d = '';
        d += `M${this.points[0].x}, ${this.points[0].y}`;

        for (let c = 0; c < this.curveCount; c++) {
            let points = this.points.slice(c * 3 + 1, (c + 1) * 3 + 1);
            if (points.length < 3) {
                for (let i = 0; i < points.length; i++) {
                    d += ` L${points[i].x},${points[i].y}`;
                }
            } else {
                const xq1 = points[0].x;
                const yq1 = points[0].y;

                const xq2 = points[1].x;
                const yq2 = points[1].y;

                const x1 = points[2].x;
                const y1 = points[2].y;

                d += ` C${xq1},${yq1} ${xq2},${yq2} ${x1},${y1}`;
            }
        }
        return d;
    }
}
