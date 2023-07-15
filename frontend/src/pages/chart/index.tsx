import React, { useRef, useEffect, useState, useCallback } from 'react';

function ChartPage() {
    const canvasRef = useRef(null);
    const [renderCount, setRenderCount] = useState(0);
    const [boolMatrix, setBoolMatrix] = useState(() => {
        return new Array(8).fill(null).map(() => new Array(8).fill(false));
    });

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
        <div>
            <canvas ref={canvasRef} width={160} height={160} />
            <button onClick={() => {
                setRenderCount(prevCount => prevCount + 1);
                // Здесь вы можете обновить булеву матрицу по своему усмотрению
                // Для примера, я просто переключаю значения в матрице
                setBoolMatrix(boolMatrix.map(row => row.map(cell => !cell)));
            }}>Redraw</button>
        </div>
    );
}

export default ChartPage;
