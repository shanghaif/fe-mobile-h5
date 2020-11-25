import { compose } from '../lambda/lambda';

export function getCanvas(selector) {
  return document.querySelector(selector);
}
export function createCanvas(container) {
  const canvas = document.createElement('canvas');
  document.querySelector(container).append(canvas);
  return canvas;
}
export function getContext(canvas) {
  return canvas.getContext('2d');
}
export const canvasContext = compose(getContext, getCanvas);
export const createCanvasContext = compose(getContext, createCanvas);
