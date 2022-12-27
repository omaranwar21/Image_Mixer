import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CropFirstImg from '../Crop/CropFirstImg'
import CropSecondImg from '../Crop/CropSecondImg'

const Layout = () => {
  return (
    <Container fluid>
        <Row>
            <Col>
            <CropFirstImg/>
            </Col>
            <Col>
            <CropSecondImg/>
            </Col>
        </Row>
    </Container>
  )
}

export default Layout