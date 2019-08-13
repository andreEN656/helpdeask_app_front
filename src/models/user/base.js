import BaseModel from '../baseModel';

class Model extends BaseModel {
  constructor() {
    super();
    const Ctor = kendo.data.Model.define({
      id: 'id',
      fields: {
        id: { type: 'string' },
        userName: { type: 'string' },
        password: { type: 'string' },
      },
      reset: () => {
        $.extend(this, new Ctor().toJSON);
      },
    });

    super.setCtor(Ctor);
  }
}

export default new Model();
