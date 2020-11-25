function initMap(selector, city, address) {
  if (city && address) {
    return $(selector).gdmap({ address, city, width: '100%', height: '20em' });
  }
  return null;
}

export default function (container = '[data-selector="gdmap"]', toggle = '[data-selector="address"]') {
  const $gdMap = $(container);
  if ($gdMap && $gdMap.length) {
    const compDq = $.trim($gdMap.attr('data-city'));
    const compAddress = $.trim($gdMap.attr('data-address'));
    compDq && compAddress && initMap($gdMap, $.trim(compDq), $.trim(compAddress));
  }
  // 点击地址，展现和关闭地图
  $(toggle).on('tap', () => $gdMap.toggleClass('map-hidden'));
}
