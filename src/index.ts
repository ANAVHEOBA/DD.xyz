import app from './app';
import { environment } from './config/environment';
import { connectDatabase } from './config/database';

const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();

    // Start server
    app.listen(environment.port, () => {
      console.log(`Server is running on port ${environment.port}`);
      console.log(`Environment: ${environment.nodeEnv}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
}); 