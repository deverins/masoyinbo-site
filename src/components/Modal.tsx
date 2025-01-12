"use client"

import React, { useState, useEffect, useRef, useId } from 'react';

type ModalProps = {
  trigger: boolean,
  side?: 'center' | 'full' | 'bottom' | 'top' | 'right' | 'left',
  escape?: boolean,
  maxW?: string,
  gum?: boolean,
  backgroundColorClass?: string,
  closeIcon?: boolean,
  id?: string,
  close: ()=>void
  children: React.ReactNode,
}
 
const Modal = ({
  trigger,
  side = 'center',
  escape = true,
  maxW = '300px',
  gum = false,
  backgroundColorClass = 'bg-white',
  closeIcon = true,
  close,
  id,
  children,
}: ModalProps) => {

  const uniqueId = useId();
  const modalId = id ||` modal-panel-${uniqueId}`;
  const [key, setKey] = useState(false);
  const [closing, setClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const closeWithIcon=()=>{
    close();
    setKey(false)
  }

  useEffect(() => {    
    
    if (trigger) {
      setClosing(false);
      setKey(true);
      document.body.style.overflow = 'hidden';
    } else {
      setClosing(true);
      setTimeout(() => {
        setKey(false);
        document.body.style.overflow = 'auto';
      }, 300);
    }
  }, [trigger]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!gum && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        close()
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (!gum && escape && event.key === 'Escape') {
        close()
      }
    };

    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [escape, gum, close]);

  if (!key) return null;

  const getContent = () => {    
    const style = { maxWidth: ['left', 'right'].includes(side) ? maxW : '100%' };
    return (
      <div
        ref={modalRef}
        style={style}
        className={`${closing ? `${side}-leave` : side} ${backgroundColorClass}`}
      >
        {renderContent()}
      </div>
    );
  };

  const renderContent = () => (
    <>
      {closeIcon && (
        <span
          onClick={closeWithIcon}
          className={`
            inline-block rounded-full absolute bg-white border-1.5
            border-black border-opacity-60 cursor-pointer
            ${getCloseIconPositionClass()} p-1 border border-opacity-40
          `}
        >
           <svg width="15" height="15">
            <line x1="0" y1="0" x2="15" y2="15" stroke="black" strokeWidth="2" />
            <line x1="15" y1="0" x2="0" y2="15" stroke="black" strokeWidth="2" />
          </svg>
        </span>
      )}
      <div
        className={`relative scroller 
          ${['left', 'right', 'full'].includes(side)? 
            ("max-h-[calc(100vh-10px)]"):
            (side === 'center' ? 'max-h-88vh' : 'max-h-85vh')}
        `}
      >
        {children}
      </div>
    </>
  );

  const getCloseIconPositionClass = () => {
    switch (side) {
      case 'center':
        return '-top-3 right-3';
      case 'full':
        return 'top-0 right-0';
      case 'bottom':
        return '-top-5 right-14 -rotate-90';
      case 'top':
        return '-bottom-5 right-14 rotate-90';
      case 'right':
        return 'top-10 -left-2 rotate-180';
      case 'left':
        return 'top-10 -right-2';
      default:
        return '';
    }
  };

  return (
    <div
      role="modal"
      id={modalId}
      aria-hidden="true"
      className={`
        fixed inset-0 z-30 bg-black bg-opacity-30 flex items-center justify-center
        ${key ? '' : 'hidden'}
      `}
    >
      {getContent()}
    </div>
  );
};

export default Modal;