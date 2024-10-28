import { screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { z } from "zod";
import { loginSchema } from "../../schemas/login.schema";
import * as userService from "../../services/user.service";
import { render } from "../../test-utils";
import { loginResponseType } from "../../types/login-response.type";
import LoginForm from "./LoginForm";
import * as AuthProvider from "../../providers/AuthProvider";

describe("LoginForm", () => {
  beforeEach(() => {
    vitest.clearAllMocks();
  });

  test("should render input fields and a submit button", () => {
    render(<LoginForm />);

    const emailElement = screen.getByLabelText(/email/i);
    const passwordElement = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test("should display an error message when login fails", async () => {
    user.setup();
    vitest
      .spyOn(userService, "login")
      .mockRejectedValueOnce(new Error("invalid credentials"));
    render(<LoginForm />);
    const emailElement = screen.getByLabelText(/email/i);
    const passwordElement = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    const loginData: z.infer<typeof loginSchema> = {
      email: "Test@gmail.com",
      password: "wrongPw",
    };

    await user.type(emailElement, loginData.email);
    await user.type(passwordElement, loginData.password);
    await user.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });

    expect(userService.login).toHaveBeenCalledWith(
      expect.objectContaining(loginData)
    );
  });

  test("should disable the button if form is not valid", () => {
    render(<LoginForm />);

    expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();
  });

  test("should call login service and navigate on successful login", async () => {
    const responseData: loginResponseType = {
      accessToken: "accessToken",
      user: {
        _id: "test_id",
        email: "test@gmail.com",
        name: "test name",
      },
    };
    vitest.spyOn(userService, "login").mockResolvedValueOnce(responseData);
    const setAuthUserMock = vitest.fn();
    vitest.spyOn(AuthProvider, "useAuth").mockReturnValue({
      setAuthUser: setAuthUserMock,
      user: null,
    } as any);

    render(<LoginForm />);
    const emailElement = screen.getByLabelText(/email/i);
    const passwordElement = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    const loginData: z.infer<typeof loginSchema> = {
      email: "Test@gmail.com",
      password: "correctPw",
    };

    await user.type(emailElement, loginData.email);
    await user.type(passwordElement, loginData.password);
    await user.click(loginButton);

    await waitFor(() => {
      expect(setAuthUserMock).toHaveBeenCalledWith(
        responseData.user,
        responseData.accessToken
      );
    });
  });
});
