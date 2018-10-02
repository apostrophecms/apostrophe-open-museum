const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const OPTS = {
  best : {
    level: zlib.Z_BEST_COMPRESSION,
    memLevel: zlib.Z_BEST_COMPRESSION
  },
  fast : {
    level: zlib.Z_BEST_SPEED,
    memLevel: zlib.Z_BEST_SPEED
  }
};

module.exports = (file, overwrite = false, mode = 'best', done = () => {}) => {
  if (!fs.existsSync(file)) {
    throw new Error(`File ${file} doesn't exist.`);
  }

  let gzFile = `${file}.gz`;
  if (overwrite && typeof overwrite === 'string') {
    gzFile = overwrite;
    overwrite = false;
  }

  const filePath = path.resolve(file);
  const gzFilePath = path.resolve(gzFile);

  try {
    let optMode = mode === 'fast' ? 'fast' : 'best';
    let gzOption = OPTS[optMode];
    let gzip = zlib.createGzip(gzOption);

    const inputStream = fs.createReadStream(filePath);
    const outStream = fs.createWriteStream(gzFilePath);

    inputStream.pipe(gzip).pipe(outStream);

    var gzipDone = () => {
      if (overwrite) {
        fs.unlinkSync(filePath);
        fs.renameSync(gzFilePath, filePath);
      }
      done();
    }

    if (outStream && typeof done === 'function') {
      outStream.on('finish', gzipDone);
    } else {
      gzipDone();
    }
  } catch (e) {
    if (!overwrite && fs.existsSync(gzFilePath)) {
      fs.unlinkSync(gzFilePath);
    }
    throw new Error(e);
  }
};
