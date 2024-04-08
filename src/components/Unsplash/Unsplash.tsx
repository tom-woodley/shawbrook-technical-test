import { useCallback, useEffect, useRef, useState } from 'react';

import classes from './styles.module.css';
import useStore from '../../hooks/useStore/useStore';
import Button from '../Form/Button';
import Loader from '../Loader/Loader';
import useThrottle from '../../hooks/useThrottle';

interface APIStateProps {
  loading: boolean;
  success: boolean;
  error: boolean | string;
}

function Unsplash() {
  const { image, setImage, user } = useStore();
  const isLoading = useRef(false);
  const { throttle } = useThrottle(1000);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const newQuery = user.topic === 'Other' ? user.topicOther : user.topic;
    throttle(() => setQuery(newQuery || ''));
  }, [throttle, user.topic, user.topicOther]);

  const [apiState, setApiState] = useState<APIStateProps>({
    loading: false,
    success: false,
    error: false,
  });

  const getPhoto = useCallback(async () => {
    if (isLoading.current) return;

    isLoading.current = true;

    setApiState({
      loading: true,
      success: false,
      error: false,
    });

    const photos = await fetch(
      `https://api.unsplash.com/photos/random?query=${query}&page=1&per_page=1`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Version': 'v1',
          /** This ENV will be set at project set up. It should be pulling through the type definition from the vite-env.d.ts
           * @link https://vitejs.dev/guide/env-and-mode#intellisense-for-typescript
           */
          // @ts-expect-errors-ignore
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
        },
      }
    )
      .then((blob) => blob.json())
      .catch(() => {
        setApiState({
          loading: false,
          success: false,
          error: true,
        });
        isLoading.current = false;
      });

    const url = photos?.urls?.regular;
    const alt = photos?.alt_description || query;

    if (typeof url === 'string') {
      setImage({ url, alt });
      setApiState({
        loading: false,
        success: true,
        error: false,
      });
    }
    isLoading.current = false;
  }, [query, setImage]);

  useEffect(() => {
    if (query) {
      getPhoto();
    }
  }, [getPhoto, setImage, query]);

  if (apiState.error) {
    return (
      <div className={classes.imageHolder}>
        <h2>Whoops, something went wrong</h2>
        {typeof apiState.error === 'string' ? <p>{apiState.error}</p> : ''}
      </div>
    );
  }

  if (apiState.loading) {
    return (
      <div className={classes.imageHolder}>
        <Loader />
        <p>Loading</p>
      </div>
    );
  }

  if (apiState.success) {
    if (image?.url) {
      return (
        <div className={classes.imageHolder}>
          <img src={image?.url} alt={image?.alt} />
          <div className={classes.buttonsHolder}>
            <Button type="submit">Accept</Button>
            <Button onClick={getPhoto}>Reject</Button>
          </div>
        </div>
      );
    }

    return (
      <div className={classes.imageHolder}>
        <p>No image found. Please try again</p>
      </div>
    );
  }
}
export default Unsplash;
