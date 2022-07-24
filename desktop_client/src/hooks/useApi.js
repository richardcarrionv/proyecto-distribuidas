import {useEffect, useState} from 'react';
import api from "../services/api";


const useApi = (apiUrl,
                dataFormatterFunction = (data) => {
                    return data
                }) => {

    const [data, setData] = useState([])

    const getData = () => {
        api.get(apiUrl).then(response => {
            if (response.status === 200) {
                const responseData = dataFormatterFunction(response.data)
                setData(responseData);
            }
        })
    }

    useEffect(getData, [apiUrl])

    const create = (entity) => {
        api.post(apiUrl, entity).then(response => {
            if (response.status === 200) {
                getData();
            }
        })
    }

    const update = (entity) => {
        let url = `${apiUrl}/${entity.id}`
        api.put(url, entity).then(response => {
            if (response.status === 200) {
                getData();
            }
        })
    }

    const del = (id) => {
        let url = `${apiUrl}/${id}`
        return api.delete(url).then(response => {
            if (response.status === 200) {
                getData();
                return true;
            }
            return false;
        })
    }

    const findById = async (id) => {
        let url = `${apiUrl}/${id}`
        console.log(url)
        return await api.get(url);
    }

    return {data, create, update, del, findById}
}

export default useApi;