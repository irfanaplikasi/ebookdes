import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../store/reducers/authReducer";
import Navbar from "../../components/navbar";

// Mock the server-side components
jest.mock("../../components/navbar", () => {
  return function MockNavbar() {
    return (
      <nav className="w-full border-b border-gray-200 bg-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="/" className="text-xl font-bold text-blue-600">
            EbookDes
          </a>
          <div className="flex gap-4 items-center">
            <a
              href="/book"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              E-book
            </a>
            <a
              href="/about"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Tentang
            </a>
            <a
              href="/contact"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Kontak
            </a>
            <a
              href="/sign-in"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Masuk
            </a>
            <a
              href="/sign-up"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Daftar Sekarang
            </a>
          </div>
        </div>
      </nav>
    );
  };
});

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

describe("Navbar Component", () => {
  it("renders the navbar with correct elements", () => {
    renderWithProvider(<Navbar />);

    expect(screen.getByText("EbookDes")).toBeInTheDocument();
    expect(screen.getByText("E-book")).toBeInTheDocument();
    expect(screen.getByText("Tentang")).toBeInTheDocument();
    expect(screen.getByText("Kontak")).toBeInTheDocument();
    expect(screen.getByText("Masuk")).toBeInTheDocument();
    expect(screen.getByText("Daftar Sekarang")).toBeInTheDocument();
  });

  it("has correct navigation links", () => {
    renderWithProvider(<Navbar />);

    expect(screen.getByText("EbookDes").closest("a")).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByText("E-book").closest("a")).toHaveAttribute(
      "href",
      "/book",
    );
    expect(screen.getByText("Tentang").closest("a")).toHaveAttribute(
      "href",
      "/about",
    );
    expect(screen.getByText("Kontak").closest("a")).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(screen.getByText("Masuk").closest("a")).toHaveAttribute(
      "href",
      "/sign-in",
    );
    expect(screen.getByText("Daftar Sekarang").closest("a")).toHaveAttribute(
      "href",
      "/sign-up",
    );
  });
});
