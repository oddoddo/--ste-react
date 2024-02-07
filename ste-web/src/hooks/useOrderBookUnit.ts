import { useMemo } from "react";

export const useOrderBookUnit = (value?: string | number): number => {
  const parse = Number(value);
  return useMemo(() => {
    const f = parse || 1;
    let unit;
    switch (true) {
      case f < 2000:
        unit = 1;
        break;
      case f < 5000:
        unit = 5;
        break;
      case f < 20000:
        unit = 10;
        break;
      case f < 50000:
        unit = 50;
        break;
      case f < 200000:
        unit = 100;
        break;
      case f < 500000:
        unit = 500;
        break;
      default:
        unit = 1000;
    }
    return unit;
  }, [parse]);
};

export const unitChangePoint = [
  { point: 2000, UpUnit: 5, downUnit: 1 },
  { point: 5000, UpUnit: 10, downUnit: 5 },
  { point: 20000, UpUnit: 50, downUnit: 10 },
  { point: 50000, UpUnit: 100, downUnit: 50 },
  { point: 200000, UpUnit: 500, downUnit: 100 },
  { point: 500000, UpUnit: 1000, downUnit: 500 },
];

export const getUpUnit = (value: string): string | undefined => {
  const point = parseInt(value);
  for (const entry of unitChangePoint) {
    if (point === entry.point) {
      return (point + entry.downUnit).toString();
    }
  }
  return undefined;
};

export const getDownUnit = (value: string): string | undefined => {
  const point = parseInt(value);
  for (const entry of unitChangePoint) {
    if (point === entry.point) {
      return (point - entry.downUnit).toString();
    }
  }
  return undefined;
};
