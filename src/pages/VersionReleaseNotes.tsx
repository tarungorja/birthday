import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Accordion, Card, Col, Row } from 'react-bootstrap';
import ReleaseNotesHeader from '../layouts/ReleaseNotesHeader';
import { getReleaseNotes } from '../api/releaseNotesApi';
import { useError } from '../Contexts/ErrorContext';
import { AxiosError } from 'axios';

interface versionReleaseNote {
    version: string;
    release_date: string;
    sprint_link: string;
    mini_notes: string[];
    ui_notes?: UINotes;
    backend_notes?: BackendNotes;
}

interface UINotes {
    new_features?: Record<string, string>;
    enhancements?: Record<string, string>;
    bug_fixes?: Record<string, string>;
}

interface BackendNotes {
    new_apis?: Record<string, string>;
    enhancements?: Record<string, string>;
    bug_fixes?: Record<string, string>;
}
const VersionReleaseNotes = () => {
    const { version } = useParams();
    const { showError } = useError();

    const [versionReleaseNotes, setVersionReleaseNotes] = useState<versionReleaseNote>();
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const versionReleaseNotes: versionReleaseNote[] = await getReleaseNotes(version);
                setVersionReleaseNotes(versionReleaseNotes[0]);
            } catch (ex) {
                showError(ex as AxiosError<IErrorResponse>);
            }
        };
        fetchNotes();
    }, []);
    return (
        <React.Fragment>
            <ReleaseNotesHeader />
            <div className='main main-app p-3 p-lg-3 ms-1'>
                <Row className='g-3'>
                    <Col>
                        {versionReleaseNotes?.ui_notes && (
                            <h2 className='main-title mb-3' style={{ fontSize: '30px' }}>
                                Release Notes For {version} (UI)
                            </h2>
                        )}

                        <Accordion defaultActiveKey='0' className='accordion-faq'>
                            {versionReleaseNotes?.ui_notes &&
                                Object.entries(versionReleaseNotes?.ui_notes).map(([key, value], index) => {
                                    return (
                                        <Accordion.Item eventKey={`${index}`} key={index}>
                                            <Accordion.Header>{key}</Accordion.Header>
                                            {value &&
                                                Object.entries(value).map(([subKey, subValue], subIndex) => {
                                                    return (
                                                        <Accordion.Body key={subIndex}>
                                                            <Card className='card-one feed-list mb-1'>
                                                                <Card.Header className='d-block'>
                                                                    <Card.Title as='h6'>{subKey}</Card.Title>
                                                                </Card.Header>
                                                                <Card.Body>{subValue as string}</Card.Body>
                                                            </Card>
                                                        </Accordion.Body>
                                                    );
                                                })}
                                        </Accordion.Item>
                                    );
                                })}
                        </Accordion>
                    </Col>
                </Row>
                <Row className='g-3 mt-3'>
                    <Col>
                        {versionReleaseNotes?.backend_notes && (
                            <h2 className='main-title mb-3' style={{ fontSize: '30px' }}>
                                Release Notes For {version} (Backend Service)
                            </h2>
                        )}

                        <Accordion defaultActiveKey='0' className='accordion-faq'>
                            {versionReleaseNotes?.backend_notes &&
                                Object.entries(versionReleaseNotes?.backend_notes).map(([key, value], index) => {
                                    return (
                                        <Accordion.Item eventKey={`${index}`} key={index}>
                                            <Accordion.Header>{key}</Accordion.Header>
                                            {value &&
                                                Object.entries(value).map(([subKey, subValue], subIndex) => {
                                                    return (
                                                        <Accordion.Body key={subIndex}>
                                                            <Card className='card-one feed-list mb-1'>
                                                                <Card.Header className='d-block'>
                                                                    <Card.Title as='h6'>{subKey}</Card.Title>
                                                                </Card.Header>
                                                                <Card.Body>{subValue as string}</Card.Body>
                                                            </Card>
                                                        </Accordion.Body>
                                                    );
                                                })}
                                        </Accordion.Item>
                                    );
                                })}
                        </Accordion>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default VersionReleaseNotes;
