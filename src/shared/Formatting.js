class Formatting {
  static bytesToStr(bytes, decimals = 0) {
    var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    if (bytes === 0)
      return '0';

    if (isNaN(parseFloat(bytes)) || !isFinite(bytes))
      return '-';

    // find power of 2^10
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

    if (i === 0) {
      return bytes.toFixed(decimals) + ' ' + sizes[0];
    } else {
      return (bytes / Math.pow(1024, i)).toFixed(decimals) + ' ' + sizes[i];
    }
  }

  static percent(val, decimals=0) {
    return val.toFixed(decimals) + '%';
  }
}

export default Formatting;
