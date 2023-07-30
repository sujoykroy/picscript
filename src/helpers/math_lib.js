export function getCenterPoint(points) {
    let cx = points.reduce((ac, pt) => ac + pt.x, 0) / points.length;
    let cy = points.reduce((ac, pt) => ac + pt.y, 0) / points.length;
    return { x: cx, y: cy };
}
