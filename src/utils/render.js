import React from 'react';
import {render as rtlRender} from '@testing-library/react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from '../redux/store';

const render = (
    ui,
    {
        initialState,
        reducer = rootReducer,
        store = createStore(reducer, initialState),
        ...renderOptions
    } = {}
) => {
    const Wrapper = ({children}) => <Provider store={store}>{children}</Provider>;
    return rtlRender(ui, {wrapper: Wrapper, ...renderOptions});
}

export * from '@testing-library/react';
export {render};