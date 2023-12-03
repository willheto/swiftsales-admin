import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Root from './components/Root/Root';
import './index.scss';
import { UserProvider } from './context/UserContext';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
	<BrowserRouter>
		<UserProvider defaultUser={null}>
			<Root />
		</UserProvider>
	</BrowserRouter>,
);
