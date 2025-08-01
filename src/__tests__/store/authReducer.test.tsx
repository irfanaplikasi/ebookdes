import authReducer, {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
} from "../../store/reducers/authReducer";
import { AuthState, User } from "../../types/user";

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const mockUser: User = {
  id: "123",
  email: "test@example.com",
  full_name: "Test User",
  avatar_url: null,
  role: "user",
};

describe("authReducer", () => {
  it("should return the initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle loginStart", () => {
    const actual = authReducer(initialState, loginStart());
    expect(actual).toEqual({
      user: null,
      isLoading: true,
      error: null,
    });
  });

  it("should handle loginSuccess", () => {
    const actual = authReducer(initialState, loginSuccess(mockUser));
    expect(actual).toEqual({
      user: mockUser,
      isLoading: false,
      error: null,
    });
  });

  it("should handle loginFailure", () => {
    const errorMessage = "Login failed";
    const actual = authReducer(initialState, loginFailure(errorMessage));
    expect(actual).toEqual({
      user: null,
      isLoading: false,
      error: errorMessage,
    });
  });

  it("should handle logout", () => {
    const stateWithUser: AuthState = {
      user: mockUser,
      isLoading: false,
      error: null,
    };
    const actual = authReducer(stateWithUser, logout());
    expect(actual).toEqual(initialState);
  });

  it("should handle clearError", () => {
    const stateWithError: AuthState = {
      user: null,
      isLoading: false,
      error: "Some error",
    };
    const actual = authReducer(stateWithError, clearError());
    expect(actual).toEqual({
      user: null,
      isLoading: false,
      error: null,
    });
  });

  it("should handle loginStart when user is already logged in", () => {
    const stateWithUser: AuthState = {
      user: mockUser,
      isLoading: false,
      error: null,
    };
    const actual = authReducer(stateWithUser, loginStart());
    expect(actual).toEqual({
      user: mockUser,
      isLoading: true,
      error: null,
    });
  });
});
