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
  const isSignedIn = !!user.sessionId;

  const saveToLocalStorage = (data: User) => {
    localStorage.setItem('user', JSON.stringify(data));
  };

  useEffect(() => {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      setUser(JSON.parse(storedData));
    } else {
      setUser({} as User);
    }
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

        console.log(accountDetailsResponse);
        setUser({
          ...accountDetailsResponse.data,
          sessionId: createSessionResponse.data.session_id,
        });

        saveToLocalStorage({
          ...accountDetailsResponse.data,
          sessionId: createSessionResponse.data.session_id,
        });
      } catch (error) {
        return Promise.reject(error);
      }
    },
    [user]
  );

  const signOut = () => {
    setUser({} as User);
    localStorage.removeItem('user');
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
