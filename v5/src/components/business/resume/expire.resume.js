export default ({ content }) => {
  $.dialog({
    width: '90%',
    title: false,
    content,
    button: [{
      name: '我知道了',
      callback: true,
      className: 'btn-normal',
    }],
  });
};
