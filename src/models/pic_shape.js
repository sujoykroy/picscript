export class PicShape {
    static shapeType = 'shape';

    constructor(options) {}

    getShapeType() {
        return this.constructor.shapeType;
    }

    get shapeType() {
        return this.constructor.shapeType;
    }

    toJSON() {
        return { shapeType: this.constructor.shapeType };
    }

    moveOffset(x, y) {}

    scale(sx, sy) {}

    rotate(angleDeg) {}

    flip(fx, fy) {}

    addPointFromEvent(event, targetElem) {
        let point = this.constructor.getPointFromEvent(event, targetElem);
        this.addPoint(point.x, point.y);
    }

    static getPointFromEvent(event, boundingElem) {
        let x, y;
        if (event.touches && event.touches.length) {
            x = event.touches[0].clientX;
            y = event.touches[0].clientY;
        } else {
            x = event.clientX;
            y = event.clientY;
        }
        let targetRect = boundingElem.getBoundingClientRect();
        x -= targetRect.left;
        y -= targetRect.top;
        x = (100 * x) / targetRect.width;
        y = (100 * y) / targetRect.height;
        return { x: x, y: y };
    }
}
