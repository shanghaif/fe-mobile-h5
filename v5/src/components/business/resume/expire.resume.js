export default ({ content }) => {
  $.dialog({
    width: '90%',
    title: false,
    content,
    button: [{
      name: 'ζη₯ιδΊ',
      callback: true,
      className: 'btn-normal',
    }],
  });
};
