import { useState } from 'react';

function ViewboxPlayground() {
    const initialWidth = 400;
    const initialHeight = 400;
    const initialViewbox = viewbox(0, 0, initialWidth, initialHeight);
    const [viewboxHistory, setViewboxHistory] = useState([initialViewbox]);

    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);

    const currentViewbox = viewboxHistory[viewboxHistory.length - 1];

    const shapeSize = 25;
    const halfShapeSize = shapeSize / 2;
    return (
        <details>
            <summary>Viewbox Playground</summary>
            <section className="Zoom">
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
            </section>


            <section className="Pan">
                <button type="button" onClick={() => {
                    setViewboxHistory([...viewboxHistory, viewbox(currentViewbox.x - halfShapeSize, currentViewbox.y, currentViewbox.width, currentViewbox.height)]);
                }}>Right</button>
                <button type="button" onClick={() => {
                    setViewboxHistory([...viewboxHistory, viewbox(currentViewbox.x, currentViewbox.y + halfShapeSize, currentViewbox.width, currentViewbox.height)]);
                }}>Up</button>
                <button type="button" onClick={() => {
                    setViewboxHistory([...viewboxHistory, viewbox(currentViewbox.x, currentViewbox.y - halfShapeSize, currentViewbox.width, currentViewbox.height)]);
                }}>Down</button>
                <button type="button" onClick={() => {
                    setViewboxHistory([...viewboxHistory, viewbox(currentViewbox.x + halfShapeSize, currentViewbox.y, currentViewbox.width, currentViewbox.height)]);
                }}>Left</button>
            </section>

            <main>
                <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox={`${currentViewbox.x} ${currentViewbox.y} ${currentViewbox.width} ${currentViewbox.height}`}>
                    <circle cx={width / 2} cy={height / 2} r={shapeSize} fill='red' />
                    <rect
                        x={0 - halfShapeSize}
                        y={(height / 2) - halfShapeSize}
                        height={shapeSize}
                        width={shapeSize}
                    />
                    <rect
                        x={width - halfShapeSize}
                        y={(height / 2) - halfShapeSize}
                        height={shapeSize}
                        width={shapeSize}
                    />
                    <rect
                        x={(width / 2) - halfShapeSize}
                        y={0 - halfShapeSize}
                        height={shapeSize}
                        width={shapeSize}
                    />
                    <rect
                        x={(width / 2) - halfShapeSize}
                        y={height - halfShapeSize}
                        height={shapeSize}
                        width={shapeSize}
                    />
                </svg>
            </main>

            <details>
                <summary>Viewbox History</summary>
                <ol>
                    {
                        viewboxHistory.map((vb, i) => (
                            <li key={i}>
                                {`height="${height}" width="${width}" viewBox="${vb.x} ${vb.y} ${vb.width} ${vb.height}"`}
                            </li>
                        ))
                    }
                </ol>
            </details>
        </details>
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
export default ViewboxPlayground;