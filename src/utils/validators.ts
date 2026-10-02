// src/utils/validators.ts

export function validateLoginInput(
  email: string,
  password: string
): string[] {
  const errors: string[] = [];

  // Validacion de email
  if (!email.trim()) {
    errors.push("El email es requerido");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("El email no tiene un formato válido");
  }

  // Validacion de password
  if (!password) {
    errors.push("La contraseña es requerida");
  } else if (password.length < 8) {
    errors.push("La contraseña debe tener al menos 8 caracteres");
  }

  return errors;
}