import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import yourSvgIcon from '../assets/success-icon.svg';

const ConfirmEmailModal = ({ show, handleClose, email, confirmUser }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await confirmUser(verificationCode);
      setSuccess('¡Cuenta confirmada con éxito!');
      setError('');
      setConfirmed(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError('Código de verificación incorrecto. Intenta nuevamente.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Modal show={show} onHide={() => {}} centered fullscreen>
      <Modal.Header className='mx-auto col-12 col-md-7 col-lg-5 col-xl-4 mt-5'>
        <img src={yourSvgIcon} alt="icon" style={{ width: '40px', marginRight: '10px' }} />
        <Modal.Title>Confirmación de cuenta</Modal.Title>
      </Modal.Header>
      <Modal.Body className='mx-auto col-12 col-md-7 col-lg-5 col-xl-4'>
        <Form>
          <Form.Group controlId="verificationCode">
            <Form.Label className='mb-4'>
              Hemos enviado un código a tu correo {email}. Para confirmar tu cuenta, ingresa tu código:
            </Form.Label>
            <Form.Control
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Código de verificación"
              required
            />
          </Form.Group>
          <Form.Group>
            {error && <Alert variant="danger" className='my-3'>{error}</Alert>}
            {success && <Alert variant="success" className='my-3'>{success}</Alert>}
            
            {!confirmed && (
              <Button 
                variant="primary" 
                onClick={handleConfirm} 
                className="mt-3 w-100" 
                disabled={loading}
              >
                {loading ? 'Verificando...' : 'Confirmar'}
              </Button>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmEmailModal;