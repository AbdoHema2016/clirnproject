class RouterMethods {
  constructor() {
    this.props = null;
    this.instance = null;
  }

  setProps(props) {
    this.props = props;
  }

  setInstance(instance) {
    this.instance = instance;
  }
  logout = (token) => {
    const {logout} = this.props;
    logout(token);
  };
}

export const RouterMethodsObj = new RouterMethods();
