
import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
let localStream;
let peerConn;
function Messages() {
  const webSocket = new WebSocket("ws://localhost:5000");

  const [username, setUsername] = useState("");
  const [isCallStarted, setIsCallStarted] = useState(false);
  const localVideo = useRef();
  const remoteVideo = useRef();

  webSocket.onmessage = (event) => {
    handleSignallingData(JSON.parse(event.data));
  };

  function sendUsername() {
    sendData({
      type: "store_user",
      username: username,
    });
  }

  function handleSignallingData(data) {
    switch (data.type) {
      case "answer":
        peerConn.setRemoteDescription(data.answer);
        break;
      case "candidate":
        peerConn.addIceCandidate(data.candidate);
    }
  }

  function sendData(data) {
    ///data.username = username;
    console.log(data);
    webSocket.send(JSON.stringify(data));
  }

  function startCall() {
    setIsCallStarted(true);

    navigator.getUserMedia(
      {
        video: {
          frameRate: 24,
          width: {
            min: 480,
            ideal: 720,
            max: 1280,
          },
          aspectRatio: 1.33333,
        },
        audio: true,
      },
      (stream) => {
        localStream = stream;
        localVideo.current.srcObject = localStream;

        let configuration = {
          iceServers: [
            {
              urls: [
                "stun:stun.2talk.co.nz:3478",
                "stun:stun.actionvoip.com:3478",
                "stun:stun.bluesip.net:3478",
              ],
            },
          ],
        };

        peerConn = new RTCPeerConnection(configuration);
        peerConn.addStream(localStream);

        peerConn.onaddstream = (e) => {
          remoteVideo.current.srcObject = e.stream;
        };

        peerConn.onicecandidate = (e) => {
          if (e.candidate == null) return;
          sendData({
            type: "store_candidate",
            candidate: e.candidate,
          });
        };

        createAndSendOffer();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function createAndSendOffer() {
    peerConn.createOffer(
      (offer) => {
        sendData({
          type: "store_offer",
          offer: offer,
        });

        peerConn.setLocalDescription(offer);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  let isAudio = true;
  function muteAudio() {
    isAudio = !isAudio;
    localStream.getAudioTracks()[0].enabled = isAudio;
  }

  let isVideo = true;
  function muteVideo() {
    isVideo = !isVideo;
    localStream.getVideoTracks()[0].enabled = isVideo;
  }
  return (
    <div className=" text-center text-xl">
      <section className="">
        <div>
          <input
            placeholder="Enter username..."
            type="text"
            id="username-input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <button
            className="bg-white p-2 text-black hover:bg-white"
            onClick={(e) => sendUsername(e)}
          >
            Send
          </button>
          <button
            className="mt-2 ml-1 bg-white p-2 text-black hover:bg-white"
            onClick={() => startCall()}
          >
            Start Call
          </button>
        </div>
        <div
          id="video-call-div"
          className={`absolute top-0 left-0 block h-full w-full ${
            isCallStarted ? "inline" : "hidden"
          }`}
        >
          <video
            muted
            id="local-video"
            ref={localVideo}
            className="absolute top-0 left-0 m-3 max-h-[20%] max-w-[20%] rounded-lg bg-white"
            autoPlay
          ></video>
          <video
            id="remote-video"
            ref={remoteVideo}
            className="h-full w-full bg-black"
            autoPlay
          ></video>
          <div className="call-action-div absolute left-[45%] bottom-[32px]">
            <button
              className="bg-white p-2 text-black hover:bg-white"
              onClick={() => muteVideo()}
            >
              Mute Video
            </button>
            <button
              className="ml-1 bg-white p-2 text-black hover:bg-white"
              onClick={() => muteAudio()}
            >
              Mute Audio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Messages), { ssr: false });
