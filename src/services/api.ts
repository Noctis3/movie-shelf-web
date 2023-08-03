import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;
const OPENAI_BASE_URL = process.env.REACT_APP_OPENAI_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

const openai = axios.create({
  baseURL: OPENAI_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${OPENAI_KEY}`,
  },
});

export { api, openai };
