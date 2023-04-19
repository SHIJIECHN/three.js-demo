import {TorusKnotGeometry} from "three";

const radius = 3.5;
const tubeRadius = 1.5;
const radialSegments = 8;
const tubularSegments = 64;
const p = 2;
const q = 3;
const myTorusKnot = new TorusKnotGeometry(radius,tubeRadius, tubularSegments, radialSegments, p, q)

export  default myTorusKnot;
