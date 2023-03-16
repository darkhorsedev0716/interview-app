/* eslint-env browser */
import React from "react";
import Context from "../../../context";

const videoType = "video/webm";

export default class InterviewStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      current: {},
      questions: [],
      remaining: {
        mins: 0,
        secs: 0,
      },
      index: 0,
      end: false,
      timedOut: false,
    };
  }

  static contextType = Context;

  async componentDidMount() {
    const { questions } = this.context.state.interview;
    this.setState({ questions });
    if (questions.length === 1) {
      this.setState({ end: true });
    }
    const current = questions[this.state.index];

    this.setState({ current });
    this.updateRemaining(current.time, current.timeUnit);

    this.startRecording();
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
          this.setState({ recording: false, timedOut: true });
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
    this.setState({ recording: true, timedOut: false });
  }

  stopRecording() {
    clearInterval(this.interval);
    // stop the recorder
    if (this.mediaRecorder && this.state.recording) {
      this.mediaRecorder.stop();
      this.setState({ recording: false });
    }
    // say that we're not recording
    // save the video to memory
    return this.saveVideo();
  }

  saveVideo() {
    console.log({chunks: this.chunks});
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, { type: videoType });
    // localStorage.setItem('blob', JSON.stringify(blob))
    // generate video url from blob
    // const videoURL = window.URL.createObjectURL(blob);
    console.log(this.state);
    const newState = [
      ...(this.context.state.videos || []),
      {
        interviewId: this.context.state.interview._id,
        candidateId: this.context.state.candidate._id,
        questionId: this.state.current.id,
        blob,
      },
    ];
    this.context.setState((prev) => ({
      ...prev,
      videos: newState,
    }));
    return newState;
  }

  handleNextQuestion = () => {
    this.setState({ remaining: 0 });
    this.stopRecording();
    const { questions } = this.state;
    const length = questions.length;
    if (length === this.state.index + 2) {
      this.setState({ end: true });
    }

    if (this.state.index + 1 <= length) {
      this.setState({ index: this.state.index + 1 });
      this.setState({ current: questions[this.state.index + 1] });
      this.updateRemaining(
        questions[this.state.index + 1].time,
        questions[this.state.index + 1].timeUnit
      );
    }

    this.startRecording();
  };

  blobToBase64 = (blob) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  handleSubmit = async () => {
    let videos = this.stopRecording();
    console.log({videos});
    const res = await this.context.submitInterviewAnswers(videos);
    if (res.status === "success") {
      this.props.setStep(this.props.step + 1);
    } else {
      alert("An error occurred");
    }
  };

  render() {
    const { recording, remaining, questions, current, index, end } = this.state;
    const { loading } = this.context.state;
    return (
      <div className="my-3">
        <p>
          Interview for #546673. This is the actual interview session and we are
          recording the video and audio.
        </p>

        <div className="quiz-container">
          <div className="quiz-row">
            <div className="p-2">
              <span style={{ fontWeight: "bold" }}>
                Question {index + 1 + " / " + questions.length}
              </span>
              <h6>{current?.question} </h6>
            </div>
            <div className="cam-container">
              {
                <video
                  style={{ width: 520, height: 320 }}
                  ref={(v) => {
                    this.video = v;
                  }}
                  muted
                >
                  Video stream not available.
                </video>
              }
              <div className={`is-recording ${recording && "active"}`}></div>
            </div>
          </div>
          <h6>
            Time left{" "}
            <strong className="mx-2">
              {remaining.mins} minutes {remaining.secs} seconds
            </strong>
          </h6>
        </div>

        <div>
          {this.state.timedOut && (
            <>
              <p>
                <b>Question Timed out and Recording stopped.</b>
              </p>
              <p>
                <b>
                  {end
                    ? "Your Interview has ended. Click finish button below to submit your answers"
                    : "Click Next Question button below to go to next question"}
                </b>
              </p>
            </>
          )}
        </div>

        <div className="d-flex align-items-center justify-content-center mb-3 mt-5">
          {end ? (
            <button
              disabled={loading}
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              {loading ? "Loading...." : "Finish"}
            </button>
          ) : (
            <button
              disabled={loading}
              className="btn btn-primary"
              onClick={this.handleNextQuestion}
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    );
  }
}
