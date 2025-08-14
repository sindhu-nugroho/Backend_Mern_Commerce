import React, { useState } from "react";
import { Form, Input, Button, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCTS } from "../../utils/Endpoint";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        setLoading

        console.log("values", values);
        const data = new FormData();
        data.append("name", values.name);
        data.append("price", values.price);
        data.append("thumbnail", fileList[0]?.originFileObj);

        try{
            await axios.post(URL_PRODUCTS, data,);
            message.success("Product created successfully");
            form.resetFields();
            setFileList([]);
            navigate("/dashboard/products");
        } catch (error) {
            message.error("Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    // Handle file upload change
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    return (
        <div>
            <h1>Add Product</h1>
            <Form
                form={form}
                layout='vertical'
                onFinish={handleSubmit}
                initialValues={{
                    category: "electronics",
                }}>
                <Form.Item
                    name='name'
                    label='Product Name'
                    rules={[{ required: true, message: "Please input product name!" }]}>
                    <Input placeholder='Enter product name' />
                </Form.Item>
                
                <Form.Item
                    name='price'
                    label='Price'
                    rules={[{ required: true, message: "Please input product price!" }]}>
                    <Input type='number' placeholder='Enter product price' />
                </Form.Item>

                <Form.Item
                    name='thumbnail'
                    label='Thumbnail'
                    valuePropName="fileList" 
                    getValueFromEvent={({ fileList }) => fileList}
                    rules={[{ required: true, message: "Please upload product thumbnail!" }]}>
                        <Upload
                            action={'/upload'}
                            listType='picture'
                            fileList={fileList}
                            onChange={handleChange}
                            beforeUpload={() => false} // Prevent auto upload
                            maxCount={1}>
                            <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
                        </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={loading}>
                        Add Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddProduct;