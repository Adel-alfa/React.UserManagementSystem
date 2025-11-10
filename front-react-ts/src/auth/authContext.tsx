import {
  createContext,
  useReducer,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';

import type{
  IAuthContext,
  IAuthContextAction,
  IAuthContextState,
  ILoginResponseDto,
} from '../types/authDto';
import{  IAuthContextActionTypes} from '../types/authDto';

import { getSession, setSession } from './auth.utils';
import api from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  LOGIN_URL,
  ME_URL,
  PATH_AFTER_LOGIN,
  PATH_AFTER_LOGOUT,
  PATH_AFTER_REGISTER,
  REGISTER_URL,
} from '../utils/globalConfig';

// We need a reducer function for useReducer hook
const authReducer = (
  state: IAuthContextState,
  action: IAuthContextAction
): IAuthContextState => {
  switch (action.type) {
    case IAuthContextActionTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        isAuthLoading: false,
        user: action.payload,
      };

    case IAuthContextActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        isAuthLoading: false,
        user: undefined, // or null,
      };

    default:
      return state;
  }
};


// ---------------- Initial State ----------------
const initialAuthState: IAuthContextState = {
  isAuthenticated: false,
  isAuthLoading: true,
  user: undefined,
};

// ---------------- Context ----------------
export const AuthContext = createContext<IAuthContext | null>(null);

interface IProps {
  children: ReactNode;
}

// ---------------- Provider ----------------
const AuthContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const navigate = useNavigate();

  // Initialize Method
  const initializeAuthContext = useCallback(async () => {
    try {
      const token = getSession();
      if (token) {
        // Ensure axios has the token before validation
         setSession(token);
        const response = await api.post<ILoginResponseDto>(ME_URL, {token });        
        const { newToken, userDetails  } = response.data;

        setSession(newToken);
        dispatch({
          type: IAuthContextActionTypes.LOGIN,
          payload: userDetails ,
        });
      } else {
        setSession(null);
        dispatch({
          type: IAuthContextActionTypes.LOGOUT,
        });
      }
    } catch (error) {
       console.error('initializeAuthContext error:', error);
      setSession(null);
      dispatch({
        type: IAuthContextActionTypes.LOGOUT,
      });        
    }
  }, []);

  // In start of Application, We call initializeAuthContext to be sure about authentication status
  useEffect(() => {
    console.log('AuthContext Initialization start');
    initializeAuthContext()
      .then(() => console.log('AuthContext initialized'))
      .catch((error) => console.error('Auth init failed:', error));
  }, [initializeAuthContext]);
  
  // Register Method
  const register = useCallback(
    async (firstName: string, lastName: string, userName: string, email: string, password: string, address: string) => {
      const response = await api.post(REGISTER_URL, {
        firstName,
        lastName,
        userName,
        email,
        password,
        address,
      });
      console.log('Register Result:', response);
      toast.success('Register Was Successfull. Please Login.');
      navigate(PATH_AFTER_REGISTER);
    },
    [navigate]
  );
  
  // Login Method
  const login = useCallback(async (userName: string, password: string) => {
    const response = await api.post<ILoginResponseDto>(LOGIN_URL, {
      userName,
      password,
    });
    toast.success('Login Was Successful');
    // In response, we receive jwt token and user data
    const { newToken, userDetails  } = response.data;
    setSession(newToken);
    dispatch({
      type: IAuthContextActionTypes.LOGIN,
      payload: userDetails ,
    });
    navigate(PATH_AFTER_LOGIN);
  }, [navigate]);
  
  // Logout Method
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: IAuthContextActionTypes.LOGOUT,
    });
    navigate(PATH_AFTER_LOGOUT);
  }, [navigate]);
  
  // Context value+++
  const value: IAuthContext = {
    isAuthenticated: state.isAuthenticated,
    isAuthLoading: state.isAuthLoading,
    user: state.user,
    register,
    login,
    logout,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;