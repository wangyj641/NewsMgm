import React, { useState, useEffect, useRef } from 'react'
import { Button, Table, Modal, Switch } from 'antd'
import axios from 'axios'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import UserForm from '../../../components/user-manage/UserForm'
const { confirm } = Modal

export default function UserList() {
    const [dataSource, setdataSource] = useState([])
    const [isAddVisible, setisAddVisible] = useState(false)
    const [isUpdateVisible, setisUpdateVisible] = useState(false)
    const [roleList, setroleList] = useState([])
    const [regionList, setregionList] = useState([])
    const [current, setcurrent] = useState(null)

    const [isUpdateDisabled, setisUpdateDisabled] = useState(false)
    const addForm = useRef(null)
    const updateForm = useRef(null)

    const { roleId, region, username } = JSON.parse(localStorage.getItem("token"))

    useEffect(() => {
        axios.get("/users?_expand=role").then(res => {
            const roleObj = {
                "1": "superadmin",
                "2": "admin",
                "3": "editor"
            }
            const list = res.data
            setdataSource(roleObj[roleId] === "superadmin" ? list : [
                ...list.filter(item => item.username === username),
                ...list.filter(item => item.region === region && roleObj[item.roleId] === "editor")]
            )
        })
    }, [roleId, username, region])

    useEffect(() => {
        axios.get("/regions").then(res => {
            const list = res.data
            setregionList(list)
        })
    }, [])

    useEffect(() => {
        axios.get("/roles").then(res => {
            const list = res.data
            setroleList(list)
        })
    }, [])

    const columns = [
        {
            title: 'Region',
            dataIndex: 'region',
            filters: [
                ...regionList.map(item => ({
                    text: item.title,
                    value: item.value
                })),
                {
                    text: "Global",
                    value: "global"
                }

            ],

            onFilter: (value, item) => {
                if (value === "global") {
                    return item.region === ""
                }
                return item.region === value
            },

            render: (region) => {
                return <b>{region === "" ? 'Global' : region}</b>
            }
        },
        {
            title: 'Role Name',
            dataIndex: 'role',
            render: (role) => {
                return role?.roleName
            }
        },
        {
            title: "User Name",
            dataIndex: 'username'
        },
        {
            title: "User State",
            dataIndex: 'roleState',
            render: (roleState, item) => {
                return <Switch checked={roleState} disabled={item.default} onChange={() => handleChange(item)}></Switch>
            }
        },
        {
            title: "Operation",
            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} disabled={item.default} />

                    <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.default} onClick={() => handleUpdate(item)} />
                </div>
            }
        }
    ];

    const handleUpdate = (item) => {
        setTimeout(() => {
            setisUpdateVisible(true)
            if (item.roleId === 1) {
                setisUpdateDisabled(true)
            } else {
                setisUpdateDisabled(false)
            }
            updateForm.current.setFieldsValue(item)
        }, 0)

        setcurrent(item)
    }

    const handleChange = (item) => {
        // console.log(item)
        item.roleState = !item.roleState
        setdataSource([...dataSource])

        axios.patch(`/users/${item.id}`, {
            roleState: item.roleState
        })
    }

    const confirmMethod = (item) => {
        confirm({
            title: 'Are you sure to delete it?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',
            onOk() {
                //   console.log('OK');
                deleteMethod(item)
            },
            onCancel() {
                //   console.log('Cancel');
            },
        });

    }
    //删除
    const deleteMethod = (item) => {
        // console.log(item)
        setdataSource(dataSource.filter(data => data.id !== item.id))
        axios.delete(`/users/${item.id}`)
    }

    const addFormOK = () => {
        addForm.current.validateFields().then(value => {
            // console.log(value)

            setisAddVisible(false)

            addForm.current.resetFields()
            //post到后端，生成id，再设置 datasource, 方便后面的删除和更新
            axios.post(`/users`, {
                ...value,
                "roleState": true,
                "default": false,
            }).then(res => {
                console.log(res.data)
                setdataSource([...dataSource, {
                    ...res.data,
                    role: roleList.filter(item => item.id === value.roleId)[0]
                }])
            })
        }).catch(err => {
            console.log(err)
        })
    }

    const updateFormOK = () => {
        updateForm.current.validateFields().then(value => {
            // console.log(value)
            setisUpdateVisible(false)

            setdataSource(dataSource.map(item => {
                if (item.id === current.id) {
                    return {
                        ...item,
                        ...value,
                        role: roleList.filter(data => data.id === value.roleId)[0]
                    }
                }
                return item
            }))
            setisUpdateDisabled(!isUpdateDisabled)

            axios.patch(`/users/${current.id}`, value)
        })
    }

    return (
        <div>
            <Button type="primary" onClick={() => {
                setisAddVisible(true)
            }}>Add User</Button>
            <Table dataSource={dataSource} columns={columns}
                pagination={{
                    pageSize: 5
                }}
                rowKey={item => item.id}
            />

            <Modal
                visible={isAddVisible}
                title="Add User"
                okText="OK"
                cancelText="Cancel"
                onCancel={() => {
                    setisAddVisible(false)
                }}
                onOk={() => addFormOK()}
            >
                <UserForm regionList={regionList} roleList={roleList} ref={addForm}></UserForm>
            </Modal>

            <Modal
                visible={isUpdateVisible}
                title="Update User"
                okText="Update"
                cancelText="Cancel"
                onCancel={() => {
                    setisUpdateVisible(false)
                    setisUpdateDisabled(!isUpdateDisabled)
                }}
                onOk={() => updateFormOK()}
            >
                <UserForm regionList={regionList} roleList={roleList} ref={updateForm} isUpdateDisabled={isUpdateDisabled} isUpdate={true}></UserForm>
            </Modal>

        </div>
    )
}
