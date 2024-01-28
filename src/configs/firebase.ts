import * as dotenv from 'dotenv';

dotenv.config();

export const firebaseConfig = {
  storageBucket: process.env.STORAGE_BUCKET,
};
