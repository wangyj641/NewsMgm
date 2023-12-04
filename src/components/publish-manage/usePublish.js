import { useEffect, useState } from 'react'
import axios from 'axios'
import { notification } from 'antd'

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
    }, [username, type])


    const handlePublish = (id) => {
        console.log('Publish ' + id)

        setDataSource(dataSource.filter(data => data.id !== id))
        axios.patch(`/news/${id}`, {
            publishState: 2,
            "publishTime": Date.now()
        }).then(res => {
            notification.info({
                message: "Note",
                description: `You have publish this news`,
                placement: "bottomRight",
            })
        })
    }

    const handleSunset = (id) => {
        console.log('Sunset ' + id)

        setDataSource(dataSource.filter(data => data.id !== id))
        axios.patch(`/news/${id}`, {
            publishState: 3
        }).then(res => {
            notification.info({
                message: "Note",
                description: `You have sunset this news`,
                placement: "bottomRight",
            })
        })
    }

    const handleDelete = (id) => {
        console.log('Delete ' + id)

        setDataSource(dataSource.filter(data => data.id !== id))
        axios.delete(`/news/${id}`).then(res => {
            notification.info({
                message: "Note",
                description: `You have deleted this news`,
                placement: "bottomRight",
            })
        })
    }

    return {
        dataSource,
        handlePublish,
        handleSunset,
        handleDelete
    }
}
