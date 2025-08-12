import { useEffect } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export function GoogleTranslate() {
  useEffect(() => {
    // Load Google Translate script
    const addScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi,bn,ta,te,ml,kn,gu,mr,pa,or,as,ne,ur',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          multilanguagePage: true
        },
        'google_translate_element'
      );
    };

    // Check if script is already loaded
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      addScript();
    } else if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }

    return () => {
      // Cleanup function
      const existingScript = document.querySelector('script[src*="translate.google.com"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const toggleTranslate = () => {
    const translateElement = document.getElementById('google_translate_element');
    if (translateElement) {
      const selectElement = translateElement.querySelector('select');
      if (selectElement) {
        // Toggle between English and Hindi
        const currentValue = selectElement.value;
        selectElement.value = currentValue === 'en' ? 'hi' : 'en';
        selectElement.dispatchEvent(new Event('change'));
      }
    }
  };

  return (
    <div className="relative">
      {/* Hidden Google Translate Element */}
      <div 
        id="google_translate_element" 
        style={{ 
          position: 'absolute', 
          top: '-9999px', 
          left: '-9999px', 
          visibility: 'hidden' 
        }}
      />
      
      {/* Custom Translate Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTranslate}
        className="flex items-center gap-2 hover:bg-blue-50 text-blue-700"
        title="Translate Page"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden md:inline text-sm">Translate</span>
      </Button>
    </div>
  );
}