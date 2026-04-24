import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = 'http://localhost:3000/api/v1';
export const options = {
  vus: 10,
  duration: '30s',
};
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYiLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNzc3MDUwNzYzLCJleHAiOjE3NzcxMzcxNjN9.WMwI-GNdnTpwCATQUnunG681cmi87qikbt_6OXKq0MA';

export default function () {
  const res = http.get(
    `${BASE_URL}/incident?page=1&limit=10&sortBy=createdAt&sortOrder=DESC`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  );


  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}