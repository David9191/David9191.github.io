const attendanceButton = document.getElementsByClassName('btn-normal attendance')[0];

const churchLocation = {
  latitude: 37.4,
  longitude: 126.7,
};

const userLocation = {
  latitude: 0,
  longitude: 0,
  accuracy: 0,
  isCorrect: 0,
};

const checkDistanceAccuracy = (correctDistance, distance, accuracy) => {
  const shortestDistance = distance - accuracy;
  const longestDistance = distance + accuracy;
  let rtnValue = 0;

  if (correctDistance >= shortestDistance && correctDistance <= longestDistance) rtnValue = 1;

  return rtnValue;
};

const successGetUserLocation = position => {
  userLocation.latitude = position.coords.latitude;
  userLocation.longitude = position.coords.longitude;
  userLocation.accuracy = position.coords.accuracy;

  if (
    checkDistanceAccuracy(churchLocation.latitude, userLocation.latitude, userLocation.accuracy) &&
    checkDistanceAccuracy(churchLocation.longitude, userLocation.longitude, userLocation.accuracy)
  )
    userLocation.isCorrect = 1;
};

const errorGetUserLocation = error => {
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
};

const getUserLocation = () => {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(successGetUserLocation, errorGetUserLocation);
  else window.location.reload();
};

document.addEventListener('DOMContentLoaded', getUserLocation);

const routeQR = () => {
  if (userLocation.isCorrect) window.location.href = './attendance.html';
  else alert('위치 인증에 실패헸습니다.\n다시 시도해 주세요.');
};

document.getElementsByClassName('btn-normal attendance')[0].addEventListener('click', routeQR);
