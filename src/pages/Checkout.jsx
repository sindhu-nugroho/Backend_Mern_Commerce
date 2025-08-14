import React, { useEffect, useState } from "react";
import {
    Card, 
    Button,
    Input,
    Form,
    Col,
    Row,
    Divider,
    message,
    Select,
} from "antd";
import {
    ShoppingCartOutlined,
    CreditCardOutlined,
    HomeOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCTS, URL_TRANSACTIONS } from "../utils/Endpoint";
import { useNavigate, useParams, Link } from "react-router-dom";

const { Option } = Select;

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState(null);
    const [midtransUrl, setMidtransUrl] = useState("");
    const [form] = Form.useForm();
    const params = useParams();
    const { id } = params;
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${URL_PRODUCTS}/${id}`)
            .then((res) => {
                console.log("res", res.data);
                setProducts(res.data);
                setMidtransUrl(res.data.midtransUrl);
            })
            .catch((err) => {
                console.error("err", err.response);
            });
        }, []);

        // Function to handle form submission
        const handleCheckout = (values) => {
            setLoading(true);
            console.log("values", values);
            console.log("midtransUrl", midtransUrl);

            const data = {
                first_name: values.first_name,
                amount: products.price,
            };
            axios
                .post(URL_TRANSACTIONS, data)
                .then((res) => {
                    console.log("res", res.data);
                    if (res.data.midtrans_url) {
                        window.location.href = res.data.midtrans_url;
                    }
                })
                .catch((err) => {
                    console.error("err", err.response);
                })
        };

        return (
            <div style={{ padding: "20px" }}>
                <h1>Checkout</h1>
                <Row gutter={16}>
                    {/* Card Produk */}
                    <Col span={18}>
                        <Card
                            title="Product Details"
                            variant={false}
                            style={{ width: "100%" }}
                            extra={<ShoppingCartOutlined />}>
                            <p>
                                <strong>Product Name:</strong> {products?.name}
                            </p>
                            <p>
                                <strong>Price:</strong> ${products?.price}
                            </p>
                            <Divider />
                            <p>
                                <strong>Total Amount:</strong> Rp {products?.price}
                            </p>
                        </Card>
                    </Col>

                    {/* Card Pembayaran */}
                    <Col span={6}>
                        <Card
                            title="Shipping & Payment"
                            bordered={false}
                            style={{ width: "100%" }}
                            extra={<CreditCardOutlined />}>
                                <Form
                                    form={form}
                                    layout='vertical'
                                    onFinish={handleCheckout}
                                    initialValues={{
                                        paymentMethod: "credit-card",
                                    }}>
                                        <Form.Item
                                            name="first_name"
                                            label="Your Name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please enter your name",
                                                },
                                            ]}>
                                            <Input placeholder="Enter your name" />
                                        </Form.Item>
                                    
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType='submit'
                                                block
                                                loading={loading}>
                                                Complete Checkout
                                            </Button>
                                        </Form.Item>
                                </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    };

    export default Checkout

