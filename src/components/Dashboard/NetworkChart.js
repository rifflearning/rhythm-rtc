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
import _ from 'underscore';
import ChartCard from './ChartCard';

const colorYou = '#ab45ab';
let peerColors = ['#f56b6b', '#128EAD', '#7caf5f', '#f2a466'];

const addColorsToData = (networkData, participantId) => {
  console.log(networkData);
  let otherNodes = _.map(_.filter(networkData.nodes, (n) => { return n.id != participantId; }),
                         (n, idx) => {
                           n.color = peerColors[idx];
                           return n;
                         });
  console.log("other nodes:", otherNodes);
  let participantNode = {id: participantId, color: colorYou};
  otherNodes.push(participantNode);

  networkData.nodes = otherNodes;
  return networkData;
};

const addLabelsToData = (networkData, participantId) => {
  networkData.nodes = _.map(networkData.nodes, (n) => {
    if (n.id == participantId) {
      return {...n,
              label: "You"
             };
    } else {
      return n;
    }
  });
  return networkData;
};


const chartInfo = "This network graph represents who you are most likely to speak after. \
A stronger connection to another person in your meeting means you are likely paying more \
attention to what they have to say.";
const NetworkChart = ({processedNetwork, participantId}) => {
  console.log("data for network:", processedNetwork);
  processedNetwork = addColorsToData(processedNetwork, participantId);
  processedNetwork = addLabelsToData(processedNetwork, participantId);

  const Network = (
    <Sigma
      graph={processedNetwork}
      renderer="canvas"
      style={{
        width: "24.8vw",
        height: "25vw"
      }}
      settings={{
        drawEdges: true,
        clone: false,
        maxNodeSize: 20,
        minNodeSize: 20,
        minEdgeSize: _.min(processedNetwork.edges, (e) => { return e.size; }).size,
        maxEdgeSize: _.max(processedNetwork.edges, (e) => { return e.size; }).size,
        defaultEdgeColor: "rgb(243, 108,	110)",
        defaultNodeColor: "#bdc3c7"
      }}>
      <RelativeSize initialSize={10}/>
      <EdgeShapes default="curvedArrow"/>
      <NodeShapes default="circle" borderColor="#FF3333"/>
      <ForceLink background easing="cubicInOut"/>
      <RandomizeNodePositions/>
    </Sigma>);

  return (
    <ChartCard
      title="Influence"
      chartDiv={Network}
      chartInfo={chartInfo}>
    </ChartCard>
  );
};

export default NetworkChart;
