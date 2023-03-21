import {
  Streamlit,
  withStreamlitConnection,
  ComponentProps,
} from "streamlit-component-lib"
import Plot from 'react-plotly.js'
import { useState } from "react"

const PlotlyPreserveZoomComponent = (props: ComponentProps): any => {
  // Pull Plotly object from args and parse
  const { data, layout, frames, config } = JSON.parse(props.args.spec);
  const override_height = props.args.override_height;
  const override_width = props.args.override_width;

  // Initialize events
  let click_event = false;
  let select_event = false;
  let hover_event = false;

  // Get Event and set according events to false/true with switch
  const event = props.args.event;
  switch (event) {
    case "click":
      click_event = true;
      break;
    case "select":
      select_event = true;
      break;
    case "hover":
      hover_event = true;
      break;
  }

  /** Click handler for plot. */
  const plotlyEventHandler = (eventData: any) => {
    // If no event data, send only the current range to Streamlit
    if (eventData === null) {
      const range = state.layout.xaxis.range;
      const clickedPointsDict = {
        points: [],
        selected_range: range
      }
      Streamlit.setComponentValue(clickedPointsDict);
      return;
    }
    // Build array of points to return
    var clickedPoints: Array<any> = [];
    eventData.points.forEach(function (arrayItem: any) {
      clickedPoints.push({
        x: arrayItem.x,
        y: arrayItem.y,
        curveNumber: arrayItem.curveNumber,
        pointNumber: arrayItem.pointNumber,
        pointIndex: arrayItem.pointIndex
      })
    });
    const range = state.layout.xaxis.range;
    // build dict to return
    const clickedPointsDict = {
      points: clickedPoints,
      selected_range: range
    }
    // Send event to Streamlit
    Streamlit.setComponentValue(clickedPointsDict);
  }
  // Preserve zoom etc. state
  const [state, setState] = useState({data, layout, frames, config});
  
  Streamlit.setFrameHeight(override_height);
    
  return (
    <Plot
      data={state.data}
      layout={state.layout}
      config={state.config}
      frames={state.frames}
      onClick={click_event ? plotlyEventHandler : function(){}}
      onSelected={select_event ? plotlyEventHandler : function(){}}
      onHover={hover_event ? plotlyEventHandler : function(){}}
      onInitialized={(
        figure: any,
      ) => {
          setState(
          {
            data: data,
            layout: layout,
            frames: frames,
            config: config
          }
        )
        plotlyEventHandler(null);
        }
      }
      onUpdate={(
        figure: any,
      ) => setState(
        {
          data: figure.data,
          layout: figure.layout,
          frames: figure.frames,
          config: figure.config
        }
      )}
      style={{width: override_width, height: override_height}}
      onAfterPlot={() => {
        plotlyEventHandler(null);
      }}
    />
  )
}

export default withStreamlitConnection(PlotlyPreserveZoomComponent)
