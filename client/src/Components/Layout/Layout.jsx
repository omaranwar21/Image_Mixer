import React from 'react'
import './Layout.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CropFirstImg from '../Crop/OriginFirst/CropFirstImg'
import CropSecondImg from '../Crop/OriginSecond/CropSecondImg'
import CropFirstMagPhase from '../Crop/First_Mag&phase/CropFirstMagPhase';
import CropSecondMagPhase from '../Crop/Second_Mag&phase/CropSecondMagPhase';
import Result from '../Crop/Result/Result';

const Layout = () => {
  return (
    <Container fluid>
        <Row>
            <Col xs={12} sm={12} md={8} style={{height:"100vh"}}>
              <Row>
                <Col xs={12} sm={12} md={6} style={{height:"50vh"}} >
                  <CropFirstImg/>
                </Col>
                <Col xs={12} sm={12} md={6} style={{height:"50vh"}} >
                  <CropFirstMagPhase/>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={6} style={{height:"50vh"}} >
                  <CropSecondImg/>
                </Col>
                <Col xs={12} sm={12} md={6} style={{height:"50vh"}} >
                  <CropSecondMagPhase/>
                </Col>
              </Row>
            </Col>
            <Col xs={12} sm={12} md={4} style={{height:"100vh"}}>
              <Result/>
            </Col>
        </Row>
    </Container>
  )
}

export default Layout