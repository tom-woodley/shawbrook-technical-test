import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import StoreProvider from '../../hooks/useStore';

describe('App', () => {
  it('renders', () => {
    render(
      <MemoryRouter>
        <StoreProvider>
          <App />
        </StoreProvider>
      </MemoryRouter>
    );
  });
});
