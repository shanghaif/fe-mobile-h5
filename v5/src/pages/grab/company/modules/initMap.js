export default function () {
  const $mapContainer = $('#map-container');
  if ($mapContainer.length) {
    $('[data-selector="map-controller"]').on('click', function () {
      if ($mapContainer.hasClass('hide')) {
        $mapContainer.removeClass('hide');
        // 点击地址，展现和关闭地图
        import(/* webpackChunkName: "thunk/zepto-map" */ '@liepin/zepto-map')
          .then(() => {
            // 百度地图
            const compDq = $.trim($mapContainer.attr('data-city'));
            const compAddress = $.trim($mapContainer.attr('data-address'));
            if (compAddress && compAddress !== '') {
              $mapContainer.gdmap({
                address: compAddress,
                city: compDq,
                width: '100%',
                height: '10em',
              });
            }
          });
      }
    });
  }
}
