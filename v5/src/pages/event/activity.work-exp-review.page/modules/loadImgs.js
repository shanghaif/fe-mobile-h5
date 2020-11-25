import img0 from '../images/big-btn.png';
import img1 from '../images/company-bg.png';
import img2 from '../images/company-charactor.png';
import img3 from '../images/company-flying-cloud.png';
import img4 from '../images/company-flying-start.png';
import img5 from '../images/company-left-spray.png';
import img6 from '../images/company-right-spray.png';
import img7 from '../images/gift-btn.png';
import img8 from '../images/gift-card.png';
import img9 from '../images/gift-cloud.png';
import img10 from '../images/hello-bg-empty.png';
import img11 from '../images/hello-bg.png';
import img12 from '../images/hello-bot-decoration.png';
import img13 from '../images/hello-charactor.png';
import img14 from '../images/hello-fly-out-item.png';
import img16 from '../images/job-cloud-bg.png';
import img17 from '../images/last-bot-decoration.png';
import img18 from '../images/last-briefcase.png';
import img19 from '../images/last-day-bg.png';
import img20 from '../images/last-day-decoration.png';
import img21 from '../images/last-day-door-bg.png';
import img22 from '../images/last-day-door-cloud.png';
import img23 from '../images/last-day-door-light.png';
import img24 from '../images/last-day-star.png';
import img25 from '../images/last-night-bg.png';
import img26 from '../images/last-night-charactor.png';
import img27 from '../images/last-night-circle.png';
import img28 from '../images/last-night-cloud.png';
import img29 from '../images/last-night-light.png';
import img30 from '../images/last-night-shadow.png';
import img31 from '../images/left-butterfly-light.png';
import img32 from '../images/left-butterfly.png';
import img33 from '../images/left-loading-butterfly-light.png';
import img34 from '../images/left-loading-butterfly.png';
import img35 from '../images/meet-bg.png';
import img36 from '../images/meet-charactor.png';
import img37 from '../images/meet-gem-bg.png';
import img38 from '../images/meet-gem-light-bg.png';
import img39 from '../images/meet-lamp-light.png';
import img40 from '../images/meet-lamp.png';
import img41 from '../images/meet-star.png';
import img42 from '../images/right-butterfly-light.png';
import img43 from '../images/right-butterfly.png';
import img44 from '../images/right-loading-butterfly-light.png';
import img45 from '../images/right-loading-butterfly.png';
import img46 from '../images/welcome-butterfly.png';
import img47 from '../images/welcome-charactor-1.png';
import img48 from '../images/welcome-charactor-2.png';
import img49 from '../images/welcome-charactor-3.png';
import img50 from '../images/welcome-charactor-4.png';
import img51 from '../images/welcome-ground.png';
import img52 from '../images/welcome-sky.png';
import img53 from '../images/welcome-train.png';
import img54 from '../images/meet-up-arrow.png';
import img55 from '../images/meet-gem-item.png';
import img56 from '../images/liepin-logo.png';

// eslint-disable-next-line max-len
const imgs = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img16, img17, img18, img19, img20, img21, img22, img23, img24, img25, img26, img27, img28, img29, img30, img31, img32, img33, img34, img35, img36, img37, img38, img39, img40, img41, img42, img43, img44, img45, img46, img47, img48, img49, img50, img51, img52, img53, img54, img55, img56];
export default function () {
  return new Promise(function (resolve) {
    const { length } = imgs;
    const results = [];
    function handleResponse() {
      results.push(true);
      if (results.length === length) {
        resolve();
      }
    }
    imgs.forEach(function (src) {
      const img = document.createElement('img');
      img.src = src;
      img.onload = handleResponse;
      img.onerror = handleResponse;
    });
  });
}
