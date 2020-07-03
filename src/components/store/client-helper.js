import { Headers, BaseApi } from '../../api/api';
export function orderMeal(props) {
  fetch(BaseApi + 'orders/list', {
    method: 'POST',
    headers: Headers,
    body: JSON.stringify(props),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch(console.log);
}
