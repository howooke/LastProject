const CONFIG = {
  PORT: process.env.PORT,
  SALT_NUM: process.env.SALT_NUM,
  SECRET_KEY: process.env.SECRET_KEY,
  KAKAO_ID: process.env.KAKAO_ID,
  KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI,
  KAKAO_BASIC_PASSWORD: process.env.KAKAO_BASIC_PASSWORD,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  MONGO_URL: process.env.MONGO_URL,
  NODE_ENV: process.env.NODE_ENV || 'production',
  NODEMAILER_USER: process.env.NODEMAILER_USER,
  NODEMAILER_PASS: process.env.NODEMAILER_PASS,
};

module.exports = CONFIG;
