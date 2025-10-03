// /frontend/src/App.test.js

import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './AuthContext'; // Import AuthProvider

beforeEach(() => {
  window.history.pushState({}, 'Test page', '/Capstone-Project/');
});

test('renders Healthcare made easy slogan', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  const sloganElement = screen.getByText(/Healthcare made easy./i);
  expect(sloganElement).toBeInTheDocument();
});
