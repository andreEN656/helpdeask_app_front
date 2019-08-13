import BaseModel from '../baseModel';

class Model extends BaseModel {
  constructor() {
    super();
    const Ctor = kendo.data.Model.define({
      id: 'id',
      fields: {
        id: { type: 'string' },
        name: { type: 'string' },
        attribute01: { type: 'string' },
      },
      reset: () => {
        $.extend(this, new Ctor().toJSON);
      },
    });

    super.setCtor(Ctor);
  }
}

export default new Model();
