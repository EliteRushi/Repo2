const localVideo = document.getElementById('localVideo');
const startBtn = document.getElementById('startBtn');
const peerIdText = document.getElementById('peerId');
const statusText = document.getElementById('status');

let localStream;

const peer = new Peer();

peer.on('open', (id) => {
  peerIdText.innerText = id;
});

peer.on('error', (err) => {
  statusText.innerText = 'Peer Error: ' + err;
});

startBtn.addEventListener('click', async () => {

  statusText.innerText = 'Requesting camera access...';

  try {

    localStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: {
          ideal: 'environment'
        }
      },
      audio: true
    });

    localVideo.srcObject = localStream;

    await localVideo.play();

    statusText.innerText = 'Camera Started Successfully';

  } catch (err) {

    console.error(err);

    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      statusText.innerText = 'Camera requires HTTPS or GitHub Pages';
    } else {
      statusText.innerText = 'Camera access denied or unsupported browser';
    }

    alert('Error: ' + err.message);

  }

});
