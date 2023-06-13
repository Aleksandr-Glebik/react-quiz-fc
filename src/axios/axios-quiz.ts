import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-fc-946b4-default-rtdb.firebaseio.com/'
})