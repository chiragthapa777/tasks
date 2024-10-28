import { screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { z } from "zod";
import * as AuthProvider from "../../providers/AuthProvider";
import { registerSchema } from "../../schemas/register.schema";
import * as userService from "../../services/user.service";
import { render } from "../../test-utils";
import { loginResponseType } from "../../types/login-response.type";
import RegisterForm from "./RegisterForm";

describe("RegisterForm", () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  test("should render input fields and a submit button", () => {
    render(<RegisterForm />);

    const nameElement = screen.getByLabelText(/name/i);
    const emailElement = screen.getByLabelText(/email/i);
    const passwordElement = screen.getByLabelText("password");
    const confirmPasswordElement = screen.getByLabelText("confirmPassword");
    const registerButton = screen.getByRole("button", { name: /register/i });

    expect(nameElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(confirmPasswordElement).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  test("should display an error message when registration fails", async () => {
    user.setup();
    vitest
      .spyOn(userService, "register")
      .mockRejectedValueOnce(new Error("Registration failed"));
    render(<RegisterForm />);

    const nameElement = screen.getByLabelText(/name/i);
    const emailElement = screen.getByLabelText(/email/i);
    const passwordElement = screen.getByLabelText("password");
    const confirmPasswordElement = screen.getByLabelText("confirmPassword");
    const registerButton = screen.getByRole("button", { name: /register/i });

    const registerData: z.infer<typeof registerSchema> = {
      name: "Test User",
      email: "test@gmail.com",
      password: "password123",
      confirmPassword: "password123",
    };

    await user.type(nameElement, registerData.name);
    await user.type(emailElement, registerData.email);
    await user.type(passwordElement, registerData.password);
    await user.type(confirmPasswordElement, registerData.confirmPassword);
    await user.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText(/registration failed/i)).toBeInTheDocument();
    });

    expect(userService.register).toHaveBeenCalledWith(
      expect.objectContaining(registerData)
    );
  });

  test("should disable the button if form is not valid", () => {
    render(<RegisterForm />);

    expect(screen.getByRole("button", { name: /register/i })).toBeDisabled();
  });

  test("should call register service and navigate on successful registration", async () => {
    const responseData: loginResponseType = {
      accessToken: "accessToken",
      user: {
        _id: "test_id",
        email: "test@gmail.com",
        name: "Test User",
      },
    };

    const setAuthUserMock = vitest.fn();
    vitest.spyOn(AuthProvider, "useAuth").mockReturnValue({
      setAuthUser: setAuthUserMock,
      user: null,
    } as any);

    vitest.spyOn(userService, "register").mockResolvedValueOnce(responseData);

    render(<RegisterForm />);
    const nameElement = screen.getByLabelText(/name/i);
    const emailElement = screen.getByLabelText(/email/i);
    const passwordElement = screen.getByLabelText("password");
    const confirmPasswordElement = screen.getByLabelText("confirmPassword");
    const registerButton = screen.getByRole("button", { name: /register/i });

    const registerData: z.infer<typeof registerSchema> = {
      name: "Test User",
      email: "test@gmail.com",
      password: "password123",
      confirmPassword: "password123",
    };

    await user.type(nameElement, registerData.name);
    await user.type(emailElement, registerData.email);
    await user.type(passwordElement, registerData.password);
    await user.type(confirmPasswordElement, registerData.confirmPassword);
    await user.click(registerButton);

    await waitFor(() => {
      expect(setAuthUserMock).toHaveBeenCalledWith(
        responseData.user,
        responseData.accessToken
      );
    });
  });
});
