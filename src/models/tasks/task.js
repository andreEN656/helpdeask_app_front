import BaseModel from '../baseModel';

class Model extends BaseModel {
  constructor() {
    super();
    this.model = undefined;
    const Ctor = kendo.data.Model.define({
      id: 'id',
      fields: {
        id: { nullable: true, type: 'string' },
        statusId: { type: 'number' },
        statusName: { type: 'string' },
        priorityId: { type: 'number' },
        projectId: { type: 'number' },
        fromUserName: { type: 'string' },
        fromUserId: { type: 'string' },
        users: { nullable: false },
        comments: { nullable: true },
        name: { type: 'string' },
        description: { type: 'string' },
        finishDatetime: { type: 'string' },
      },
      reset: () => {
        $.extend(this, new Ctor().toJSON);
      },
    });

    super.setCtor(Ctor);
  }
}

export default new Model();
