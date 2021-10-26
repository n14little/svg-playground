import { useState } from 'react';
import './App.css';

function App() {
  const initialWidth = 400;
  const initialHeight = 400;
  const initialViewbox = viewbox(0, 0, initialWidth, initialHeight);
  const [viewboxHistory, setViewboxHistory] = useState([initialViewbox]);

  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);

  const currentViewbox = viewboxHistory[viewboxHistory.length - 1];

  return (
    <div className="App">
      <button type="button" onClick={() => {
        const newWidth = currentViewbox.width / 2;
        const newHeight = currentViewbox.height / 2;

        const newX = (initialWidth - newWidth) / 2;
        const newY = (initialHeight - newHeight) / 2;

        setViewboxHistory([...viewboxHistory, viewbox(newX, newY, newWidth, newHeight)]);
      }}>Zoom In</button>
      <button type="button" onClick={() => {
        const newWidth = currentViewbox.width * 2;
        const newHeight = currentViewbox.height * 2;

        const newX = currentViewbox.x - (currentViewbox.width / 2);
        const newY = currentViewbox.y - (currentViewbox.height / 2);

        setViewboxHistory([...viewboxHistory, viewbox(newX, newY, newWidth, newHeight)]);

      }}>Zoom Out</button>

      <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox={`${currentViewbox.x} ${currentViewbox.y} ${currentViewbox.width} ${currentViewbox.height}`}>
        <circle cx={width / 2} cy={height / 2} r='25' fill='red'/>
      </svg>

      {
        viewboxHistory.map((vb, i) => (
          <p key={i}>
            {`${i}.) height="${height}" width="${width}" viewBox="${vb.x} ${vb.y} ${vb.width} ${vb.height}"`}
          </p>
        ))
      }
    </div>
  );
}

function viewbox(x, y, width, height) {
  return {
    x,
    y,
    width,
    height
  };
}

export default App;
