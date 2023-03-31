class DoubleCavityHyperboloid extends Figure {
    constructor({
        color = '#40cac7',
        centre,
        count = 20,
        focusOx = 1,
        focusOy = 1,
        focusOz = 1,
    }) {
        super({ color, centre });
        this.count = count;
        this.focusOx = focusOx;
        this.focusOy = focusOy;
        this.focusOz = focusOz;

        this.generateFigure();
    }

    generatePoints() {
        const prop = 2 * Math.PI / this.count;
        for (let i = -this.count / 2; i < this.count / 2; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x + this.focusOx * Math.sinh(i * prop) * Math.cos(j * prop),
                    this.centre.y + this.focusOy * Math.cosh(i * prop),
                    this.centre.z + this.focusOz * Math.sinh(i * prop) * Math.sin(j * prop),
                ));
            }
        }

        for (let i = -this.count / 2; i < this.count / 2; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x + this.focusOx * Math.sinh(i * prop) * Math.cos(j * prop),
                    this.centre.y - this.focusOy * Math.cosh(i * prop),
                    this.centre.z + this.focusOz * Math.sinh(i * prop) * Math.sin(j * prop),
                ));
            }
        }
    }

    generateEdges() {
        const sqrCount = Math.pow(this.count, 2);
        for (let i = 0; i < this.count; i++) {
            const k = i ? i * this.count - 1 : i;
            for (let j = 0; j < this.count - 1; j++) {
                this.edges.push(new Edge(i * this.count + j, i * this.count + j + 1));
                this.edges.push(new Edge((i ? i - 1 : i) * this.count + j, i * this.count + j));
                this.edges.push(new Edge(i * this.count + sqrCount + j, i * this.count + sqrCount + j + 1));
                this.edges.push(new Edge((i ? i - 1 : i) * this.count + sqrCount + j, i * this.count + sqrCount + j));
            }
            this.edges.push(new Edge(k, k + this.count));
            this.edges.push(new Edge(i * this.count, (i + 1) * this.count - 1));
            this.edges.push(new Edge(k + sqrCount, k + sqrCount + this.count));
            this.edges.push(new Edge(i * this.count + sqrCount, (i + 1) * this.count + sqrCount - 1));
        }
    }

    generatePolygons() {
        const sqrCount = Math.pow(this.count, 2);
        for (let i = 0; i < this.count - 1; i++) {
            for (let j = 0; j < this.count - 1; j++) {
                this.polygons.push(new Polygon([
                    i * this.count + j,
                    (i + 1) * this.count + j,
                    (i + 1) * this.count + j + 1,
                    i * this.count + j + 1,
                ], this.color));

                this.polygons.push(new Polygon([
                    i * this.count + sqrCount + j,
                    (i + 1) * this.count + sqrCount + j,
                    (i + 1) * this.count + sqrCount + j + 1,
                    i * this.count + sqrCount + j + 1,
                ], this.color));

            }

            this.polygons.push(new Polygon([
                i * this.count,
                (i + 1) * this.count - 1,
                (i + 2) * this.count - 1,
                (i + 1) * this.count,
            ], this.color));

            this.polygons.push(new Polygon([
                i * this.count + sqrCount,
                (i + 1) * this.count + sqrCount - 1,
                (i + 2) * this.count + sqrCount - 1,
                (i + 1) * this.count + sqrCount,
            ], this.color));
        }
    }
}