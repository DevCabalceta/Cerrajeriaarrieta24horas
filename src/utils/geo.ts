import type { GeoPoint } from '@/data/coverage';

/** Equirectangular frame around Costa Rica; at ~10°N the longitude distortion is negligible. */
export const mapFrame = {
  west: -86.05,
  east: -82.45,
  north: 11.3,
  south: 7.95,
  scale: 200,
} as const;

export const mapSize = {
  width: Math.round((mapFrame.east - mapFrame.west) * mapFrame.scale),
  height: Math.round((mapFrame.north - mapFrame.south) * mapFrame.scale),
};

export interface MapPoint {
  x: number;
  y: number;
}

export function project([lon, lat]: GeoPoint): MapPoint {
  return {
    x: (lon - mapFrame.west) * mapFrame.scale,
    y: (mapFrame.north - lat) * mapFrame.scale,
  };
}

export function isInsidePolygon([lon, lat]: GeoPoint, polygon: readonly GeoPoint[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i]!;
    const [xj, yj] = polygon[j]!;
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

export function distanceToSegment([px, py]: GeoPoint, [ax, ay]: GeoPoint, [bx, by]: GeoPoint): number {
  const dx = bx - ax;
  const dy = by - ay;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

/** Grid of points inside `polygon`, spaced `step` degrees apart. */
export function buildDotGrid(polygon: readonly GeoPoint[], step: number): GeoPoint[] {
  const dots: GeoPoint[] = [];
  for (let lat = mapFrame.north; lat >= mapFrame.south; lat -= step) {
    for (let lon = mapFrame.west; lon <= mapFrame.east; lon += step) {
      const point: GeoPoint = [lon, lat];
      if (isInsidePolygon(point, polygon)) dots.push(point);
    }
  }
  return dots;
}
