import React, { useEffect, useRef } from 'react';

function FourQuadrant() {
  const canvasRef = useRef(null);
  let mouseX = 0;
  let mouseY = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const halfWidth = canvas.width / 2;
    const halfHeight = canvas.height / 2;

    const handleMouseMove = (event) => {
      mouseX = event.clientX - canvas.offsetLeft;
      mouseY = event.clientY - canvas.offsetTop;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    function drawCircle() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw circle on the top-left quadrant
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 30, 0, 2 * Math.PI);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.closePath();

      // Mirror the circle on the top-right quadrant
      const mirrorX = halfWidth - (mouseX - halfWidth);
      ctx.beginPath();
      ctx.arc(mirrorX, mouseY, 30, 0, 2 * Math.PI);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.closePath();

      // Mirror the circle on the bottom-left quadrant
      const mirrorY = halfHeight - (mouseY - halfHeight);
      ctx.beginPath();
      ctx.arc(mouseX, mirrorY, 30, 0, 2 * Math.PI);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.closePath();

      // Mirror the circle on the bottom-right quadrant
      ctx.beginPath();
      ctx.arc(mirrorX, mirrorY, 30, 0, 2 * Math.PI);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.closePath();

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

export default FourQuadrant;
