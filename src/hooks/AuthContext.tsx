import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  ReactNode,
  createContext,
  useContext,
} from "react";
import {
  TUser,
  TLoginResponse,
  setTokenHeader,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useRefreshTokenMutation,
  TLoginUser,
} from "~/data-provider";
import { useNavigate, useLocation } from "react-router-dom";

export type TAuthContext = {
  user: TUser | undefined;
  token: string | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | undefined;
  login: (data: TLoginUser) => void;
  logout: () => void;
};

export type TUserContext = {
  user?: TUser | undefined;
  token: string | undefined;
  isAuthenticated: boolean;
  redirect?: string;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const loginUser = useLoginUserMutation();
  const logoutUser = useLogoutUserMutation();
  const userQuery = useGetUserQuery({ enabled: !!token });
  console.log(userQuery);
  const refreshToken = useRefreshTokenMutation();

  const location = useLocation();

  const setUserContext = (userContext: TUserContext) => {
    const { token, isAuthenticated, user, redirect } = userContext;
    if (user) {
      setUser(user);
    }
    console.log(token);
    console.log(isAuthenticated);
    setToken(token);
    setTokenHeader(token);
    setIsAuthenticated(isAuthenticated);
    if (redirect) {
      navigate(redirect);
    }
  };

  const getCookieValue = (key) => {
    return localStorage.getItem("token");
  };

  const login = (data: TLoginUser) => {
    loginUser.mutate(data, {
      onSuccess: (data: TLoginResponse) => {
        const { user, token } = data;
        console.log(user);
        if (!user.phoneVerified) {
          navigate(`/register/otp?phone=${user.phone}`);
          return;
        }
        localStorage.setItem("token", token);
        setUserContext({
          token,
          isAuthenticated: true,
          user,
          redirect: "/chat/new",
        });
      },
      onError: (error) => {
        setError(error.message);
      },
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    logoutUser.mutate(undefined, {
      onSuccess: () => {
        setUserContext({
          token: undefined,
          isAuthenticated: false,
          user: undefined,
          redirect: "/login",
        });
      },
      onError: (error) => {
        setError(error.message);
      },
    });
  };

  useEffect(() => {
    if (userQuery.data) {
      setUser(userQuery.data);
    } else if (userQuery.isError) {
      setError(userQuery.error.message);
      navigate("/login");
    }
    if (error && isAuthenticated) {
      setError(undefined);
    }
    if (!token || !isAuthenticated) {
      const tokenFromCookie = getCookieValue("token");
      console.log(tokenFromCookie);
      if (tokenFromCookie) {
        // debugger;
        setUserContext({
          token: tokenFromCookie,
          isAuthenticated: true,
          user: userQuery.data,
        });
      } else {
        console.log("asajsojasojso");

        navigate("/login");
      }
    }
  }, [token, isAuthenticated, userQuery.data, userQuery.isError]);

  // const silentRefresh = useCallback(() => {
  //   refreshToken.mutate(undefined, {
  //     onSuccess: (data: TLoginResponse) => {
  //       const { user, token } = data;
  //       setUserContext({ token, isAuthenticated: true, user });
  //     },
  //     onError: error => {
  //       setError(error.message);
  //     }
  //   });
  //   setTimeout(silentRefresh, 5 * 60 * 1000);
  // }, [setUserContext]);

  useEffect(() => {
    if (loginUser.isLoading || logoutUser.isLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loginUser.isLoading, logoutUser.isLoading]);

  // useEffect(() => {
  //   if (token)
  //   silentRefresh();
  // }, [token, silentRefresh]);

  // Make the provider update only when it should
  const memoedValue = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      isLoading,
      error,
      login,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, isLoading, error, isAuthenticated, token]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext should be used inside AuthProvider");
  }

  return context;
};

export { AuthContextProvider, useAuthContext };
