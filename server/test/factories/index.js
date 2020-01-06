import requireAll from 'require-all';

class Factory {
  constructor() {
    this.factories = {};
  }

  define(name, model, attrs, opts = {}) {
    this.factories[name] = { model, attrs, opts };
  }

  async create(name, attrsIn = {}) {
    const {
      attrs,
      model,
      opts: { preCreate, postCreate },
    } = this.factories[name];

    let effectiveAttrs = Object.fromEntries(
      Object.entries({ ...attrs, ...attrsIn }).map(([key, value]) =>
        typeof value === 'function' ? [key, value()] : [key, value]
      )
    );

    if (preCreate) effectiveAttrs = await preCreate(effectiveAttrs);

    let obj = await model.create(effectiveAttrs);

    if (postCreate) obj = await postCreate(effectiveAttrs, obj);

    return obj;
  }
}

const factoryMemo = new Factory();

export const init = () => {
  requireAll({
    dirname: __dirname,
    filter: fileName => !fileName.includes('index'),
    resolve: ({ default: define }) => define(factoryMemo),
  });
};

export default factoryMemo;
