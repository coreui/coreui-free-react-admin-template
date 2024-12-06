import axios from 'axios';  

export let baseUrl = '';
await fetch('connection.json')
    .then(response => response.json())
    .then(data => {
        const baseUrl = data.apiUrl 
        console.log(baseUrl);
    }
    )
    .catch(err => console.log(err));


export const getCustomerList = async () => {
    return await axios({
        method: "GET",
        url: `${baseUrl}/Customer/List`,
    })

}
