class PicShape {
    constructor({ points }) {
        this.points = points || [];
    }

    toJSON() {
        return {
            points: this.points.concat()
        };
    }

    addPoint(x, y) {
        if (x == null || y == null) return;
        this.points.push({ x: x, y: y });
    }

    addPointFromEvent(event, targetElem) {
        let x, y;
        if (event.touches && event.touches.length) {
            x = event.touches[0].clientX;
            y = event.touches[0].clientY;
        } else {
            x = event.clientX;
            y = event.clientY;
        }
        let targetRect = targetElem.getBoundingClientRect();
        x -= targetRect.left;
        y -= targetRect.top;
        this.addPoint((100 * x) / targetRect.width, (100 * y) / targetRect.height);
    }

    get flatPoints() {
        let points = [];
        for (let point of this.points) {
            points.push(`${point.x}, ${point.y}`);
        }
        return points.join(' ');
    }
}

export class PicImage {
    constructor({ name, shapes, constiWords }) {
        this.name = name;
        this.shapes = [];
        this.constiWords = constiWords || '';
        for (let shapeData of shapes) {
            this.shapes.push(new PicShape(shapeData));
        }
    }

    addNewShape() {
        this.shapes.push(new PicShape({}));
    }

    toJSON() {
        return {
            name: this.name,
            shapes: this.shapes.concat(),
            constiWords: this.constiWords
        };
    }
}
