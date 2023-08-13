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
        if (this.points.length < this.curveCount * 4) {
            super.addPoint(x, y);
        } else {
            this.points.at(-1).x = x;
            this.points.at(-1).y = y;
        }
    }

    addCurve() {
        if (this.points.length == this.curveCount * 4) {
            this.curveCount += 1;
        }
    }

    get flatPoints() {
        if (!this.points.length) return '';
        let d = '';
        for (let c = 0; c < this.curveCount; c++) {
            let points = this.points.slice(c * 4, (c + 1) * 4);
            if (points.length > 0) {
                d += `M${points[0].x}, ${points[0].y}`;
            }
            if (points.length < 4) {
                for (let i = 1; i < points.length; i++) {
                    d += ` L${points[i].x},${points[i].y}`;
                }
            } else {
                const xq1 = points[1].x;
                const yq1 = points[1].y;

                const xq2 = points[2].x;
                const yq2 = points[2].y;

                const x1 = points[3].x;
                const y1 = points[3].y;

                d += ` C${xq1},${yq1} ${xq2},${yq2} ${x1},${y1}`;
            }
        }
        return d;
    }
}
