class AddVaccineHelperMethods {
  constructor() {
    this.props = null;
    this.instance = null;
  }

  set setProps(props) {
    this.props = props;
  }

  set setInstance(instance) {
    this.instance = instance;
  }
  goBack = () => {
    this.props.navigation.pop();
  };
}

const addVaccineHelperMethods = new AddVaccineHelperMethods();

export default addVaccineHelperMethods;
