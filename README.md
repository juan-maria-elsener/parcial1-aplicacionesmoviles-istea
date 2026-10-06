# NoMeOlvido 📝 - App de Lista de Compras

**NoMeOlvido** es una aplicación móvil desarrollada en React Native y Expo para gestionar listas de compras de manera inteligente.

## 📹 Demostración en Video

En el siguiente enlace se puede ver el funcionamiento completo de la aplicación, demostrando todos los puntos requeridos en la rúbrica del parcial (validaciones, persistencia, evento diferido y tests unitarios):

👉 **[Ver Video de Demostración](https://youtu.be/6eMUpVnw2f8)**

## 🚀 Características Principales (Requisitos Cumplidos)

1. **Autenticación y Validaciones:** Sistema de Login y Registro de usuarios con validación estricta de campos (formato de email válido, contraseñas seguras de más de 8 caracteres, validación de campos vacíos).
2. **Navegación Fluida:** Implementación de `React Navigation` (Native Stack) para transiciones fluidas entre las pantallas de Autenticación, Inicio (Home) y Alta de Productos.
3. **Gestión de Lista (CRUD) y Persistencia:** Capacidad para agregar y eliminar productos de la lista. Los datos se guardan localmente en el dispositivo utilizando `AsyncStorage`, asegurando que la lista no se pierda al cerrar y volver a abrir la aplicación.
4. **Eventos Asincrónicos Diferidos (Notificaciones):** Al agregar un nuevo producto, el sistema programa una alerta asincrónica diferida que notifica al usuario el éxito de la operación exactamente 5 segundos después de haber guardado el ítem.
5. **Testing Unitario:** Suite de pruebas implementada con `Jest` y `@testing-library/react-native`. Cuenta con pruebas pasando exitosamente (en verde) que cubren tanto la lógica de negocio (validadores) como el renderizado asíncrono y la interacción de los componentes de la interfaz gráfica (`CustomButton`).
6. **Diseño UI/UX:** Interfaz moderna, minimalista y responsiva, diseñada 100% a medida mediante `StyleSheet` sin depender de librerías de componentes externas. Incluye diseño en formato tarjeta, uso coherente de colores primarios y adaptación automática del teclado (`KeyboardAvoidingView`).

## 🛠️ Tecnologías Utilizadas

- **Framework:** React Native (0.81) / Expo (SDK 57)
- **Lenguaje:** TypeScript
- **Navegación:** React Navigation
- **Almacenamiento Local:** AsyncStorage
- **Testing:** Jest & React Native Testing Library

## 📱 Instalación y Ejecución Local

Para levantar este proyecto en tu entorno local, sigue estos pasos:

### Prerrequisitos
- Tener [Node.js](https://nodejs.org/) instalado.
- Tener la aplicación **Expo Go** instalada en tu dispositivo físico (iOS/Android) o contar con un emulador configurado en tu PC.

### Pasos

1. Clonar el repositorio:
```bash
git clone [https://github.com/juan-maria-elsener/parcial1-aplicacionesmoviles-istea.git](https://github.com/juan-maria-elsener/parcial1-aplicacionesmoviles-istea.git)
```

2. Ingresar a la carpeta del proyecto:
```bash
cd parcial1-aplicacionesmoviles-istea
```

3. Instalar las dependencias necesarias:
```bash
npm install
```

4. Ejecutar el servidor de desarrollo:
```bash
npx expo start -c
```
*(Nota: Se utiliza la flag -c para limpiar la caché de Metro Bundler y asegurar un arranque limpio, evitando falsos positivos de dependencias).*

5. Abrir la app:
- Escanea el código QR que aparece en la terminal usando la app de Expo Go (en Android) o la cámara en iOS.

## 🧪 Ejecución de Tests

El proyecto cuenta con una suite de pruebas unitarias que validan el correcto funcionamiento de las reglas de negocio y los componentes visuales. Para ejecutar los tests y verificar que todos pasen correctamente, corre el siguiente comando en la terminal:

```bash
npm test
```
**Resultados de los Tests:**

![Captura de Tests Unitarios](<img width="1694" height="811" alt="image" src="https://github.com/user-attachments/assets/e187bc2f-30dd-49ec-b5e3-a4afdd094a2c" />
<img width="1498" height="308" alt="image" src="https://github.com/user-attachments/assets/21d993c9-fd40-4e75-95f0-168cc23481e5" />

)

---
*Desarrollado por Juan María Elsener - ISTEA*
