"use client"

import React, { useState, useEffect, useRef, KeyboardEvent, ReactNode, useCallback } from 'react';

interface DialogboxProps {
  triggerDomId: string;
  closeOnClick?: boolean;
  positions?: {
    maxHeight?: number
    ySide?: "auto" | "top" | "bottom"
  }
  className?: string
  children: ReactNode
}


const Dialogbox: React.FC<DialogboxProps> = ({ triggerDomId, positions, closeOnClick, className, children }) => {

  const [isVisible, setIsVisible] = useState(false);
  const [placeTop, setPlaceTop] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const close = () => {
    if (!closeOnClick) return;
    setIsVisible(false)
  }

  const handleClickOutside = (event: Event) => {
    if (
      !dialogRef?.current?.contains(event.target as Node) &&
      !triggerRef.current?.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  const handleKeyDown = (event: Event) => {
    const _event = event as unknown as KeyboardEvent
    if (_event.key === 'Escape') {
      setIsVisible(false);
    }
  };

  const adjustPosition = useCallback(() => {
    const triggerElement = triggerRef.current;
    if (!triggerElement) return;

    const averageViewportHeight = window.innerHeight / 2;

    if (positions?.ySide == "bottom") {
      setPlaceTop(false);
    } else if (positions?.ySide == "top") {
      setPlaceTop(true);
    } else {
      const { top } = triggerElement.getBoundingClientRect();
      if (top < averageViewportHeight) {
        setPlaceTop(false);
      } else {
        setPlaceTop(true);
      }
    }
  }, [positions]);

  useEffect(() => {
    const triggerElement = document.getElementById(triggerDomId);
    triggerRef.current = triggerElement;

    const closer = (event: MouseEvent) => {
      if (event.target !== dialogRef.current &&
        !dialogRef.current?.contains(event.target as Node)
      ) {
        setIsVisible(state => !state);
      }
    };

    if (triggerElement) {
      triggerElement.addEventListener('click', closer);
    }

    return () => {
      if (triggerElement) {
        triggerElement.removeEventListener('click', closer);
      }
    };
  }, [triggerDomId]);


  useEffect(() => {
    if (isVisible) {
      adjustPosition();
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      dialogRef.current?.focus();
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, adjustPosition]);

  return (
    <div
      role="dialog"
      aria-hidden={!isVisible}
      className={`dialogbox p-2 shadow-calc-card bg-white rounded-lg z-50
         ${isVisible ? 'dialogbox-show' : 'dialogbox-hidden'} 
          ${className ?? ``}
          ${positions?.maxHeight ?` max-h-[${positions?.maxHeight}px]}` : ''}
          ${placeTop ?` bottom-[calc(100%+4px)]` : `top-[calc(100%+4px)]`}
        `}
      ref={dialogRef}
      tabIndex={-1}
    >
      <div onClick={close}>
        {children}
      </div>
    </div>
  );
};

export default Dialogbox;