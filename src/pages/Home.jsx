import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Typography, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCTS } from "../utils/Endpoint";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Home = () => {
    const [products, setProducts] = useState([]);

    // fetch data saat halaman keload
    useEffect(() => {
        axios
            .get(URL_PRODUCTS)
            .then((res) => {
                console.log("res", res.data);
                setProducts(res.data); // simpan data ke state
            })
            .catch((err) => {
                console.log(err)
                message.error("Gagal mengambil data produk");
            })
    }, [])

    //untuk menghandle klik "add to cart"
    const handleAddToCart = (product) => {
        message.success('Produk ditambahkan ke keranjang: ' + product.name);
    }

    return (
        <div style={{ padding: '20px'}}>
            <Title level={2}>Produk List</Title>
            <Row gutter={[16, 16]}>
                {products.map((product) => (
                    <Col span={8} key={product.id}>
                        <Card
                            hoverable
                            cover={<img alt={product.name} src={product.thumbnail} />}>                  
                                <Card.Meta
                                    title={product.name}
                                    description={`Rp ${product.price}`} 
                                />  
                                <Button
                                    type="primary"
                                    icon={<ShoppingCartOutlined />}
                                    style={{ marginTop: '10px' }}
                                >
                                    <Link to={`/checkout/${product._id}`}>CHeckout Now</Link>
                                </Button>     
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Home;