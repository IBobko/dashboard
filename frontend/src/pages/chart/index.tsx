import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Box, Input, Button, VStack } from "@chakra-ui/react";

function ChartPage() {
    const canvasRef = useRef(null);
    const [gridSize, setGridSize] = useState(8);
    const [boolMatrix, setBoolMatrix] = useState(() => {
        return new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(false));
    });

    const handleInputChange = (event) => {
        const input = event.target.value;

        if (input.length !== gridSize * gridSize || !/^[01]+$/.test(input)) {
            // Input is invalid, ignore it
            return;
        }
        // Convert the input string to a 2D array
        const newMatrix = [];
        for (let i = 0; i < gridSize; i++) {
            const row = [];
            for (let j = 0; j < gridSize; j++) {
                row.push(input[i * gridSize + j] === '1');
            }
            newMatrix.push(row);
        }
        setBoolMatrix(newMatrix);
    };

    const redraw = useCallback(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const cellSize = 20; // Можно менять для изменения размера сетки

        // Clear the previous grid
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Рисуем сетку
        for (let x = 0; x <= gridSize; x++) {
            for (let y = 0; y <= gridSize; y++) {
                context.beginPath();
                context.rect(x * cellSize, y * cellSize, cellSize, cellSize);
                context.lineWidth = 1;
                context.strokeStyle = '#ddd'; // Цвет сетки
                context.stroke();

                // Закрашиваем ячейку, если в булевой матрице стоит true
                if (boolMatrix && boolMatrix[y] && boolMatrix[y][x]) {
                    context.fillStyle = "#FF0000"; // Цвет заливки
                    context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                }
            }
        }
    }, [boolMatrix, gridSize]);

    useEffect(() => {
        redraw();
    }, [boolMatrix, redraw]);

    return (
        <VStack spacing={5}>
            <Box boxSize={`${gridSize * 20}px`}>
                <canvas ref={canvasRef} width={gridSize * 20} height={gridSize * 20} />
            </Box>
            <Input type="text" onChange={handleInputChange} />
            <Button colorScheme="blue" onClick={() => {
                setGridSize(16);
            }}>Redraw</Button>
        </VStack>
    );
}

export default ChartPage;
