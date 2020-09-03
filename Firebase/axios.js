import axios from 'axios'
const instance=axios.create({
    baseURL:'https://mygovernmentapp-84d07.firebaseio.com/'
})
export default instance