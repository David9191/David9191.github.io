const attendanceButton = document.getElementsByClassName('btn-normal attendance')[0];

const checkDistanceAccuracy = (correctDistance, distance, accuracy) => {
  const shortestDistance = distance - accuracy;
  const longestDistance = distance + accuracy;
  let rtnValue = 0;

  if (correctDistance >= shortestDistance && correctDistance <= longestDistance) rtnValue = 1;

  return rtnValue;
};

attendanceButton.addEventListener('click', async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const correctLatitude = 37.4;
        const correctLongitude = 126.7;

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accuracy = position.coords.accuracy;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        // 위치 정보를 사용하여 추가 작업을 수행할 수 있습니다.
        if (
          checkDistanceAccuracy(correctLatitude, latitude, accuracy) &&
          checkDistanceAccuracy(correctLongitude, longitude, accuracy)
        ) {
          alert('위치 인증 성공');
          window.location.replace('./attendance.html');
        } else {
          alert('위치 인증 실패');
        }
      },
      error => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert('위치 권한이 거부되었습니다.');
            break;
          case error.POSITION_UNAVAILABLE:
            alert('위치 정보를 사용할 수 없습니다.');
            break;
          case error.TIMEOUT:
            alert('위치 요청 시간이 초과되었습니다.');
            break;
          default:
            alert('알 수 없는 오류가 발생했습니다.');
            break;
        }
      }
    );
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
});
