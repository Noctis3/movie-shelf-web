import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  CREATE_REQUEST_TOKEN,
  CREATE_SESSION,
  GET_ACCOUNT_DETAILS,
  VALIDATE_REQUEST_TOKEN,
} from '../types/requests';
import api from '../services/api';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

type User = {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string | null;
    };
  };
  id: number;
  include_adult: boolean;
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  username: string;
  sessionId: string;
};

type SignInCredentials = {
  username: string;
  password: string;
};

type AuthContextData = {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  isSignedIn: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const cookies = parseCookies();
  const isSignedIn = !!cookies.session_id;

  const saveToLocalStorage = (data: User) => {
    localStorage.setItem('user', JSON.stringify(data));
  };

  const loadFromLocalStorage = () => {
    const storedData = localStorage.getItem('user');
    return storedData ? JSON.parse(storedData) : {};
  };

  useEffect(() => {
    const storedUser = loadFromLocalStorage();
    setUser(storedUser);
  }, []);

  const signIn = useCallback(
    async ({ username, password }: SignInCredentials) => {
      try {
        const createRequestTokenResponse = await api.get(CREATE_REQUEST_TOKEN);
        const validateRequestTokenResponse = await api.post(
          VALIDATE_REQUEST_TOKEN,
          {
            username,
            password,
            request_token: createRequestTokenResponse.data.request_token,
          }
        );
        const createSessionResponse = await api.post(CREATE_SESSION, {
          request_token: validateRequestTokenResponse.data.request_token,
        });
        const accountDetailsResponse = await api.get(
          `${GET_ACCOUNT_DETAILS}?session_id=${createSessionResponse.data.session_id}`
        );
        setUser({
          ...accountDetailsResponse.data,
          sessionId: createSessionResponse.data.session_id,
        });

        setCookie(null, 'session_id', user.sessionId, {
          maxAge: 60 * 60 * 2,
          path: '/',
        });
        setCookie(null, 'user', JSON.stringify(user), {
          maxAge: 60 * 60 * 2,
          path: '/',
        });
        saveToLocalStorage(user);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    [user]
  );

  const signOut = () => {
    destroyCookie(null, 'session_id', {
      path: '/',
    });
    destroyCookie(null, 'user', {
      path: '/',
    });

    window.location.replace('/login');
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isSignedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
