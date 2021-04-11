import React from 'react';
import {StackActions} from '@react-navigation/native';

class NavigationService {
  constructor() {
    this._navigation = null;
  }

  set navigation(nav) {
    this._navigation = nav;
  }

  get navigation() {
    return this._navigation;
  }
}

const navigationService = new NavigationService();

const navigationRef = React.createRef();

const navigate = (name, params) =>
  navigationRef.current?.navigate(name, params);

const replace = (name, params) =>
  navigationRef.current?.dispatch(StackActions.replace(name, params));

const push = (...args) =>
  navigationRef.current?.dispatch(StackActions.push(...args));

const pop = (screenCount = 1) =>
  navigationRef.current?.dispatch(StackActions.pop(screenCount));

const popToTop = () => navigationRef.current?.dispatch(StackActions.popToTop());

const goBack = () => navigationRef.current?.goBack();

export {navigationRef, navigate, replace, push, pop, popToTop, goBack};

export default navigationService;
