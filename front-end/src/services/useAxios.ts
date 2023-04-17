import Axios from 'axios';

import {configure } from 'axios-hooks';

export {default as useAxios } from 'axios-hooks'

export const axios = Axios.create({
    baseURL: 'http://localhost:5000/'
})

configure({ axios })