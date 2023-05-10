import dotenv from "dotenv";

dotenv.config();

const apiUrl = process.env.API_URL;
const wsUrl = process.env.WS_URL;

export default ({ config }) => {
  return Object.assign(config, {
    extra: {
      apiUrl,
      wsUrl,
    },
  });
};
