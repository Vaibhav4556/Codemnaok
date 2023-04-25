import React, { useEffect, useRef } from 'react';

function MouseHover() {
  const canvasRef = useRef(null);
  let mouseX = 0;
  let mouseY = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleMouseMove = (event) => {
      mouseX = event.clientX - canvas.offsetLeft;
      mouseY = event.clientY - canvas.offsetTop;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    function drawCircle() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 30, 0, 2 * Math.PI);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.stroke();
      requestAnimationFrame(drawCircle);
    }

    requestAnimationFrame(drawCircle);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
}

export default MouseHover;
