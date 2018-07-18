var fp = require('lodash/fp');

export default {
  "namespace": "addCar",
  "state": {
    pass: true,
    form0: {},
    form1: {},
    form2: []
  },
  "reducers": {
    letPass(state, { pass }) {
      return fp.set("pass", pass, state);
    },
    pushForm0(state, { form0 }) {
      return fp.set("form0", form0, state);
    },
    pushForm1(state, { form1 }) {
      return fp.set('form1', form1, state);
    },
    pushForm2(state, { form2 }) {
      var _form2 = fp.clone(state.form2);
      _form2.push(form2);
      return fp.set('form2', _form2, state);
    },
    clearForm2(state, { form2 }) {
      return fp.set("form2", form2, state);
    }
  },
  "effects": {

  }

}
