import React, { useEffect } from 'react';
import Button from './Button'; // Added import

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900 bg-opacity-75 transition-opacity" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className={`relative transform overflow-hidden rounded-lg bg-slate-800 text-slate-100 shadow-xl transition-all sm:my-8 sm:w-full ${sizeClasses[size]}`}>
          <div className="bg-slate-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-lg font-semibold leading-6 text-sky-400" id="modal-title">{title}</h3>
                <div className="mt-4">
                  {children}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <Button onClick={onClose} variant="secondary" size="sm">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;