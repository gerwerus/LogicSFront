import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

global.structuredClone = jest.fn(val => {
  return JSON.parse(JSON.stringify(val));
});

describe('Test App', () => {
  test('Test Render', () => {
    render(<App />);
    const linkElement = screen.getByText(/Элементы схемы/i);
    const linkElement1 = screen.getByText(/Профиль/i);
    const linkElement2 = screen.getByText(/Проект/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement1).toBeInTheDocument();
    expect(linkElement2).toBeInTheDocument();
  });


  test('Test Header', () => {
    render(<App />);
    expect(screen.queryByText(/Регистрация/i)).toBeNull();
    fireEvent.click(screen.getByText(/Профиль/i))
    expect(screen.queryByText(/Регистрация/i)).toBeInTheDocument()
    expect(screen.queryByText(/Авторизация/i)).toBeInTheDocument()
    fireEvent.click(screen.getByText(/Профиль/i))
    expect(screen.queryByText(/Регистрация/i)).toBeNull();

    expect(screen.queryByText(/Новый проект/i)).toBeNull();
    fireEvent.click(screen.getByText(/Проект/i))
    expect(screen.queryByText(/Новый проект/i)).toBeInTheDocument()
    expect(screen.queryByText(/Сохранить проект/i)).toBeInTheDocument()
    expect(screen.queryByText(/Загрузить проект/i)).toBeInTheDocument()
  });


  test('Add Component', () => {
    render(<App />);
    expect(screen.getByText(/\+/i))
    fireEvent.click(screen.getByText(/\+/i))
    expect(screen.queryByText(/\+/i)).toBeNull()
    expect(screen.getAllByText(/Input/i))
    fireEvent.click(screen.getAllByText(/Input/i)[0])
    fireEvent.click(screen.getAllByText(/Input/i)[1])
  });


  test('Remove Component', () => {
    render(<App />);
    expect(screen.getByText(/\+/i))
    fireEvent.click(screen.getByText(/\+/i))
    expect(screen.queryByText(/\+/i)).toBeNull()
    expect(screen.getAllByText(/Input/i))
    fireEvent.click(screen.getAllByText(/Input/i)[0])
    fireEvent.click(screen.getByText(/Delete/i))
  });
})


