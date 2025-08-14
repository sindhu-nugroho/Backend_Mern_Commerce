import React, { use, useEffect, useState } from 'react';
import { Form, Input, Button, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { URL_PRODUCTS } from '../../utils/Endpoint';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const UpdateProduct = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const params = useParams();

    const { id } = params;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios
            .get(`${URL_PRODUCT}/${id}`)
            .then((res) => {
                console.log(res);
                setProduct(res.data);
                form.setFieldsValue({
                    name: res.data.name,
                    price: res.data.price,
                });

                // mengatur thumnail saat ini
                if (res.data.thumbnail) {
                    setFileList([
                        {
                            uid: '-1',
                            name: 'thumbnail.jpg',
                            status: 'done',
                            url: res.data.thumbnail,
                        },
                    ]);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const navigate = useNavigate();

    // untuk menampilkan submit form
    const handleSumbit = async (values) => {
        setLoading(true);

        console.log('values', values);
        const data = new FormData();
        data.append('name', values.name);
        data.append('price', values.price);

        // tambahkan data baru bila diunggah
        if (values.thumbnail !== undefined || values.thumbnail[0] !== undefined) {
            data.append('thumbnail', fileList[0].originFileObj);
        }

        try {
            await axios.put(`${URL_PRODUCT}/${id}`, data);
            message.success('Product added successfully');
            form.resetFields();
            setFileList([]);
            navigate('/dashboard/products');
        } catch (error) {
        message.error('Failed to added product');
        } finally {
            setLoading(false);
        }
    };
    
    // fungsi untuk mengatur perubahan file
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    return (
        <div>
            <h1>Edit Product</h1>
            <Form
                form={form}
                layout='vertical'
                onFinish={handleSumbit}
                initialValues={{
                    category: 'electronics',
                }}>
                <Form.Item
                    name='name'
                    label='Product Name'
                    rules={[{ required: true, message: 'Please input product name!' }]}>
                    <Input placeholder='Enter product name' />
                </Form.Item>

                <Form.Item
                    name='price'
                    label='Price'
                    rules={[{ required: true, message: 'Please input product price!' }]}>
                    <Input type='number' placeholder='Enter product price' />
                </Form.Item>

                <Form.Item
                    name='thumbnail'
                    label='Thumbnail'
                    valuePropName='fileList'
                    getValueFromEvent={({ fileList }) => fileList}
                    rules={[{ required: false, message: 'Please upload product thumbnail!' }]}>
                        <p>
                            Current:{ ' ' }
                            {product?.thumbnail ? (
                                <a href="{product.thumbnail}">{product.thumbnail}</a>
                            ) : (
                                'No thumbnail uploaded'
                            )}
                        </p>
                        <Upload
                            action='/upload'
                            listType='picture'
                            valuePropName='fileList'
                            getValueFromEvent={({ fileList }) => fileList}
                            rules={[{ required: false, }]}
                            maxCount={1}>
                                <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' loading={loading}>
                            Edit Product
                        </Button>
                    </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateProduct;