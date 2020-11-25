import animationFrame from './animationFrame';
import { curry } from '../lambda/lambda';

function animate(times, callback) {
  let current = 0;

  return function play() {
    if (current <= times) {
      animationFrame(play);
    }
    callback(current++);
  };
}

export default curry(animate);
