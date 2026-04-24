import http from 'k6/http';
import { sleep } from 'k6';

const BASE_URL = 'http://localhost:3000/api/v1';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  http.get(`${BASE_URL}/incident?page=1&limit=10&sortBy=createdAt&sortOrder=DESC`);
  sleep(1);
}