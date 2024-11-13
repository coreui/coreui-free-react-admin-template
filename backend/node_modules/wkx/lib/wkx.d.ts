/// <reference types="node" />

declare module "wkx" {

    export class Geometry {
        srid: number;
        hasZ: boolean;
        hasM: boolean;

        static parse(value: string | Buffer): Geometry;
        static parseTwkb(value: Buffer): Geometry;
        static parseGeoJSON(value: {}): Geometry;

        toWkt(): string;
        toEwkt(): string;
        toWkb(): Buffer;
        toEwkb(): Buffer;
        toTwkb(): Buffer;
        toGeoJSON(options?: GeoJSONOptions): {};
    }

    export interface GeoJSONOptions {
        shortCrs?: boolean;
        longCrs?: boolean;
    }

    export class Point extends Geometry {
        x: number;
        y: number;
        z: number;
        m: number;

        constructor(x?: number, y?: number, z?: number, m?: number, srid?: number);

        static Z(x: number, y: number, z: number, srid?: number): Point;
        static M(x: number, y: number, m: number, srid?: number): Point;
        static ZM(x: number, y: number, z: number, m: number, srid?: number): Point;
    }

    export class LineString extends Geometry {
        points: Point[];

        constructor(points?: Point[], srid?: number);
        
        static Z(points?: Point[], srid?: number): LineString;
        static M(points?: Point[], srid?: number): LineString;
        static ZM(points?: Point[], srid?: number): LineString;
    }

    export class Polygon extends Geometry {
        exteriorRing: Point[];
        interiorRings: Point[][];

        constructor(exteriorRing?: Point[], interiorRings?: Point[][], srid?: number);

        static Z(exteriorRing?: Point[], interiorRings?: Point[][], srid?: number): Polygon;
        static M(exteriorRing?: Point[], interiorRings?: Point[][], srid?: number): Polygon;
        static ZM(exteriorRing?: Point[], interiorRings?: Point[][], srid?: number): Polygon;
    }

    export class MultiPoint extends Geometry {
        points: Point[];

        constructor(points?: Point[], srid?: number);
        
        static Z(points?: Point[], srid?: number): MultiPoint;
        static M(points?: Point[], srid?: number): MultiPoint;
        static ZM(points?: Point[], srid?: number): MultiPoint;
    }

    export class MultiLineString extends Geometry {
        lineStrings: LineString[];

        constructor(lineStrings?: LineString[], srid?: number);
        
        static Z(lineStrings?: LineString[], srid?: number): MultiLineString;
        static M(lineStrings?: LineString[], srid?: number): MultiLineString;
        static ZM(lineStrings?: LineString[], srid?: number): MultiLineString;
    }

    export class MultiPolygon extends Geometry {
        polygons: Polygon[];

        constructor(polygons?: Polygon[], srid?: number);
        
        static Z(polygons?: Polygon[], srid?: number): MultiPolygon;
        static M(polygons?: Polygon[], srid?: number): MultiPolygon;
        static ZM(polygons?: Polygon[], srid?: number): MultiPolygon;
    }

    export class GeometryCollection extends Geometry {
        geometries: Geometry[];

        constructor(geometries?: Geometry[], srid?: number);
        
        static Z(geometries?: Geometry[], srid?: number): GeometryCollection;
        static M(geometries?: Geometry[], srid?: number): GeometryCollection;
        static ZM(geometries?: Geometry[], srid?: number): GeometryCollection;
    }
}