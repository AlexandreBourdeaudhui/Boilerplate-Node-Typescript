/*
 * Package Import
 */
import mongoose from 'mongoose';
import debug from 'debug';

/*
 * Local Import
 */

/*
 * Init
 */
const logInfo = debug('{{ProjectName}}:info');
const logErr = debug('{{ProjectName}}:error');

// Mongoose
const uri = process.env.MONGO_URI;
console.log({ uri });

/*
 * Code
 */

// Mongoose options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  keepAlive: true,
  socketTimeoutMS: 0,
};

// Tell Mongoose to use ES6 promises
(mongoose as any).Promise = global.Promise;

/*
 * Database Mongoose
 */
const connectDatabase = () => {
  // Create the database connection
  mongoose.connect(uri, options as mongoose.ConnectionOptions);

  // Event : {Open}
  mongoose.connection.once('open', () => {
    logInfo(`Mongoose is running to URI ${uri}`);
  });

  // Event : {Reconnected}
  mongoose.connection.on('reconnected', () => {
    logInfo('reconnected');
  });

  // Event : {Error}
  mongoose.connection.on('error', (error: { message: string }) => {
    logErr('Impossible to connect at the Database.');
    if (
      error.message &&
      error.message.match(/failed to connect to server .* on first connect/)
    ) {
      logErr(`Error: ${error}`);
      logErr('Please check if your MongoDB is correctly connected');
      logErr('Retrying first connect in 30 seconds');

      // Wait for a bit,
      setTimeout(() => {
        // Try to connect again
        logInfo('Retrying first connect...');
        mongoose
          .connect(uri, options as mongoose.ConnectionOptions)
          .catch(() => {});
      }, 30000);
    } else {
      // Some other error occurred, log it
      logErr(`Error: ${error}`);
    }
  });

  // Event : {Disconnected}
  mongoose.connection.on('disconnected', () => {
    logInfo('Mongoose is disconnected');
  });
};

/*
 * Export
 */
export default connectDatabase;
