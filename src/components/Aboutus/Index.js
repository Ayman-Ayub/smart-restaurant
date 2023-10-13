import React, { useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Shipment from './Shipment.js';
import Faq from './Faq.js';
import TermsandCondition from './TermsandCondition.js';
import Legal from './Legal.js';
import Cookiepolicy from './CookiePolicy.js';
import PrivacyPolicy from './PrivacyPolicy.js';
import { useParams } from 'react-router-dom';
import "../../styles/faq.css"
function Index() {
    const { staticpage } = useParams();
    const [view, setview] = useState(staticpage ? staticpage : 'faq');

    return (
        <div>
            <>
                <Container>
                    <Row className='flex flex-row'>
                        <Col className="bg-secondary mt-5 mb-3 w-[450px] h-[700px]" lg={5} id="faqbar">
                            <ListGroup className="border-top-0 border-bottom-0 List-group" id="">
                                <ListGroup.Item className="profileicon list-group-item">
                                    {' '}
                                    <a
                                        href="#faq"
                                        onClick={() => {
                                            setview('faq');
                                        }}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        {' '}
                                        FAQ
                                    </a>
                                </ListGroup.Item>
                                <ListGroup.Item className="profileicon list-group-item">
                                    {' '}
                                    <a
                                        href="#faq"
                                        onClick={() => {
                                            setview('termsAndConditions');
                                        }}
                                    >
                                        Terms & Condition
                                    </a>
                                </ListGroup.Item>
                                <ListGroup.Item className="profileicon list-group-item">
                                    {' '}
                                    <a
                                        href="#faq"
                                        onClick={() => {
                                            setview('legal');
                                        }}
                                    >
                                        Legal
                                    </a>
                                </ListGroup.Item>
                                <ListGroup.Item className="profileicon list-group-item">
                                    {' '}
                                    <a
                                        href="#faq"
                                        onClick={() => {
                                            setview('Cookiepolicy');
                                        }}
                                    >
                                        Cookie policy
                                    </a>
                                </ListGroup.Item>
                                <ListGroup.Item className="bidhistory border-bottom-0 list-group-item">
                                    {' '}
                                    <a
                                        href="#faq"
                                        onClick={() => {
                                            setview('privacyPolicy');
                                        }}
                                    >
                                        Privacy Policy
                                    </a>
                                </ListGroup.Item>
                                <ListGroup.Item className="profileicon list-group-item mb-20">
                                    {' '}
                                    <a
                                        // href="#shipment"
                                        onClick={() => {
                                            setview('shipment');
                                        }}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        {' '}
                                        Shipment
                                    </a>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col lg={8} className="m-10 w-[850px] " id="page">
                            {/* <Faq/> */}
                            {view === 'shipment' ? (
                                <Shipment />
                            ) : view === 'faq' ? (
                                <Faq />
                            ) : view === 'termsAndConditions' ? (
                                <TermsandCondition />
                            ) : view === 'legal' ? (
                                <Legal />
                            ) : view === 'Cookiepolicy' ? (
                                <Cookiepolicy />
                            ) : view === 'privacyPolicy' ? (
                                <PrivacyPolicy />
                            ) : (
                                <></>
                            )}
                        </Col>
                    </Row>
                </Container>
            </>
        </div>
    );
}

export default Index;
