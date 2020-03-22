import React,{useState, useRef} from 'react';
import * as d3 from 'd3';
import ChartWrapper from './ChartWrapper'
import styled from 'styled-components'

const StyledSelect = styled.select`
height: 40px;
width: 60px;
`

function App() {
  return (
    <div>
       <ChartWrapper />
    </div>
  );
}

export default App;
