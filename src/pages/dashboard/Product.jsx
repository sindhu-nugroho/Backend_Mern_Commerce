import React, { useEffect, useState } from "react";
import { Table, Button, Image, Popconfirm, message } from "antd";
import axios from "axios";
import {URL_PRODUCTS} from "../../utils/Endpoint";
import { data, Link } from "react-router-dom";
import { use } from "react";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // added function to delete product
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL_PRODUCTS}/${id}`);
            message.success('product deleted succesfully');
            setProducts(products.filter((item) => item._id !== id));
        } catch (err) {
            message.error("Failed to delete product");
        }
    }

    useEffect(() => {
        setLoading(true);
        axios
            .get(URL_PRODUCTS)
            .then((res) => {
                console.log("res", res.data);
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => { 
                console.log(err.response);
                setLoading(false);
            });
    }, []);
    

    // kolom untuk tabel
    const columns = [
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            render: (_, record) => {
                console.log("recor", record);
                return <Image src={record?.thumbnail} width={100} loading='lazy' />
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Update',
            key: 'update',
            render: (_, record) => (
                <>
                    <Button>
                        <Link to={`/dashboard/products/${record?._id}`}>Update</Link>
                    </Button>
                </>
            ),
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (_, record) => (
                <Popconfirm
                    title="Are you sure to delete this product"
                    onConfirm={() => handleDelete(record._id)}
                    okText='Yes'
                    cancelText='No'
                >
                    <Button danger type='primary'>Delete</Button>
                </Popconfirm>
            )
        }
    ];

    return (
        <div>
            <h1>List Product</h1>
            <Table
                dataSource={products}    
                columns={columns}
                rowKey="_id"
                loading={loading}
            />
            <Link to='/dashboard/products/create'>
                <Button type='primary'>Tambah</Button>
            </Link>
        </div>
    )
}

export default Product;