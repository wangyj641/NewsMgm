import { useEffect, useState } from 'react'
import axios from 'axios'

export default function usePublish(type) {
    const [dataSource, setDataSource] = useState([])
    const { username } = JSON.parse(localStorage.getItem("token"))

    useEffect(() => {
        axios(`/news?author=${username}&publishState=${type}&_expand=category`).then(
            res => {
                console.log(res.data)
                setDataSource(res.data)
            }
        )
    }, [username])


    const handlePublish = (id) => {
        console.log('Publish ' + id)

    }

    const handleSunset = (id) => {

    }

    const handleDelete = (id) => {

    }

    return {
        dataSource,
        handlePublish,
        handleSunset,
        handleDelete
    }
}
