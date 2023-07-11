import React, { useEffect, useRef, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';

function IndexPage() {
  const [grid, setGrid] = useState([]);
  const [predictions, setPredictions] = useState(0);
  const [dragging, setDragging] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const newGrid = [];
    for (let i = 0; i < 28 * 28; i++) {
      newGrid.push({ id: i });
    }
    setGrid(newGrid);

    getPicture()
      .then((prediction) => {
        // grid.forEach((cell) => {
        //   const row = Math.floor(cell.id / 28);
        //   const col = cell.id % 28;
        //   if (prediction.data[row][col] > 0) {
        //     handleCellTouch(cell.id);
        //   }
        // });
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }, []);

  const handleCellTouch = (cellIndex) => {
    setGrid((prevGrid) => {
      const updatedGrid = [...prevGrid];
      updatedGrid[cellIndex].color = '#4e5154';
      return updatedGrid;
    });
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
    let coords;
    if (event.touches) {
      // Touch event
      coords = event.touches[0];
    } else {
      // Mouse event
      coords = { clientX: event.clientX, clientY: event.clientY };
    }
    const cell = document.elementFromPoint(coords.clientX, coords.clientY);
    if (cell && cell.classList.contains('grid-cell')) {
      const cellIndex = parseInt(cell.getAttribute('data-cell-index'));
      handleCellTouch(cellIndex);
    }
  };

  const handleMouseDown = (event) => {
    setDragging(true);
    handleTouchMove(event);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (event) => {
    if (dragging) {
      handleTouchMove(event);
    }
  };

  const handlePrintArray = async () => {
    const resultArray = Array(28)
      .fill(0)
      .map(() => Array(28).fill(0));
    grid.forEach((cell) => {
      const row = Math.floor(cell.id / 28);
      const col = cell.id % 28;
      if (cell.color === '#4e5154') {
        resultArray[row][col] = 1;
      }
    });
    await makePrediction(resultArray);
  };

  async function getPicture() {
    const response = await fetch('http://10.0.0.23:5000/picture', {
      method: 'GET',
    });

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    const prediction = await response.json();
    console.debug('hello');
    console.log(prediction.data);
    console.debug('hello22');
    console.debug(grid);

    grid.forEach((cell) => {
      const row = Math.floor(cell.id / 28);
      const col = cell.id % 28;
      console.log('done');
      if (prediction.data[row][col] > 0) {
        handleCellTouch(cell.id);
        console.log('handle');
      }
    });
  }

  async function makePrediction(data) {
    const response = await fetch('http://10.0.0.23:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    const json = await response.json();
    console.log(json);
    setPredictions(json.prediction);
  }

  useEffect(() => {
    const gridElement = gridRef.current;

    gridElement.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });
    gridElement.addEventListener('mousedown', handleMouseDown);
    gridElement.addEventListener('mouseup', handleMouseUp);
    gridElement.addEventListener('mousemove', handleMouseMove);

    return () => {
      gridElement.removeEventListener('touchmove', handleTouchMove);
      gridElement.removeEventListener('mousedown', handleMouseDown);
      gridElement.removeEventListener('mouseup', handleMouseUp);
      gridElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      <Box backgroundColor="blue.200" padding={4} borderRadius="md" boxShadow="md">
        Welcome! Draw any digit below.
      </Box>
      <div ref={gridRef} id="grid-container">
        {grid.map((cell) => (
          <div
            key={cell.id}
            className="grid-cell"
            style={{ backgroundColor: cell.color !== '' ? cell.color : 'initial' }}
            data-cell-index={cell.id}
          ></div>
        ))}
      </div>
      <Button onClick={handlePrintArray}>Predict</Button>
      {predictions !== 0 && <div>{predictions}</div>}
    </div>
  );
}

export default IndexPage;
