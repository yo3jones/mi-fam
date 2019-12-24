import { connect } from './models';

const init = async () => {
  await connect();
};

init()
  .then(() => {
    console.log('started');
  })
  .catch(err => console.log(err));
