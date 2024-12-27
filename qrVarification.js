// const QRCodeGenerator = () => {
//   const canvas = document.getElementById('qrcode');

//   QRCode.toCanvas(canvas, 'https://naver.com', error => {
//     if (error) console.log(error);
//     console.log('success!');
//   });
// };

// With async/await
const generateQR = async text => {
  try {
    console.log(await QRCode.toDataURL(text));
  } catch (err) {
    console.error(err);
  }
};

const qrBtn = document.getElementById('qr-generator');
qrBtn.addEventListener('click', generateQR);
