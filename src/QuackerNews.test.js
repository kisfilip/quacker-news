import React from 'react';
import ReactDOM from 'react-dom';
import QuackerNews from './QuackerNews';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QuackerNews />, div);
  ReactDOM.unmountComponentAtNode(div);
});
