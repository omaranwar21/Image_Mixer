import React from 'react'
import './Layout.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CropFirstImg from '../Crop/CropFirstImg'
import CropSecondImg from '../Crop/CropSecondImg'
import CropFirstMagPhase from '../Crop/CropFirstMagPhase';
import CropSecondMagPhase from '../Crop/CropSecondMagPhase';

const Layout = () => {
  return (
    <Container fluid>
        <Row>
            <Col md={8} style={{height:"100vh"}} >
              <Row>
            <Col md={6} style={{height:"50vh"}} >
            <CropFirstImg/>
            </Col>
            <Col md={6} style={{height:"50vh"}} >
            <CropFirstMagPhase/>
            </Col>
              </Row>
              <Row>
            <Col md={6} style={{height:"50vh"}} >
            <CropSecondImg/>
            </Col>
            <Col md={6} style={{height:"50vh"}} >
            <CropSecondMagPhase/>
            </Col>
              </Row>
            </Col>
            <Col md={4} style={{height:"100vh"}}>
          output
            </Col>
        </Row>
    </Container>
  )
}

export default Layout