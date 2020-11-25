import { priceLink, jobLink } from '../modules/common';

import '../style/common.less';
import './index.less';

$('[data-selector="look-other-prise"]').on('click', () => {
  window.location.replace(priceLink);
});

$('[data-selector="change-salary-job"]').on('click', () => {
  window.location.replace(jobLink);
});
