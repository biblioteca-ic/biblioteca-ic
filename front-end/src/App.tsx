import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Navigation } from './navigation';
import { AuthProvider } from './providers/AuthProvider';
import TemplateProvider from './providers/TemplateProvider';

const App = () => (
  <Router>
    <AuthProvider>
      <TemplateProvider>
        <Navigation />
      </TemplateProvider>
    </AuthProvider>
  </Router>
);

export default App;
