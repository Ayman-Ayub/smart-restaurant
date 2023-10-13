import React, { useState } from 'react';
// import "./style.css";
// import Faq from "react-faq-component";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";


const Faq = () => {
    return (
        <>
         <Accordion className='mb-6'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography
            style={{
              fontWeight: 16,
            }}
          >
            Accordion Demo
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Greetings of the day :)</Typography>
        </AccordionDetails>
      </Accordion>
            <Accordion defaultActiveKey="0">
            <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography
            style={{
              fontWeight: 10,
            }}
          >
            Accordion Demo
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Greetings of the day :)</Typography>
        </AccordionDetails>
              
            </Accordion>
            {/* <Row className="d-grid gap-3">
                    <Col className="d-grid gap-3">
                        <Row>
                            <QuestAnswer
                                question="Why do we maek it?"
                                answer=" dfjkladfjalkdjafljaljaslkdjsaldkjsald"
                            />
                        </Row>

                        <Row>
                            <QuestAnswer
                                question="Why do we not going there?"
                                answer=" dfjkladfjalkdjafljaljaslkdjsaldkjsald"
                            />
                        </Row>
                        <Row>
                            <QuestAnswer
                                question="Why do we not going there?"
                                answer=" dfjkladfjalkdjafljaljaslkdjsaldkjsald"
                            />
                        </Row>
                        <Row>
                            <QuestAnswer
                                question="Why do we not going there?"
                                answer=" dfjkladfjalkdjafljaljaslkdjsaldkjsald"
                            />
                        </Row>
                        <Row>
                            <QuestAnswer
                                question="Why do we not going there?"
                                answer=" dfjkladfjalkdjafljaljaslkdjsaldkjsald"
                            />
                        </Row>
                        <Row>
                            <QuestAnswer
                                question="Why do we not going there?"
                                answer=" dfjkladfjalkdjafljaljaslkdjsaldkjsald"
                            />
                        </Row>
                        <Row>
                            <QuestAnswer
                                question="Why do we not going there?"
                                answer=" dfjkladfjalkdjafljaljaslkdjsaldkjsald"
                            />
                        </Row>
    </Col> */}
        </>
    );
};

export default Faq;
