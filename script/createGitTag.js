var spawn = require('child_process').spawn;
var config = require('../package.json');

const createTagTask = spawn('git', ['tag', config.version], {stdio: 'inherit'});

const onError = (err) => {
  console.error(err);
};

const publishTag = () => {
  console.info('create.git.tag - pushing all tags to remote repository');
  const publishTask = spawn('git', ['push', '--tags'], {stdio: 'inherit'});

  publishTask.on('error', onError);
  publishTask.on('close', () => {
    console.info(
      'create.git.tag - tag successfully pushed to remote repository',
    );
  });
};

createTagTask.on('close', publishTag);
createTagTask.on('error', (err) => {
  onError(err);
  publishTag();
});
