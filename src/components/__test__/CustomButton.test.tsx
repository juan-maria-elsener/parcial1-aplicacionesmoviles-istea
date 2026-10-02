import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { CustomButton } from "../CustomButton";

describe("CustomButton", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("renderizado inicial", () => {

    it("renderiza el título correctamente", async () => {
      
      await render(<CustomButton title="Ingresar" onPress={() => {}} />);
      
      // 3. Ahora sí, screen encontrará el botón sin problemas
      expect(screen.getByText("Ingresar")).toBeTruthy();
    });
  });

  describe("flujo de interacción", () => {

    it("llama a la función onPress al ser presionado", async () => {
      const mockOnPress = jest.fn();
      
      await render(<CustomButton title="Confirmar" onPress={mockOnPress} />);

      fireEvent.press(screen.getByText("Confirmar"));

      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
  });
});