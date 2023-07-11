import { ReactNode, createContext, useCallback, useState } from 'react';
import {
  CREATE_REQUEST_TOKEN,
  CREATE_SESSION,
  GET_ACCOUNT_DETAILS,
  VALIDATE_REQUEST_TOKEN,
} from '../types/requests';
import api from '../services/api';

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
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const signIn = useCallback(
    async ({ username, password }: SignInCredentials) => {
      try {
        const createRequestTokenResponse = await api.get(CREATE_REQUEST_TOKEN);
        console.log(createRequestTokenResponse.data);
        const validateRequestTokenResponse = await api.post(
          VALIDATE_REQUEST_TOKEN,
          {
            username,
            password,
            request_token: createRequestTokenResponse.data.request_token,
          }
        );
        console.log(validateRequestTokenResponse.data);
        const createSessionResponse = await api.post(CREATE_SESSION, {
          request_token: validateRequestTokenResponse.data.request_token,
        });
        console.log(createSessionResponse.data);
        const accountDetailsResponse = await api.get(
          `${GET_ACCOUNT_DETAILS}?session_id=${createSessionResponse.data.session_id}`
        );
        console.log(accountDetailsResponse.data);
        setUser({
          ...accountDetailsResponse.data,
          sessionId: createSessionResponse.data.session_id,
        });

        console.log(user);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    [user]
  );
  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
