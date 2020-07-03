import { Headers, BaseApi } from '../../api/api';

export function getOrdersForDate(date) {
    const response = fetch(BaseApi + 'orders/singleDate/' + date, {
        headers: Headers
    })
    .then(res => res.json())
    return response;
}