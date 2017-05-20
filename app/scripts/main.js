(function(window) {
  /**
   * filter data to get currentTime related values alone
   */
  const filterData = (respList, crntTime) => {
    const list = respList;
    return list.filter(x => x.dt_txt.substr(-8) === crntTime);
  };

  /**
   * Iterate through response to see if all the data is available
   * @return {Boolean}
   */
  const checkVaildResponse = response => {
    return true;
  };

  /**
   * display the city provided in the response
   *
   */
  const displaySelectedCity = response => {
    const respData = response;
    const selCity = respData ? (respData.city ? respData.city.name : '') : '';
    document.getElementById('selected-city').innerText = selCity;
  };

  /**
   * iterate through the list to display weather based on index
   */
  const displayWeatherData = list => {
    const $prsntDay = document.getElementById('present-day-temp');
    const day = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    };
    list.forEach((val, ind) => {
      if (ind === 0) {
        $prsntDay.innerText = val.main.temp;
      } else {
        ((v, i) => {
          const dt = new Date(v.dt_txt);
          console.log(`future${i} ${v.dt_txt} ${dt}`);

          document.getElementById(
            `future${i}`
          ).innerText = `${day[dt.getDay()]} forecast is ${v.main.temp}`;
        })(val, ind);
      }
    });
  };
  /**
   * The function to handle dsuccess data
   * @param  {Object} [response={ list:         [] }] [description]
   * @return {[type]}             [description]
   */
  const successCallBack = (response = { list: [] }) => {
    displaySelectedCity(response);
    const crntTime = response.list[0].dt_txt.substr(-8);
    const filteredData = filterData(response.list, crntTime);
    console.log(filteredData);
    displayWeatherData(filteredData);
  };
  /**
   * Call to fetch data from Open Weather map
   */
  const generateWeatherData = ({ place, cntry = 'IN' }) => {
    $.ajax(
      `http://api.openweathermap.org/data/2.5/forecast?q=${place},${cntry}&units=metric&cnt=25&appid=e83c0a3c38b673ca782b7dd77881c95b`
    )
      .done(resp => {
        if (!checkVaildResponse(resp)) return;
        successCallBack(resp);
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
  //window.onready = init;
  init();
})(window);
