import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoints';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreatePoint} path="/" />
        </BrowserRouter>
    );
}

export default Routes;