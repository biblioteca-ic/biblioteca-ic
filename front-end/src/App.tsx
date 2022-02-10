import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Navigation } from './navigation';
import TemplateProvider from './providers/TemplateProvider';

const App = () => (
  <Router>
    <TemplateProvider>
      <Navigation />
    </TemplateProvider>
  </Router>
);

export default App;
