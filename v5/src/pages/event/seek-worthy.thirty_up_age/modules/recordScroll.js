import sweet from '@liepin/native-sweet-fe';


export function recordScroll() {
  const scrollTop = document.querySelector('body').scrollTop || document.documentElement.scrollTop;
  if (scrollTop) {
    sweet.set('seek-gold-scroll', scrollTop);
  }
}

export function recoverScroll() {
  const scrollTop = sweet.get('seek-gold-scroll');
  if (scrollTop) {
    document.querySelector('body').scrollTop = scrollTop;
    document.documentElement.scrollTop = scrollTop;
    sweet.remove('seek-gold-scroll');
  }
}
