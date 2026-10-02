import { validateLoginInput } from "../validators";

describe("validateLoginInput", () => {
  // ── Validación exitosa ───────────────────────────────
  it("retorna array vacío cuando email y password son válidos", () => {
    const errors = validateLoginInput("juan@email.com", "MiClave123");
    expect(errors).toHaveLength(0);
    expect(errors).toEqual([]);
  });

  // ── Validaciones de email ────────────────────────────────
  it("retorna error si el email está vacío", () => {
    const errors = validateLoginInput("", "MiClave123");
    expect(errors).toContain("El email es requerido");
  });

  it("retorna error si el email no tiene @", () => {
    const errors = validateLoginInput("juanemail.com", "MiClave123");
    expect(errors).toContain("El email no tiene un formato válido");
  });

  // ── Validaciones de password ─────────────────────────────
  it("retorna error si la contraseña está vacía", () => {
    const errors = validateLoginInput("juan@email.com", "");
    expect(errors).toContain("La contraseña es requerida");
  });

  it("retorna error si la contraseña tiene menos de 8 caracteres", () => {
    const errors = validateLoginInput("juan@email.com", "Cort3");
    expect(errors).toContain(
      "La contraseña debe tener al menos 8 caracteres"
    );
  });

  // ── Múltiples errores ────────────────────────────────────
  it("retorna ambos errores si email y password son inválidos", () => {
    const errors = validateLoginInput("", "");
    expect(errors).toHaveLength(2);
    expect(errors).toContain("El email es requerido");
    expect(errors).toContain("La contraseña es requerida");
  });
});