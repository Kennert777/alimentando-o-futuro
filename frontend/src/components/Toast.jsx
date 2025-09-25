import { useState, useEffect } from 'react';

export default function Toast({ message, type = 'success', show, onClose, duration = 5000 }) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [show, onClose, duration]);

    if (!show) return null;

    const getToastClass = () => {
        switch (type) {
            case 'success': return 'bg-success text-white';
            case 'error': return 'bg-danger text-white';
            case 'warning': return 'bg-warning text-dark';
            case 'info': return 'bg-info text-white';
            default: return 'bg-success text-white';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
            default: return '✅';
        }
    };

    return (
        <div 
            className="position-fixed top-0 end-0 p-3" 
            style={{ zIndex: 1050, marginTop: '80px' }}
        >
            <div className={`toast show ${getToastClass()}`} role="alert">
                <div className="toast-header">
                    <span className="me-2">{getIcon()}</span>
                    <strong className="me-auto">Alimentando o Futuro</strong>
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={onClose}
                        aria-label="Close"
                    ></button>
                </div>
                <div className="toast-body">
                    {message}
                </div>
            </div>
        </div>
    );
}