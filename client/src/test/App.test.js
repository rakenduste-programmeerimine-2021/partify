import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders app.js hiddem a element', () => {
  render(<App />);
  const linkElement = screen.getByText('a');
  expect(linkElement).toBeInTheDocument();
});
