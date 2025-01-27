import { Figure, Point, Edge, Polygon } from "../entities";

export default class Ellipsoid extends Figure {
    constructor({
        focusOx = 10,
        focusOy = 15,
        focusOz = 20,
        count = 20,
        color = '#225533',
        centre,
        name = 'Эллипсоид',
    }) {
        super({ color, centre, name });

        this.focusOx = focusOx;
        this.focusOy = focusOy;
        this.focusOz = focusOz;
        this.count = count;

        this.generateFigure();
    }

    generatePoints() {
        const propI = 2 * Math.PI / this.count;
        const propJ = Math.PI / this.count
        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x + this.focusOx * Math.sin(i * propI) * Math.cos(j * propJ),
                    this.centre.y + this.focusOy * Math.cos(i * propI),
                    this.centre.z + this.focusOz * Math.sin(i * propI) * Math.sin(j * propJ),
                ));
            }
        }
    }

    generateEdges() {
        for (let i = 0; i < this.count; i++) {
            const k = i ? i - 1 : i;
            for (let j = 0; j < this.count - 1; j++) {
                this.edges.push(new Edge(j + i * this.count, j + i * this.count + 1));
                this.edges.push(new Edge(j + i * this.count, j + k * this.count));
            }
            this.edges.push(new Edge(i * this.count, this.points.length - this.count * k - 1));
            this.edges.push(new Edge(this.points.length - i * this.count - 1, this.points.length - k * this.count - 1));
            this.edges.push(new Edge(0, this.points.length - i - 1));
        }
    }

    generatePolygons() {
        for (let i = 0; i < this.count - 1; i++) {
            for (let j = 0; j < this.count - 1; j++) {
                this.polygons.push(new Polygon([
                    j + i * this.count,
                    j + 1 + i * this.count,
                    j + 1 + (i + 1) * this.count,
                    j + (i + 1) * this.count,
                ], this.color,
                    i >= this.count / 2 ?
                        2 * this.count * (this.count - i - 1 / 2) + j + 1 :
                        j + i * this.count * 2 + 1));
            }

            this.polygons.push(new Polygon([
                this.points.length - i * this.count - 1,
                this.points.length - (i ? i - 1 : i) * this.count - 1,
                i * this.count,
                (i + 1) * this.count,
            ], this.color,
                i >= this.count / 2 ?
                    2 * (this.count - i - 1 / 2) * this.count : 2 * i * this.count));


            this.polygons.push(new Polygon([
                0,
                this.points.length - i - 1,
                this.points.length - i - 2,
                0,
            ], this.color, 2 * this.count - i - 1));
        }

        this.polygons.push(new Polygon([
            0,
            this.points.length - this.count,
            this.count * 2 - 1,
            0,
        ], this.color, this.count));
    }
}