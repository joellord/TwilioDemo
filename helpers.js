module.exports = {
  Capitalize: function(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
  },
  FormattedChartData: function(original) {
    var chartData = [];
    for (var key in original) {
      chartData.push([capitalize(key), original[key]]);
    }
    return chartData;
  }
};