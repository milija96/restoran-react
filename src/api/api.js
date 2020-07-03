export const BaseApi = 'https://biber-so.herokuapp.com/webapi/';
export const Headers = {
    'Accept': 'application/json',
    'Content-type': 'application/json',
    'Authorization': localStorage.getItem('token')
}