# 🔐 Auth React + AWS

Aplicación de autenticación que implementa un sistema completo basado en JWT (JSON Web Tokens) integrado con React y AWS Cognito. Esta solución proporciona un flujo seguro de autenticación donde los tokens JWT gestionan la sesión del usuario, conteniendo información cifrada y firmada digitalmente que permite validar la identidad sin necesidad de consultas constantes a la base de datos.
## 🌟 Características

- 🎫 Autenticación mediante JWT (JSON Web Tokens)
- ✅ Registro de usuarios con validación de datos
- 📧 Verificación de cuenta mediante código enviado por correo electrónico
- 🔒 Inicio de sesión seguro con AWS Cognito
- 📱 Diseño completamente responsivo con Bootstrap

## 🛠️ Tecnologías utilizadas
- **React** - Biblioteca JavaScript para construir interfaces de usuario
- **Vite** - Herramienta de construcción ultrarrápida para aplicaciones web
- **React Router** - Navegación declarativa para aplicaciones React
- **AWS Cognito** - Servicio de autenticación seguro de Amazon Web Services
- **JWT** - JSON Web Tokens para transmisión segura de información entre partes
- **Bootstrap** - Framework CSS para el diseño responsivo
- **React Bootstrap** - Componentes Bootstrap optimizados para React
- **Amazon Cognito Identity JS** - SDK para interactuar con AWS Cognito

## 📦 Instalación

```bash
# Usando npm
npm install

# Usando yarn
yarn install

# Usando pnpm
pnpm install
```

## ⚙️ Configuración del proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/datanilo/LoginAWS
cd "Login React + AWS"
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
VITE_COGNITO_USER_POOL_ID=tu-user-pool-id
VITE_COGNITO_CLIENT_ID=tu-client-id
```

Reemplaza `tu-user-pool-id` y `tu-client-id` con los valores de tu User Pool de AWS Cognito.

## 🚀 Ejecución en local

```bash
# Iniciar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar versión de producción
npm run preview
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite seleccione).

## 📁 Estructura del proyecto
```
Auth-React-AWS/
├── public/                      
├── src/                         
│   ├── assets/                  
│   │   └── success-icon.svg            # Icono de éxito para el modal de confirmación
│   ├── components/              
│   │   └── ModalConfirmEmail.jsx       # Modal para verificar cuenta con código enviado al email
│   ├── styles/                  
│   │   └── Auth.css                    # Estilos para los componentes de autenticación
│   ├── views/                  
│   │   ├── Dashboard.jsx               # Panel principal para usuarios autenticados
│   │   ├── Login.jsx                   # Página de inicio de sesión con AWS Cognito y JWT
│   │   └── Register.jsx                # Página de registro de usuarios
│   ├── App.jsx                         # Componente principal y configuración de rutas
│   ├── cognito.js                      # Configuración de AWS Cognito y estructura del pool
│   └── main.jsx                
├── .env.example                        # Variables de entorno (UserPool ID y Client ID)
├── eslint.config.js            
├── index.html                  
├── package.json                
├── README.md                   
└── vite.config.js              
```

## 🔄 Flujo de la aplicación

1. **Registro de usuario**
   - El usuario completa el formulario de registro
   - La información se envía a AWS Cognito
   - Se crea una cuenta no confirmada

2. **Verificación de cuenta**
   - Se envía un código de verificación al correo del usuario
   - El usuario introduce el código en el modal de confirmación
   - La cuenta queda activada una vez verificada

3. **Inicio de sesión**
   - El usuario ingresa sus credenciales
   - AWS Cognito verifica las credenciales
   - Si son correctas, se genera un JWT (JSON Web Token) para autenticación
   - El token se almacena para mantener la sesión del usuario

4. **Dashboard**
   - Muestra información del usuario autenticado 
   - Utiliza el JWT para validar la sesión del usuario
   - Permite cerrar sesión (invalidando el token)
   - Redirecciona a login si no hay sesión activa


### Ventajas del uso de JWT

- **Stateless**: No requiere almacenar estado de sesión en el servidor
- **Seguridad**: Tokens firmados criptográficamente que no pueden ser alterados
- **Información encapsulada**: Contiene datos del usuario y permisos (payload)
- **Estructura estándar**: Header, Payload y Signature
- **Cross-domain**: Permite autenticación entre dominios diferentes
- **Escalabilidad**: Ideal para arquitecturas distribuidas y microservicios
- **Expiración configurable**: Control de la validez temporal del token

## 📝 Requisitos previos

- Node.js (versión 14 o superior)
- Una cuenta de AWS y un User Pool de Cognito configurado
- Configurar las variables de entorno correctamente

