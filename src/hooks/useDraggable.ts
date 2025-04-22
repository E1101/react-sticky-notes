import { useState, useEffect, useCallback } from "react";

interface Position {
  x: number;
  y: number;
}

interface UseDraggableOptions {
  initialPosition: Position;
  onPositionChange?: (position: Position) => void;
}

export function useDraggable({
  initialPosition,
  onPositionChange,
}: UseDraggableOptions) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>(initialPosition);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [position]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const x = e.clientX - dragOffset.x;
      const y = e.clientY - dragOffset.y;
      // Prevent dragging outside the viewport
      const newPosition = {
        x: x < 0 ? 0 : x,
        y: y < 0 ? 0 : y,
      };

      setPosition(newPosition);
    },
    [isDragging, dragOffset]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);

    if (onPositionChange) {
      onPositionChange(position);
    }
  }, [isDragging, onPositionChange, position]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    position,
    isDragging,
    dragHandleProps: {
      onMouseDown: handleMouseDown,
    },
    style: {
      left: `${position.x}px`,
      top: `${position.y}px`,
    },
  };
}
