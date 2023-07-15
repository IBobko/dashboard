import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Box, Input, Button, VStack } from "@chakra-ui/react";

function ChartPage() {
    const canvasRef = useRef(null);
    const [renderCount, setRenderCount] = useState(0);
    const [boolMatrix, setBoolMatrix] = useState(() => {
        return new Array(8).fill(null).map(() => new Array(8).fill(false));
    });

    const handleInputChange = (event) => {
        const input = event.target.value;

        if (input.length !== 64 || !/^[01]+$/.test(input)) {
            // Input is invalid, ignore it
            return;
        }
        // Convert the input string to a 2D array
        const newMatrix = [];
        for (let i = 0; i < 8; i++) {
            const row = [];
            for (let j = 0; j < 8; j++) {
                row.push(input[i * 8 + j] === '1');
            }
            newMatrix.push(row);
        }
        setBoolMatrix(newMatrix);
    };

    const redraw = useCallback(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const grid = 8;
        const cellSize = 20; // Можно менять для изменения размера сетки

        // Clear the previous grid
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Рисуем сетку
        for (let x = 0; x <= grid; x++) {
            for (let y = 0; y <= grid; y++) {
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
    }, [boolMatrix]);

    useEffect(() => {
        redraw();
    }, [renderCount, redraw]);

    return (
        <VStack spacing={5}>
            <Box boxSize="160px">
                <canvas ref={canvasRef} width={160} height={160} />
            </Box>
            <Input type="text" onChange={handleInputChange} />
            <Button colorScheme="blue" onClick={() => {
                setRenderCount(prevCount => prevCount + 1);
                // Здесь вы можете обновить булеву матрицу по своему усмотрению
                // Для примера, я просто переключаю значения в матрице
                setBoolMatrix(boolMatrix.map(row => row.map(cell => !cell)));
            }}>Redraw</Button>
        </VStack>
    );
}

export default ChartPage;
