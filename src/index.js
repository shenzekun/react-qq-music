import React from 'react';
import ReactDOM from 'react-dom';
import route from './route/';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader';
import FastClick from 'fastclick';
import './index.scss';
import { Provider } from 'react-redux';
import store from './store/store';

FastClick.attach(document.body);

const render = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer>
                <Component />
            </AppContainer>
        </Provider>,
        document.getElementById('root')
    );
};
render(route);

// 热加载
if (module.hot) {
    module.hot.accept('./route/', () => {
        render(route);
    });
}
registerServiceWorker();
