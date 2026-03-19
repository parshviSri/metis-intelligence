import { render, screen } from '@testing-library/react';
import Button from '../components/Button';

describe('Button component', () => {
  test('renders button with children', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('applies additional class names', () => {
    render(<Button className="extra-class">Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toHaveClass('extra-class');
  });
});