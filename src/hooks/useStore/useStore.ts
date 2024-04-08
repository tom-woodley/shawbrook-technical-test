import { useContext } from 'react';
import { StoreContext } from './StoreContext';

function useStore() {
  const store = useContext(StoreContext);
  return store;
}

export default useStore;
