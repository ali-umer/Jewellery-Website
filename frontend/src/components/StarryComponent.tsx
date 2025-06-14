"use client";
import { useEffect } from "react";

export default function StarryBackground() {
  useEffect(() => {
    const canvas = document.getElementById("stars") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function animate() {
      draw();
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return <canvas id="stars" className="fixed inset-0 z-[-1]" />;
}