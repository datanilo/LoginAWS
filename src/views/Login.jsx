import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { userPool } from '../cognito';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import '../styles/Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        setSuccess('¡Inicio de sesión exitoso!');
        console.log('Access Token:', result.getAccessToken().getJwtToken());
        navigate('/Dashboard');
      },
      onFailure: (err) => {
        setError('Error al iniciar sesión: ' + err.message || JSON.stringify(err));
      },
    });
  };

  return (
    <Container className="container d-flex justify-content-center align-items-center min-vh-100">
      <Row className="justify-content-center col-11 col-md-7 col-lg-5 col-xl-4">
        <Col md={4} className="w-100">
        <h3 className="text-center mb-5 fw-bold">Inicia sesión</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formLoginEmail" className="mb-4">
              <Form.Control
                type="email"
                className="custom-input"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLoginPassword" className="mb-4">
              <div className="input-group">
                <Form.Control
                  type="password"
                  className="custom-input"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="input-group-text"></span>
              </div>
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Button type="submit" className="w-100 mb-3">
              Ingresar
            </Button>
          </Form>

          <div className="text-center mt-4">
            <Link to="#" className="d-block text-decoration-none">
              ¿Has olvidado tu contraseña?
            </Link>
            <span className="d-block mt-5 fw-bold">¿Nuevo?</span>
            <Link to="/Register" className="d-block mt-3 text-decoration-none fw-bold">
              ¡Regístrate!
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
