import React, { createContext, useContext, useEffect, useRef } from 'react';

interface AccessibilityContextType {
  announceToScreenReader: (message: string) => void;
  focusElement: (selector: string) => void;
  trapFocus: (element: HTMLElement) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const announcementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create announcement div for screen readers
    const announcementDiv = document.createElement('div');
    announcementDiv.setAttribute('aria-live', 'polite');
    announcementDiv.setAttribute('aria-atomic', 'true');
    announcementDiv.className = 'sr-only';
    announcementDiv.id = 'accessibility-announcements';
    document.body.appendChild(announcementDiv);
    announcementRef.current = announcementDiv;

    return () => {
      if (announcementDiv.parentNode) {
        announcementDiv.parentNode.removeChild(announcementDiv);
      }
    };
  }, []);

  const announceToScreenReader = (message: string) => {
    if (announcementRef.current) {
      announcementRef.current.textContent = message;
      // Clear the message after a short delay
      setTimeout(() => {
        if (announcementRef.current) {
          announcementRef.current.textContent = '';
        }
      }, 1000);
    }
  };

  const focusElement = (selector: string) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.focus();
    }
  };

  const trapFocus = (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    
    // Focus the first element
    if (firstElement) {
      firstElement.focus();
    }

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  };

  const value: AccessibilityContextType = {
    announceToScreenReader,
    focusElement,
    trapFocus,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
