'use strict';

// geolocation
navigator.geolocation.getCurrentPosition(success, fail);

function success(pos) {
    ajaxRequest(pos.coords.latitude, pos.coords.longitude);
}

function fail(error) {
    alert('位置情報の取得に失敗しました。エラーコード：' + error.code);
}

// UTCをミリ秒に
function utcToJSTime(utcTime) {
    return utcTime * 1000;
}

// データ取得
function ajaxRequest(lat, long) {
    const url = 'https://api.openweathermap.org/data/2.5/forecast';
    const appId = '9c309261acc4e331ce80044704d02002';

    $.ajax({
            url: url,
            data: {
                appid: appId,
                lat: 43.0557507,
                lon: 141.3195318,
                units: 'metric',
                lang: 'ja'
            }
        })
        .done(function (data) {
            // 都市名、国名
            //        $('#place').text(data.city.name + ',' + data.city.country);
            // 天気予報データ
            data.list.forEach(function (forecast, index) {
                const dateTime = new Date(utcToJSTime(forecast.dt));
                const month = dateTime.getMonth() + 1;
                const date = dateTime.getDate();
                const hours = dateTime.getHours();
                const min = String(dateTime.getMinutes()).padStart(2, '0');
                const temperature = Math.round(forecast.main.temp);
                const description = forecast.weather[0].description;
                const iconPath1 = `../img/${forecast.weather[0].icon}.svg`;

                // 現在の天気とそれ以外で出力を変える
                if (index === 0) {
                    const currentWeather = `
                <div class="icon"><img class="iconimg" src="${iconPath1}"></div>
                <div class="info">
                    <p>
                        <span class="description">現在の天気：${description}</span>
                        <span class="temp">${temperature}</span>°C
                    </p>
                </div>`;
                    $('#weather').html(currentWeather);
                }
                if (index === 1) {
                    const tableRow = `
                <div class="waku">
                <div class="no1">
                <p>時間：&nbsp;&nbsp;${hours}</p><a>気温：&nbsp;&nbsp;${temperature}</a></div></div>`;
                    $('#forecast').append(tableRow);
                }
                if (index === 2) {
                    const tableRow = `
                <div class="waku">
                <p>${hours}</p><a>${temperature}</a></div>`;
                    $('#forecast').append(tableRow);
                }
                if (index === 3) {
                    const tableRow = `
               <div class="waku">
                <p>${hours}</p><a>${temperature}</a></div>`;
                    $('#forecast').append(tableRow);
                }
                if (index === 4) {
                    const tableRow = `
              <div class="waku">
                <p>${hours}</p><a>${temperature}</a></div>`;
                    $('#forecast').append(tableRow);
                }
                if (index === 5) {
                    const tableRow = `

               <div class="waku">
                <p>${hours}</p><a>${temperature}</a></div>`;
                    $('#forecast').append(tableRow);
                }
                if (index === 6) {
                    const tableRow = `
               <div class="waku">
                <p>${hours}</p><a>${temperature}</a></div>`;
                    $('#forecast').append(tableRow);
                }
//                if (index === 7) {
//                    const tableRow = `
//               <div class="waku">
//                <p>${hours}</p><a>${temperature}</a></div>`;
//                    $('#forecast').append(tableRow);
//                }
//                if (index === 8) {
//                    const tableRow = `
//               <div class="waku">
//                <p>${hours}</p><a>${temperature}</a></div>`;
//                    $('#forecast').append(tableRow);
//                }

            });
        })
        .fail(function () {
            console.log('$.ajax failed!');
        })
}
