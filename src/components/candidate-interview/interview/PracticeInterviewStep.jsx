/* eslint-env browser */
import React from "react";
import Context from "../../../context";
const videoType = "video/webm";

const questions = {
  practice: [
    {
      id: "0",
      question: "What did you do before this?",
      duration: 3,
    },
    {
      id: "1",
      question: "What do you enjoy about your job?",
      duration: 1,
    },
  ],
};

export default class PracticeInterviewStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      current: {},
      practice: [
        {
          id: "0",
          question: "What did you do before this?",
          duration: 3,
        },
      ],
      remaining: {
        mins: 0,
        secs: 0,
      },
      index: 0,
      end: false,
      checked: false,
      testVideos: [],
    };
  }

  static contextType = Context;

  async componentDidMount() {
    const { practice } = questions;
    this.setState({ practice });
    this.setState({ checked: false });

    const quiz = practice?.find((p) => p.id === this.state.index.toString());
    this.setState({
      current: quiz,
    });
    this.updateRemaining(quiz.duration);

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

  stopRecording() {
    clearInterval(this.interval);
    // stop the recorder
    if (this.mediaRecorder && this.state.recording) {
      this.mediaRecorder.stop();
      this.setState({ recording: false });
    }
    return this.saveVideo();
  }

  saveVideo() {
    const blob = new Blob(this.chunks, { type: videoType });
    const videoUrl = URL.createObjectURL(blob);
    this.setState({ testVideos: [...this.state.testVideos, videoUrl] });
    this.chunks = [];
  }

  updateRemaining = (duration, unit) => {
    this.setState({ remaining: { mins: 0, secs: 0 } });
    let total = unit === "second" ? duration : duration * 60;

    let mins = Math.floor(total / 60);
    let secs = total % 60;

    this.setState({ remaining: { mins, secs } });
    this.interval = setInterval(() => {
      total = this.state.remaining.mins * 60 + this.state.remaining.secs;
      if (total === 0) {
        if (this.mediaRecorder && this.state.recording) {
          this.mediaRecorder.stop();
          this.setState({ recording: false });
        }
      } else {
        total--;
        mins = Math.floor(total / 60);
        secs = total % 60;

        this.setState({
          remaining: { mins, secs },
        });
      }
    }, 1200);
  };

  handleNextQuestion = () => {
    this.stopRecording();

    const { practice } = this.state;
    const length = practice.length;
    if (length - 1 === this.state.index) {
      this.setState({ end: true });
    }
    if (this.state.index + 1 <= length) {
      this.setState({ index: this.state.index + 1 });
      const quiz = practice?.find(
        (p) => p.id === (this.state.index + 1).toString()
      );
      this.updateRemaining(quiz.duration);
      this.setState({
        current: quiz,
      });
    }
    this.startRecording();
  };

  render() {
    const { current, remaining, practice, index, end, recording, testVideos } =
      this.state;
    const { step, setStep } = this.props;

    const { state } = this.context;

    return (
      <div className="my-3">
        <p>
          Thank you for your interest in {state?.interview?.title} position at{" "}
          {state?.interview?.location}. This is the practice session and is not part of
          your actual interview. You can practice as many tims as you want.
        </p>
        {!end && (
          <>
            <div className="quiz-container">
              <div className="quiz-row">
                <div className="p-2">
                  <span style={{ fontWeight: "bold" }}>
                    Question {index + 1 + " / " + practice.length}
                  </span>
                  <h6>{current.question} </h6>
                </div>
                <div className="cam-container">
                  {
                    <video
                      style={{ width: 500, height: 300 }}
                      ref={(v) => {
                        this.video = v;
                      }}
                      muted
                    >
                      Video stream not available.
                    </video>
                  }
                  <div
                    className={`is-recording ${recording && "active"}`}
                  ></div>
                </div>
              </div>
              <h6>
                Time left{" "}
                <strong className="mx-2">
                  {remaining.mins} minutes {remaining.secs} seconds
                </strong>
              </h6>
            </div>

            <div className="d-flex align-items-center justify-content-center mb-3 mt-5">
              <button
                className="btn btn-primary"
                onClick={this.handleNextQuestion}
              >
                Next Question
              </button>
            </div>
          </>
        )}

        {end && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "10px 0px",
            }}
          >
            <h3>Your answers will appear as shown below</h3>
            <div className="my-4">
              {testVideos.map((url, i) => (
                <div key={i} className="my-3">
                  <p className="mb-2">
                    Question: <b> {practice[i].question}</b>
                  </p>
                  <video
                    style={{ width: 800, height: 400 }}
                    src={url}
                    audio
                    controls
                  >
                    Video stream not available.
                  </video>
                </div>
              ))}
            </div>
            <div className="d-flex align-items-center justify-content-center mb-3 mt-5">
              <button
                className="btn btn-primary"
                onClick={() => setStep(step + 1)}
              >
                Continue To Interview
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
