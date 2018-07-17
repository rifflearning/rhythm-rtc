import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Home.css';
import {log} from '../libs/utils';
import getUserMedia from 'getusermedia';
import attachMediaStream from 'attachmediastream';

class Home extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.bgvid = React.createRef();
  }

  componentDidMount() {
    log("Dom node: ", this.bgvid);

    getUserMedia((err, stream) => {
      if (err) {
        log("failed to get user media stream");
      } else {
        var videoEl = attachMediaStream(
          stream,
          ReactDOM.findDOMNode(this.bgvid.current),
          {
            muted: true
          }
        );
      }
    });
  }

  render() {
    return (
      <div>
        <video className={styles.bgvid} ref={this.bgvid} autoPlay muted></video>
        <br/>
        <br/>
        <h1 class="header center orange-text">Rhythm</h1>
        <div class="row center">
          <h5 class="header col s12 light flow-text">Augmented social interaction on the web.</h5>
        </div>
        <br/>
        <br/>
        <div class="row center">
          <div class="input-field">
            <div class="file-path-wrapper">
              <div class="col s9">
                <input class="validate" name="room" type="text">
                </input>
              </div>
              <div class="col s3">
                <button class="btn waves-effect waves-light" type="submit">Create or Join Room
                  <i class="material-icons right">chat_bubble</i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="row center">
          <h5 class="col s12 flow-text"> or </h5>
        </div>

        <div class="row center">
          <div class="col s12">
            <div class="btn waves-effect waves-light" id="quickRoom">Create Quick Room
              <i class="material-icons right">chat_bubble_outline</i>
            </div>
          </div>
        </div>
      </div>
     );
  }

}

export default Home;
