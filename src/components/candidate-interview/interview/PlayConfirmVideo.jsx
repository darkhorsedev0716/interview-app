/* eslint-env browser */
import React from "react";
import Context from "../../../context";

const videoType = "video/webm";

export default class PlayConfirmVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      testVideoURL: "",
    };
  }

  static contextType = Context;

  async componentDidMount() {
    this.startRecording();
  }

  async startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    // show it to user
    this.video.srcObject = stream;
    this.video.play();

    // init recording
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: videoType,
    });
    // start recorder with 10ms buffer
    this.mediaRecorder.start(10);

    // init data storage for video chunks
    this.chunks = [];
    // listen for data from media recorder
    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      } else {
        console.log("no data");
      }
    };
    // say that we're recording
    this.setState({ recording: true });
  }

  stopRecording = () => {
    // stop the recorder
    if (this.mediaRecorder && this.state.recording) {
      this.mediaRecorder.stop();
      this.setState({ recording: false });
    }
    this.saveVideo();
  };

  saveVideo() {
    const blob = new Blob(this.chunks, { type: videoType });
    const videoUrl = URL.createObjectURL(blob);
    this.setState({ testVideoURL: videoUrl });
  }

  render() {
    const { recording, testVideoURL } = this.state;
    return (
      <div className="my-3">
        <p>
          To confirm your audio and video, record yourself and we will play the
          video for you
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {testVideoURL ? (
            <video
              style={{ width: 800, height: 400 }}
              src={testVideoURL}
              autoPlay
              audio
              controls
            >
              Video stream not available.
            </video>
          ) : (
            <div
              style={{
                position: "relative",
              }}
            >
              <video
                style={{ width: 800, height: 400 }}
                ref={(v) => {
                  this.video = v;
                }}
                muted
              >
                Video stream not available.
              </video>
              <div
                style={{ right: "25px" }}
                className={`is-recording ${recording && "active"}`}
              ></div>
            </div>
          )}
          {recording && (
            <button onClick={this.stopRecording} className="btn btn-primary">
              Stop & Play Recording
            </button>
          )}
        </div>
      </div>
    );
  }
}
