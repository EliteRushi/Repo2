const watchBtn = document.getElementById('watchBtn');
const remoteVideo = document.getElementById('remoteVideo');
const streamIdInput = document.getElementById('streamId');

const peer = new Peer();

watchBtn.addEventListener('click', async () => {

  const streamId = streamIdInput.value;

  if (!streamId) {
    alert('Enter Stream ID');
    return;
  }

  try {

    const stream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true
    });

    const call = peer.call(streamId, stream);

    call.on('stream', (remoteStream) => {
      remoteVideo.srcObject = remoteStream;
    });

  } catch (err) {

    alert('Connection Failed');

  }

});
