const codes = {
  '0086': ['mobileCN'],
  '00852': ['mobileHK'],
  '00853': ['mobileMO'],
  '00886': ['mobileTW'],
  '001': ['mobileUS'] || ['mobileCA'],
  '0065': ['mobileSG'],
  '0044': ['mobileUK'],
  '0081': ['mobileJP'],
  '0049': ['mobileDE'],
  '0061': ['mobileAU'],
  '0060': ['mobileMY'],
  '0082': ['mobileKR'],
  '0091': ['mobileIN'],
  '0033': ['mobileFR'],
  '0064': ['mobileNZ'],
  '0034': ['mobileES'],
  '0039': ['mobileIT'],
  '00351': ['mobilePT'],
  default: ['number'],
};
export default code => codes[code] || ['number'];

