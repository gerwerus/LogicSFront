import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Test Header', () => {
    test('Test Render', () => {
      render(<Header />);
      const linkElement1 = screen.getByText(/Профиль/i);
      const linkElement2 = screen.getByText(/Проект/i);
      expect(linkElement1).toBeInTheDocument();
      expect(linkElement2).toBeInTheDocument();
    });

    
    test('Test Hidden', () => {
        render(<Header />);
        expect(screen.queryByText(/Выход/i)).toBeNull();
        expect(screen.queryByText(/Задания/i)).toBeNull();
        expect(screen.queryByText(/Студенты/i)).toBeNull();
      });
})
