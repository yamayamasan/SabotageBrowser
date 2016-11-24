'use strict';

const gulp = require('gulp');
const packager = require('electron-packager');
const execSync = require('child_process').execSync;

const APP_NAME = 'SabotageBrowser';
const SRC_DIR = './';
const RELEASE_DIR = 'release';

gulp.task('package', ['win32', 'darwin', 'linux'].map((platform) => {
  const taskName = `package:${platform}`;
  const ver = getElectronVersion();

  gulp.task(taskName, (done) => {
    packager({
      dir: SRC_DIR,
      out: `${RELEASE_DIR}/${platform}`,
      name: APP_NAME,
      arch: 'x64',
      platform: platform,
      version: ver
    }, (err, path) => {
      if (err) console.error(err);
      done();
    });
  });
  return taskName;
}));

function getElectronVersion() {
  const ver = execSync('electron -v');
  return ver.toString().replace(/^v/, '').trim();
};
