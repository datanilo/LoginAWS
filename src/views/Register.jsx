import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CognitoUser, CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { poolData } from '../cognito';
import '../styles/Auth.css';
import ConfirmEmailModal from '../components/ModalConfirmEmail';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [user, setUser] = useState(null);

  const confirmUser = async (verificationCode) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: new CognitoUserPool(poolData),
    });

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const userPool = new CognitoUserPool(poolData);
    const attributes = [
      new CognitoUserAttribute({ Name: 'name', Value: name }),
    ];

    userPool.signUp(email, password, attributes, [], (err, data) => {
      if (err) {
        setError(err.message || JSON.stringify(err));
        setSuccess('');
      } else {
        setUser(data.user);
        setError('');
        setShowModal(true);
      }
    });
  };

  return (
    <Container className="container d-flex justify-content-center align-items-center min-vh-100">
      <Row className="justify-content-center col-11 col-md-7 col-lg-5 col-xl-4">
        <Col md={4} className="w-100">
        <h3 className="text-center mb-5 fw-bold">Crea tu cuenta</h3>

          <Form onSubmit={handleSubmit}>

            <Form.Group controlId="formRegisterName" className="mb-3">
              <Form.Control
                type="text"
                className="custom-input"
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRegisterEmail" className="mb-3">
              <Form.Control
                type="email"
                className="custom-input"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRegisterPassword" className="mb-3">
              <Form.Control
                type="password"
                className="custom-input"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRegisterConfirmPassword" className="mb-3">
              <Form.Control
                type="password"
                className="custom-input"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Button variant="primary" type="submit" className="w-100 mb-3 fw-bold">
              Crear cuenta
            </Button>
          </Form>
          <div className="text-center mt-4">
            <span className="d-block">¿Ya tienes cuenta?</span>
            <Link to="/Login" className="d-block mt-3 text-decoration-none fw-bold">¡Inicia Sesión!</Link>
          </div>
        </Col>
      </Row>

      <ConfirmEmailModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        email={email} 
        confirmUser={confirmUser} 
      />
    </Container>
  );
};

export default Register;