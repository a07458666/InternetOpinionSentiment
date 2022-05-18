import { render, screen } from '@testing-library/react';
import Keyword from '../Keyword';

test('Title', () => {
  render(<Keyword  />);
  const linkElement = screen.getByText(/Keyword/i);
  expect(linkElement).toBeInTheDocument();
});
