import sweet from '@liepin/native-sweet-fe';


export function recordScroll() {
  const scrollTop = document.querySelector('body').scrollTop || document.documentElement.scrollTop;
  if (scrollTop) {
    sweet.set('seek-worthy-eighteen_cities_special-scroll', scrollTop);
  }
}

export function recoverScroll() {
  const scrollTop = sweet.get('seek-worthy-eighteen_cities_special-scroll');
  if (scrollTop) {
    document.querySelector('body').scrollTop = scrollTop;
    document.documentElement.scrollTop = scrollTop;
    sweet.remove('seek-worthy-eighteen_cities_special-scroll');
  }
}
