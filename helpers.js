module.exports = {
  Capitalize: function(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
  },
  FormattedChartData: function(original) {
    var self = this;
    var chartData = [];
    for (var key in original) {
      chartData.push([self.Capitalize(key), original[key]]);
    }
    return chartData;
  }
};