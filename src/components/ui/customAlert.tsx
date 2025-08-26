import { useState, useEffect } from 'react';

// Interface para o alerta
interface AlertProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

// Componente do Alert
const CustomAlert = ({ message, type = 'info', duration = 3000, onClose }: AlertProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  return (
    <div 
      className={`custom-alert ${type} ${isVisible ? 'show' : ''}`}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        minWidth: '300px',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        transform: 'translateX(100%)',
        opacity: 0,
        transition: 'all 0.3s ease-in-out',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
        ...(type === 'success' && {
          background: 'linear-gradient(135deg, #4CAF50, #45a049)',
          color: 'white',
          borderLeft: '4px solid #2E7D32'
        }),
        ...(type === 'error' && {
          background: 'linear-gradient(135deg, #f44336, #d32f2f)',
          color: 'white',
          borderLeft: '4px solid #c62828'
        }),
        ...(type === 'warning' && {
          background: 'linear-gradient(135deg, #ff9800, #f57c00)',
          color: 'white',
          borderLeft: '4px solid #ef6c00'
        }),
        ...(type === 'info' && {
          background: 'linear-gradient(135deg, #2196F3, #1976D2)',
          color: 'white',
          borderLeft: '4px solid #1565C0'
        })
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span style={{ flex: 1, marginRight: '12px', fontSize: '14px', fontWeight: 500, lineHeight: '1.4' }}>
          {message}
        </span>
        <button 
          onClick={handleClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            padding: 0,
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'background-color 0.2s',
            color: 'inherit'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          &times;
        </button>
      </div>

      <style>
        {`
          .custom-alert.show {
            transform: translateX(0) !important;
            opacity: 1 !important;
          }
        `}
      </style>
    </div>
  );
};

// Hook useAlert simplificado
export const useAlert = () => {
  const [alerts, setAlerts] = useState<{id: number; message: string; type: 'success' | 'error' | 'warning' | 'info'}[]>([]);

  const showAlert = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, message, type }]);
  };

  const removeAlert = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const AlertContainer = () => (
    <>
      {alerts.map(alert => (
        <CustomAlert
          key={alert.id}
          message={alert.message}
          type={alert.type}
          onClose={() => removeAlert(alert.id)}
        />
      ))}
    </>
  );

  return { showAlert, AlertContainer };
};

export default CustomAlert;