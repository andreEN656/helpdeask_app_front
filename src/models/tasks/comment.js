import BaseModel from '../baseModel';

class Model extends BaseModel {
  constructor() {
    super();
    this.model = undefined;
    const Ctor = kendo.data.Model.define({
      id: 'id',
      fields: {
        id: { nullable: true, type: 'number' },
        taskId: { type: 'number' },
        text: { type: 'string' },
        userId: { nullable: true, type: 'string' },
        userName: { nullable: true, type: 'string' },
        datetime: { nullable: false },
      },
      reset: () => {
        $.extend(this, new Ctor().toJSON);
      },
    });

    super.setCtor(Ctor);
  }
}

export default new Model();
