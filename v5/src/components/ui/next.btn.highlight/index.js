function nextBtnHighLight(arr, $ele) {
  const notEmpty = arr.every(function (item) {
    return item !== '';
  });

  if (notEmpty) {
    $ele.removeClass('btn-primary-disabled').addClass('btn-primary');
  } else {
    $ele.removeClass('btn-primary').addClass('btn-primary-disabled');
  }
  return notEmpty;
}

export default nextBtnHighLight;

