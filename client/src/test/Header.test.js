
import Header from '../components/Header';
import { render } from "./test-utils";
import {  screen } from '@testing-library/react';

test('renders header, searches for name', () => {
  render(<Header />);
  const linkElement = screen.getByText('PARTIFY');
  expect(linkElement).toBeInTheDocument();
});
