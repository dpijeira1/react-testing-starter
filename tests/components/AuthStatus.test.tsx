import { render, screen } from "@testing-library/react";
import AuthStatus from "../../src/components/AuthStatus";
import { mockAuthState } from "../utils";

describe("AuthStatus", () => {
  it("should render a loading message when fetching auth status", () => {
    mockAuthState({
      isLoading: true,
      isAuthenticated: false,
      user: undefined,
    });
    render(<AuthStatus />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should render a login button when user is not authenticated", () => {
    mockAuthState({
      isLoading: false,
      isAuthenticated: false,
      user: undefined,
    });
    render(<AuthStatus />);
    expect(screen.getByRole("button")).toHaveTextContent(/log in/i);
    expect(
      screen.queryByRole("button", { name: /log out/i })
    ).not.toBeInTheDocument();
  });

  it("should render a log out button and user name when user is authenticated", () => {
    mockAuthState({
      isLoading: false,
      isAuthenticated: true,
      user: { id: 1, name: "Dan" },
    });
    render(<AuthStatus />);
    expect(screen.getByRole("button")).toHaveTextContent(/log out/i);
    expect(screen.getByText(/dan/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /log in/i })
    ).not.toBeInTheDocument();
  });
});
