# streamlit-advanced-plotly-chart
This is a streamlit custom component to preserve the zoom level of a plotly chart when getting event data from it. It also returns the range of the x- and y-axis, which is useful for zooming in on a specific part of the chart and using a rangeslider.

It is based on the [streamlit-plotly-events](https://github.com/null-jones/streamlit-plotly-events/tree/master) component.


## Usage
```python
import streamlit as st
import plotly.express as px
import numpy as np

st.set_page_config(layout="wide")

st.subheader("Plotly Line Chart")

time = np.arange(0, 100, 0.1)
amplitude = np.sin(time)

fig = px.line(x=time, y=amplitude)

fig.update_xaxes(rangeslider_visible=True, range=[0, 10])

clickedPoint = preserveZoomPlotlyChart(fig, event='click')
```

When adding multiple lines to the chart and using a key, the plotly chart is stuck. Therefore, the key argument is not supported.

## Installation
```bash
pip install streamlit-advanced-plotly-chart
```



