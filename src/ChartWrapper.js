import React, { useState, useEffect, useRef } from "react";
import D3Chart from "./D3Chart";
export default function ChartWrapper(props) {
  const chart = useRef();


  
  useEffect(() => {
    new D3Chart(chart);
  }, []);
  
  return (
  <div ref={chart}>

  </div>);
}
