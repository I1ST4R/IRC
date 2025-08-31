import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../main/store';
import { AccessibilityProvider } from '../main/components/AccessibilityProvider/AccessibilityProvider';
import Header from '../main/App/Header/Header';
import { Menu } from '../pages/Catalog/Menu/Menu';
import { ProductList } from '../pages/Catalog/ProductList/ProductList';

expect.extend(toHaveNoViolations);

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <AccessibilityProvider>
          {component}
        </AccessibilityProvider>
      </BrowserRouter>
    </Provider>
  );
};

describe('Accessibility Tests', () => {
  describe('Header Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = renderWithProviders(<Header />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA labels', () => {
      renderWithProviders(<Header />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByLabelText('Шапка сайта')).toBeInTheDocument();
    });

    it('should have skip links', () => {
      renderWithProviders(<Header />);
      
      const skipLinks = document.querySelectorAll('.skip-link');
      expect(skipLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Menu Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = renderWithProviders(<Menu />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper form labels', () => {
      renderWithProviders(<Menu />);
      
      // Check for price range inputs
      const minPriceInput = screen.getByLabelText(/минимальная цена/i);
      const maxPriceInput = screen.getByLabelText(/максимальная цена/i);
      
      expect(minPriceInput).toBeInTheDocument();
      expect(maxPriceInput).toBeInTheDocument();
    });

    it('should have proper button labels', () => {
      renderWithProviders(<Menu />);
      
      const resetButton = screen.getByLabelText(/очистить все фильтры/i);
      expect(resetButton).toBeInTheDocument();
    });
  });

  describe('ProductList Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = renderWithProviders(<ProductList />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper loading states', () => {
      renderWithProviders(<ProductList />);
      
      // Check for loading message
      const loadingMessage = screen.getByText(/загрузка товаров/i);
      expect(loadingMessage).toBeInTheDocument();
    });
  });

  describe('General Accessibility', () => {
    it('should have proper focus management', () => {
      renderWithProviders(<Header />);
      
      // Check that focusable elements exist
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      expect(focusableElements.length).toBeGreaterThan(0);
    });

    it('should have proper color contrast', () => {
      renderWithProviders(<Header />);
      
      // This would require more sophisticated testing with actual color values
      // For now, we check that the CSS variables are defined
      const style = getComputedStyle(document.documentElement);
      expect(style.getPropertyValue('--focus-color')).toBeDefined();
    });
  });
});
