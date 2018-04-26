import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import route from './route/index';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader';
import './style/reset.scss';

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    );
};
render(route);

// 热加载
if (module.hot) {
    module.hot.accept('./route/', () => {
        render(route);
        render(require('./route/'));
    });
}
registerServiceWorker();
