import React, { useRef, useEffect, useState } from 'react';

function ChartPage() {
    const canvasRef = useRef(null);
    const [renderCount, setRenderCount] = useState(0);

    const redraw = () => {
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
            }
        }

        // Закрашиваем случайные ячейки
        for(let i = 0; i < 10; i++) { // Закрашиваем 10 случайных ячеек, измените это значение, если хотите больше или меньше
            const x = Math.floor(Math.random() * grid);
            const y = Math.floor(Math.random() * grid);
            context.fillStyle = "#FF0000"; // Цвет заливки
            context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }

    useEffect(redraw, [renderCount]);

    return (
        <div>
            <canvas ref={canvasRef} width={160} height={160} />
            <button onClick={() => setRenderCount(prevCount => prevCount + 1)}>Redraw</button>
        </div>
    );
}

export default ChartPage;
