import { useState, useEffect } from "react";
import { Container, Alert, Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { poolData } from "../cognito";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userPool = new CognitoUserPool(poolData);

  const fetchUser = () => {
    const currentUser = userPool.getCurrentUser();

    if (currentUser) {
      currentUser.getSession((err, session) => {
        if (err || !session.isValid()) {
          setUser(null);
        } else {
          currentUser.getUserAttributes((err, attributes) => {
            if (err) {
              console.error("Error al obtener atributos del usuario:", err);
            } else {
              const userData = attributes.reduce((acc, attribute) => {
                acc[attribute.Name] = attribute.Value;
                return acc;
              }, {});
              setUser(userData);
            }
          });
        }
      });
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
      setUser(null);
      navigate("/");
    }
  };

  const goToLogin = () => {
    navigate("/Login");
  };

  const goToRegister = () => {
    navigate("/Register");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Container className="py-5">
        <Card className="shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
          <Card.Header className="bg-primary text-white text-center py-3">
            <h2>Estado de Sesión</h2>
          </Card.Header>
          <Card.Body className="px-4 py-5">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-2">Verificando estado de sesión...</p>
              </div>
            ) : (
              <>
                {user ? (
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="d-inline-block bg-success rounded-circle p-3 mb-3">
                        <i className="bi bi-check-lg text-white fs-4"></i>
                      </div>
                      <h3 className="mb-2">Sesión Activa</h3>
                      <Alert variant="success" className="mb-4">
                        <div className="mb-2"><strong>Usuario:</strong> {user.name || "No disponible"}</div>
                        <div><strong>Email:</strong> {user.email || "No disponible"}</div>
                      </Alert>
                      <Button 
                        variant="outline-danger" 
                        onClick={handleLogout}
                        className="px-4"
                      >
                        Cerrar Sesión
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="d-inline-block bg-warning rounded-circle p-3 mb-3">
                        <i className="bi bi-exclamation-triangle text-white fs-4"></i>
                      </div>
                      <h3 className="mb-2">No has iniciado sesión</h3>
                      <Alert variant="warning" className="mb-4">
                        Debes iniciar sesión para acceder a todas las funcionalidades.
                      </Alert>
                      <div className="d-grid gap-2">
                        <Button 
                          variant="primary" 
                          onClick={goToLogin}
                          className="mb-2"
                        >
                          Iniciar Sesión
                        </Button>
                        <Button 
                          variant="outline-secondary" 
                          onClick={goToRegister}
                        >
                          Registrarse
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Dashboard;
