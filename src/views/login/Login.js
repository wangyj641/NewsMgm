import React from 'react'
import { Form, Button, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import Particles from 'react-particles'
import axios from 'axios'

export default function Login(props) {

    const onFinish = (values) => {
        console.log(values)
        axios.get(`/users?username=${values.username}&password=${values.password}&rolestate=true&_expand=role`).then
        (res=>{
            console.log(res.data)
            if(res.data.length===0){
                message.error("Wrong username or password")
            }else{
                localStorage.setItem("token", JSON.stringify(res.data[0]))
                console.log("-------------" + JSON.stringify(res.data[0]))
                props.history.push("/")
            }
        })
    }
    return (
        <div style={{ background: 'rgb(35, 39, 65)', height: "100%", overflow: 'hidden' }}>

            <Particles height={document.documentElement.clientHeight}/>

            <div className="formContainer">
                <div className="logintitle">全球新闻发布管理系统</div>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                     </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
