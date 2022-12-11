import React from 'react'
import { Button } from 'antd';
// import axios from 'axios'
export default function Home() {

    const ajax = ()=>{
        //取数据  get
        // axios.get("http://localhost:8000/posts/2").then(res=>{
        //     console.log(res.data)
        // })

        // 增  post
        // axios.post("http://localhost:8000/posts",{
        //     title:"33333",
        //     author:"xiaoming"
        // })

        // 更新 put

        // axios.put("http://localhost:8000/posts/1",{
        //     title:"1111-修改"
        // })

        // 更新 patch
        // axios.patch("http://localhost:8000/posts/1",{
        //     title:"1111-修改-11111"
        // }) 

        // 删除  delete
        // axios.delete("http://localhost:8000/posts/1")
    
        // _embed
        // axios.get("http://localhost:8000/posts?_embed=comments").then(res=>{
        //     console.log(res.data)
        // })

        // _expand
        // axios.get("http://localhost:8000/comments?_expand=post").then(res=>{
        //     console.log(res.data)
        // })
    }
    return (
        <div>
            <Button type="primary" onClick={ajax}>Button</Button>
        </div>
    )
}
