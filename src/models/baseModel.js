class BaseMode {
  constructor() {
    // this.setCtor = this.setCtor;
    // this.create = this.create;
    // this.get = this.get;
    // this.initFromObject = this.initFromObject;
    // this.getSchema = this.getSchema;
    this.Ctor = null;
  }

  // Передача конструктора прототипу
  setCtor(obj) {
    this.Ctor = obj;
  }

  // Создание модели
  create() {
    this.model = new this.Ctor();
    return this.model;
  }

  //клонирование объекта
  clone(obj) {
    this.model = new this.Ctor();
    const returnObj = this.model;
    Object.keys(obj).forEach((item) => {
      if (item !== 'uid' && item !== 'id'
        && item !== '_events' && item !== '_handlers'
        && item !== 'parent' && item !== '__proto__') {
        returnObj[item] = obj[item];
      }
    });
    return this.model;
  }

  // Получение модели
  get() {
    return this.model;
  }

  // Инициализация из json-объекта
  initFromObject(obj) {
    // С этой строкой не заполняются нормально массивы потому
    // что каждый раз ссылка идет на ту же модель
    // if (this.model === undefined)
    this.model = new this.Ctor();
    const returnObj = this.model;
    Object.keys(obj).forEach((item) => {
      returnObj[item] = obj[item];
    });
    return this.model;
  }

  // Возвращает конструктор объекта
  getSchema() {
    return this.Ctor;
  }
}

export default BaseMode;
