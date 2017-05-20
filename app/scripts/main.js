(function(global) {
  /**
   * Call to fetch data from Open Weather map
   */
  const generateWeatherData = ({ place, cntry = 'IN' }) => {
    $.ajax(
      `http://api.openweathermap.org/data/2.5/forecast?
      q=${palce},${cntry}
      &units=metric
      &cnt=24
      &appid=e83c0a3c38b673ca782b7dd77881c95b`
    )
      .done(function(resp) {
        console.log(resp);
      })
      .fail(function() {
        alert('error');
      });
  };
  /**
   * First function to be invoked by the application
   */
  const init = () => {
    let place = 'Chennai';
    let cntry = 'IN';
    generateWeatherData({ place, cntry });
  };
  init();
})(window);
