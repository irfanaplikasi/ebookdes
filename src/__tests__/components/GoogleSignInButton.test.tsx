import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../store/reducers/authReducer";
import GoogleSignInButton from "../../components/GoogleSignInButton";

// Mock the toast hook
jest.mock("../../components/ui/use-toast", () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        isLoading: false,
        error: null,
        ...initialState,
      },
    },
  });
};

const renderWithProvider = (
  component: React.ReactElement,
  initialState = {},
) => {
  const store = createMockStore(initialState);
  return render(<Provider store={store}>{component}</Provider>);
};

describe("GoogleSignInButton Component", () => {
  it("renders with default text", () => {
    renderWithProvider(<GoogleSignInButton />);

    expect(screen.getByText("Masuk dengan Google")).toBeInTheDocument();
  });

  it("renders with custom children", () => {
    renderWithProvider(<GoogleSignInButton>Custom Text</GoogleSignInButton>);

    expect(screen.getByText("Custom Text")).toBeInTheDocument();
  });

  it("has correct button attributes", () => {
    renderWithProvider(<GoogleSignInButton />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass(
      "w-full",
      "flex",
      "items-center",
      "justify-center",
      "gap-2",
    );
  });

  it("displays Google icon", () => {
    renderWithProvider(<GoogleSignInButton />);

    const svg = screen.getByRole("button").querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("w-5", "h-5");
  });

  it("applies custom className", () => {
    renderWithProvider(<GoogleSignInButton className="custom-class" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});
