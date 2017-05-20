'use strict';

(function () {
  /**
   * filter data to get currentTime related values alone
   */
  var filterData = function filterData(respList, crntTime) {
    var list = respList;
    return list.filter(function (x) {
      return x.dt_txt.substr(-8) === crntTime;
    });
  };

  /**
   * Iterate through response to see if all the data is available
   * @return {Boolean}
   */
  var checkVaildResponse = function checkVaildResponse(response) {
    var isvalidresponse = true;
    if (!(response && response.list && response.list instanceof Array && response.list.length > 0)) isvalidresponse = false;
    return isvalidresponse;
  };

  /**
   * display the city provided in the response
   */
  var displaySelectedCity = function displaySelectedCity(response) {
    var respData = response;
    var selCity = respData ? respData.city ? respData.city.name : '' : '';
    document.getElementById('selected-city').innerText = selCity;
  };

  /**
   * iterate through the list to display weather based on index
   */
  var displayWeatherData = function displayWeatherData(list) {
    var $prsntDay = document.getElementById('present-day-temp');
    var day = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    };
    list.forEach(function (val, ind) {
      if (ind === 0) {
        $prsntDay.innerText = val.main.temp;
      } else {
        (function (v, i) {
          var dt = new Date(v.dt_txt);
          document.getElementById('future' + i).innerText = day[dt.getDay()] + ' forecast is ' + v.main.temp;
        })(val, ind);
      }
    });
  };
  /**
   * The function to handle dsuccess data
   * @param  {Object} [response={ list:         [] }] [description]
   * @return {[type]}             [description]
   */
  var successCallBack = function successCallBack() {
    var response = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { list: [] };

    displaySelectedCity(response);
    var crntTime = response.list[0].dt_txt.substr(-8);
    var filteredData = filterData(response.list, crntTime);
    console.log(filteredData);
    displayWeatherData(filteredData);
  };
  /**
   * Call to fetch data from Open Weather map
   */
  var generateWeatherData = function generateWeatherData(_ref) {
    var _ref$place = _ref.place,
        place = _ref$place === undefined ? 'Chennai' : _ref$place,
        _ref$cntry = _ref.cntry,
        cntry = _ref$cntry === undefined ? 'IN' : _ref$cntry;

    var url = void 0;
    if (location.protocol === 'http:') {
      url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + place + ',' + cntry + '&units=metric&cnt=25&appid=e83c0a3c38b673ca782b7dd77881c95b';
    } else {
      url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + place + ',' + cntry + '&units=metric&cnt=25&appid=e83c0a3c38b673ca782b7dd77881c95b';
    }
    $.ajax(url).done(function (resp) {
      if (!checkVaildResponse(resp)) {
        $('#error').removeClass('display-none');
        return;
      }
      $('#error').addClass('display-none');
      successCallBack(resp);
    }).fail(function () {
      $('#error').removeClass('display-none');
    });
  };
  /**
   * First function to be invoked by the application
   */
  var init = function init() {
    var place = 'Chennai';
    var cntry = 'IN';
    generateWeatherData({ place: place, cntry: cntry });
  };
  document.getElementById('reload').addEventListener('click', function () {
    generateWeatherData({ place: 'Bangalore' });
  });

  window.app = {
    filterData: filterData,
    generateWeatherData: generateWeatherData,
    displayWeatherData: displayWeatherData,
    displaySelectedCity: displaySelectedCity,
    checkVaildResponse: checkVaildResponse
  };
  window.onload = init;
})();
//# sourceMappingURL=main.js.map
