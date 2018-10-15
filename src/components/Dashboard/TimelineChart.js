import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import styled, { injectGlobal, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import ReactChartkick, { ColumnChart, PieChart } from 'react-chartkick';
import {ScaleLoader} from 'react-spinners';
import {Sigma, SigmaEnableWebGL,
        RandomizeNodePositions,
        RelativeSize,
        EdgeShapes, NodeShapes,
       } from 'react-sigma';
import ForceLink from 'react-sigma/lib/ForceLink';
import MaterialIcon from 'material-icons-react';
import Chart from 'chart.js';
import moment from 'moment';
import lifecycle from 'react-pure-lifecycle';
import _ from 'underscore';
import Gantt from './gantt';
import ChartCard from "./ChartCard";

const colorYou = '#ab45ab';
const colorOther = '#bdc3c7';
let peerColors = ['#f56b6b', '#128AD', '#7caf5f', '#f2a466'];

const drawGantt = (props) => {
  const {processedTimeline, participantId} = props;
  const {utts, participants, startTime, endTime} = processedTimeline;
  // create map of id: name
  let participants2 = _.sortBy(participants, "id");
  console.log("sorted participants:", participants2);
  let participantNames = _.pluck(participants2, "name");
  let participantIds = _.pluck(participants2, "id");
  let participantMap = _.object(participantIds, participantNames);

  const getColor = (pId) => {
    let color = peerColors[participantIds.indexOf(pId)];
    if (color == undefined) {
      color = colorOther;
    }
    return color;
  };
  // create extra key 'taskName' detailing name of speaker
  let utts2 = _.map(utts, (u) => {
    return {...u,
            taskName: participantMap[u.participant],
            color: u.participant == participantId ? colorYou : getColor(u.participant)};
  });
  var gantt = Gantt()
      .taskTypes(participantNames);
  gantt(utts2);
};

const componentDidMount = (props) => {
  drawGantt(props);
};

const componentDidUpdate = (props) => {
  // console.log("component updating...", props);
  // drawGantt(props);
  return false;
};

const methods = {
  componentDidUpdate,
  componentDidMount
};

const WaveDiv = styled.div`
background: rgba(171,69,171,1);
margin-top: -10px;
padding-bottom: 10rem;
`;

const chartInfo = "This shows a timeline of your meeting.";

// processedTimeline:
// processedUtterances: [list of utterances...]
// participants: [{id, name, ...}, ...]
const TimelineView = (props) => {
  const chartDiv = (<div id="gantt"></div>);
  return (
    <React.Fragment>
      <svg id="Layer_1"  x="0px" y="0px" viewBox="0 0 1440 126">
        <path style={{fill: "rgba(171,69,171,1)"}} d="M685.6,38.8C418.7-11.1,170.2,9.9,0,30v96h1440V30C1252.7,52.2,1010,99.4,685.6,38.8z"></path>
      </svg>
      <WaveDiv>
        <ChartCard title="Timeline"
                   chartDiv={chartDiv}
                   // messy, but here we need to give the child component
                   // a way to redraw the chart
                   redraw={() => drawGantt(props)}
                   chartInfo={chartInfo}
                   maxWidth = "50"/>
      </WaveDiv>
    </React.Fragment>
  );
}

const TimelineChart = lifecycle(methods)(TimelineView);

export default TimelineChart;
