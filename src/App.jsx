import React from 'react';
import { ShieldPlus } from 'lucide-react';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Institucional IMSS */}
      <header style={{ 
        backgroundColor: 'var(--imss-green)', 
        color: 'white', 
        padding: '1rem 0',
        boxShadow: 'var(--shadow-md)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* Logo IMSS (Using the uploaded inverted image, matching the background color) */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '60px', 
            flexShrink: 0
          }}>
            <img 
              src="/IMSS-Logo_inverso.jpg" 
              alt="Logo IMSS" 
              style={{ height: '100%', objectFit: 'contain' }} 
            />
          </div>
          <div>
            <h1 style={{ color: 'white', margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
              Instituto Mexicano del Seguro Social
            </h1>
            <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.9 }}>
              Sistema de Recolección de Datos de Guarderías
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ 
        flex: 1, 
        padding: '2rem 1.5rem',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{ 
          backgroundColor: 'var(--card-bg)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-imss)',
          padding: '2rem',
          borderTop: '6px solid var(--imss-gold)'
        }}>
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
              Registro de Personal
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Por favor, llene el siguiente formulario con la información requerida. Los campos marcados son obligatorios.
            </p>
          </div>
          
          <RegistrationForm />
        </div>
      </main>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#1e293b', 
        color: '#94a3b8', 
        padding: '2rem 1.5rem',
        textAlign: 'center',
        marginTop: 'auto'
      }}>
        <p style={{ fontSize: '0.875rem', maxWidth: '800px', margin: '0 auto' }}>
          La información recopilada será tratada de forma confidencial y utilizada exclusivamente para fines de la Aplicación de Guarderías IMSS.
        </p>
      </footer>
    </div>
  );
}

export default App;
