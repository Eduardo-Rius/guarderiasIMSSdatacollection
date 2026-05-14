import React, { useState } from 'react';
import { Building2, User, MapPin, Clock, Briefcase, Phone, Mail, CheckCircle, ShieldCheck } from 'lucide-react';

const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    cargo: '',
    correo: '',
    telefono: '',
    numeroGuarderia: '',
    nombreGuarderia: '',
    tipoGuarderia: '',
    estado: '',
    localidad: '',
    municipio: '',
    calle: '',
    colonia: '',
    numeroExterior: '',
    codigoPostal: '',
    horarioAtencion: '',
    zonaSupervision: '',
    guarderiasSupervisadas: '',
    telefonoSupervisor: '',
    otroCargo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const url = 'https://script.google.com/macros/s/AKfycbzn2SGkhk9nM08ZWVFlDqhkJsFwWLgn0OlRbzrydA2ZxyI4zH7gyvjhKnKbgEF0IudOUw/exec';
      
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors', // Fundamental para evitar errores de CORS con Google Apps Script
        headers: {
          'Content-Type': 'text/plain', // También ayuda a evitar el pre-flight de CORS
        },
        body: JSON.stringify(formData)
      });
      
      // Como usamos no-cors, la respuesta es opaca, pero si no lanza error de red asumimos éxito
      setIsSuccess(true);
      
      // Opcional: Resetear el formulario para el siguiente registro
      setFormData({
        nombre: '', apellidos: '', cargo: '', correo: '', telefono: '', numeroGuarderia: '',
        nombreGuarderia: '', tipoGuarderia: '', estado: '', localidad: '', municipio: '',
        calle: '', colonia: '', numeroExterior: '', codigoPostal: '', horarioAtencion: '',
        zonaSupervision: '', guarderiasSupervisadas: '', telefonoSupervisor: '', otroCargo: ''
      });

    } catch (error) {
      console.error('Error enviando formulario:', error);
      alert('Hubo un error de conexión al enviar los datos. Verifique su internet e intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <CheckCircle size={64} color="var(--imss-green)" style={{ margin: '0 auto 1.5rem' }} />
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--imss-green-dark)' }}>¡Registro Exitoso!</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
          Los datos han sido guardados correctamente en el sistema. Gracias por su participación en este proyecto de mejora.
        </p>
        <button className="btn btn-primary" onClick={() => setIsSuccess(false)}>
          Registrar otra respuesta
        </button>
      </div>
    );
  }

  const isSupervisor = formData.cargo === 'Supervisor Regional' || formData.cargo === 'Supervisor';

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      {/* Sección: Datos Personales */}
      <h3 className="section-title">
        <User size={24} />
        Datos Personales
      </h3>
      
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="nombre">Nombre(s)</label>
          <input required type="text" id="nombre" name="nombre" className="form-input" value={formData.nombre} onChange={handleChange} placeholder="Ej. María" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="apellidos">Apellidos</label>
          <input required type="text" id="apellidos" name="apellidos" className="form-input" value={formData.apellidos} onChange={handleChange} placeholder="Ej. González Pérez" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="cargo">Cargo</label>
          <select required id="cargo" name="cargo" className="form-select" value={formData.cargo} onChange={handleChange}>
            <option value="">Seleccione un cargo...</option>
            <option value="Directora">Directora</option>
            <option value="Pedagoga">Pedagoga</option>
            <option value="Supervisor Regional">Supervisor Regional</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        {formData.cargo === 'Otro' && (
          <div className="form-group animate-fade-in">
            <label className="form-label" htmlFor="otroCargo">Especifique su cargo</label>
            <div style={{ position: 'relative' }}>
              <Briefcase size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input required type="text" id="otroCargo" name="otroCargo" className="form-input" style={{ paddingLeft: '2.5rem' }} value={formData.otroCargo || ''} onChange={handleChange} placeholder="Ej. Administradora" />
            </div>
          </div>
        )}
        <div className="form-group">
          <label className="form-label" htmlFor="correo">Correo electrónico institucional o personal</label>
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input required type="email" id="correo" name="correo" className="form-input" style={{ paddingLeft: '2.5rem' }} value={formData.correo} onChange={handleChange} placeholder="ejemplo@imss.gob.mx" />
          </div>
        </div>
      </div>

      {/* Conditional Section: Supervisor */}
      {isSupervisor && (
        <div className="animate-fade-in" style={{ backgroundColor: '#f0fdf4', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '1px solid #bbf7d0' }}>
          <h3 className="section-title" style={{ borderBottomColor: '#bbf7d0', color: 'var(--imss-green)' }}>
            <ShieldCheck size={24} />
            Datos de Supervisión
          </h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="zonaSupervision">Zona que supervisa</label>
              <input required={isSupervisor} type="text" id="zonaSupervision" name="zonaSupervision" className="form-input" value={formData.zonaSupervision} onChange={handleChange} placeholder="Ej. Zona Norte 1" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="telefonoSupervisor">Teléfono de contacto (Supervisor)</label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input required={isSupervisor} type="tel" id="telefonoSupervisor" name="telefonoSupervisor" className="form-input" style={{ paddingLeft: '2.5rem' }} value={formData.telefonoSupervisor || ''} onChange={handleChange} placeholder="(00) 0000 0000" />
              </div>
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label" htmlFor="guarderiasSupervisadas">Guarderías que supervisa</label>
              <textarea required={isSupervisor} id="guarderiasSupervisadas" name="guarderiasSupervisadas" className="form-textarea" rows="3" value={formData.guarderiasSupervisadas} onChange={handleChange} placeholder="Ej. U-001, U-045, U-102..."></textarea>
            </div>
          </div>
        </div>
      )}

      {/* Secciones mostradas solo si NO es supervisor */}
      {!isSupervisor && (
        <>
          {/* Sección: Datos de la Guardería */}
          <h3 className="section-title" style={{ marginTop: '1rem' }}>
            <Building2 size={24} />
            Datos de la Guardería
          </h3>
      
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="numeroGuarderia">Número de Guardería</label>
          <input required type="text" id="numeroGuarderia" name="numeroGuarderia" className="form-input" value={formData.numeroGuarderia} onChange={handleChange} placeholder="Ej. U-001" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="nombreGuarderia">Nombre de la Guardería</label>
          <input required type="text" id="nombreGuarderia" name="nombreGuarderia" className="form-input" value={formData.nombreGuarderia} onChange={handleChange} placeholder="Nombre oficial" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="tipoGuarderia">Tipo (Directa o Indirecta)</label>
          <select required id="tipoGuarderia" name="tipoGuarderia" className="form-select" value={formData.tipoGuarderia} onChange={handleChange}>
            <option value="">Seleccione el tipo...</option>
            <option value="Directa">Ordinaria (Directa)</option>
            <option value="Indirecta">Esquema Vecinal / Integrador (Indirecta)</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="telefono">Teléfono de contacto de la guardería</label>
          <div style={{ position: 'relative' }}>
            <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input required type="tel" id="telefono" name="telefono" className="form-input" style={{ paddingLeft: '2.5rem' }} value={formData.telefono} onChange={handleChange} placeholder="(00) 0000 0000" />
          </div>
        </div>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label" htmlFor="horarioAtencion">Horario de atención</label>
          <div style={{ position: 'relative' }}>
            <Clock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input required type="text" id="horarioAtencion" name="horarioAtencion" className="form-input" style={{ paddingLeft: '2.5rem' }} value={formData.horarioAtencion} onChange={handleChange} placeholder="Ej. Lunes a Viernes de 07:00 a 17:00 hrs." />
          </div>
        </div>
      </div>

      {/* Sección: Ubicación */}
      <h3 className="section-title" style={{ marginTop: '1rem' }}>
        <MapPin size={24} />
        Ubicación
      </h3>
      
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="estado">Estado</label>
          <input required type="text" id="estado" name="estado" className="form-input" value={formData.estado} onChange={handleChange} placeholder="Ej. Jalisco" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="municipio">Municipio / Alcaldía</label>
          <input required type="text" id="municipio" name="municipio" className="form-input" value={formData.municipio} onChange={handleChange} placeholder="Ej. Guadalajara" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="localidad">Localidad</label>
          <input required type="text" id="localidad" name="localidad" className="form-input" value={formData.localidad} onChange={handleChange} placeholder="Ej. Guadalajara Centro" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="codigoPostal">Código Postal</label>
          <input required type="text" id="codigoPostal" name="codigoPostal" className="form-input" value={formData.codigoPostal} onChange={handleChange} placeholder="Ej. 44100" />
        </div>
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label" htmlFor="colonia">Colonia</label>
          <input required type="text" id="colonia" name="colonia" className="form-input" value={formData.colonia} onChange={handleChange} placeholder="Ej. Centro" />
        </div>
        <div className="form-group" style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '1rem' }}>
          <div>
            <label className="form-label" htmlFor="calle">Calle</label>
            <input required type="text" id="calle" name="calle" className="form-input" value={formData.calle} onChange={handleChange} placeholder="Nombre de la calle o avenida" />
          </div>
          <div>
            <label className="form-label" htmlFor="numeroExterior">No. Exterior</label>
            <input required type="text" id="numeroExterior" name="numeroExterior" className="form-input" value={formData.numeroExterior} onChange={handleChange} placeholder="Ej. 123" />
          </div>
        </div>
      </div>
    </>
  )}

      <div style={{ marginTop: '2.5rem', textAlign: 'right' }}>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}>
          {isSubmitting ? 'Guardando datos...' : 'Enviar Registro'}
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
