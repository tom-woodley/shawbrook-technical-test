import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import TOPIC_OPTIONS from '../../constants/topicOptions';

export interface UserProps {
  firstName: string;
  lastName: string;
  topic: (typeof TOPIC_OPTIONS)[number];
  topicOther?: string;
}

type UserPropsKeys = keyof UserProps;

interface ImageProps {
  url: string;
  alt: string;
}

export type StoreContextProps = {
  user: UserProps;
  setUser: Dispatch<SetStateAction<UserProps>>;
  setUserValue: (name: UserPropsKeys, value: string) => void;
  image?: ImageProps;
  setImage: Dispatch<SetStateAction<ImageProps>>;
};

export const StoreContext = createContext({} as StoreContextProps);

const initialUser: UserProps = {
  firstName: '',
  lastName: '',
  topic: '',
  topicOther: '',
};

function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProps>(initialUser);
  const [image, setImage] = useState({ url: '', alt: '' });

  const setUserValue = useCallback((name: UserPropsKeys, value: string) => {
    if (Object.keys(initialUser).includes(name)) {
      setUser((prev: UserProps) => ({ ...prev, [name]: value }));
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      setUserValue,
      image,
      setImage,
    }),
    [image, setUserValue, user]
  );
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export default StoreProvider;
