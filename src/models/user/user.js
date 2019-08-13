import BaseModel from '../baseModel';

class Model extends BaseModel {
  constructor() {
    super();
    this.model = undefined;
    const Ctor = kendo.data.Model.define({
      id: 'id',
      fields: {
        id: { type: 'string' },
        userName: { type: 'string', nullable: false },
        email: { type: 'string', nullable: false },
        phone: { type: 'string', nullable: false },
        fullName: { type: 'string' },
        role: { nullable: false, defaultValue: { id: null, name: null } },
        publicEmail: { type: 'string' },
        description: { type: 'string' },
        chiefName: { type: 'string' },
        password: { type: 'string' },
        passwordConfirm: {
          type: 'string',
        },
        isLocked: { type: 'boolean' },
      },
      reset: () => {
        $.extend(this, new Ctor().toJSON);
      },
    });

    super.setCtor(Ctor);
  }
}

export default new Model();
