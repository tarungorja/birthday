import React, { useEffect, useState } from 'react';
import { Accordion, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReleaseNotesHeader from '../layouts/ReleaseNotesHeader';
import { useError } from '../Contexts/ErrorContext';
import { AxiosError } from 'axios';
import { getReleaseNotes } from '../api/releaseNotesApi';

interface ReleaseNote {
    version: string;
    release_date: string;
    sprint_link: string;
    mini_notes: string[];
}

const ReleaseNotes = () => {
    const { showError } = useError();
    const [releaseNotes, setReleaseNotes] = useState<ReleaseNote[]>([]);
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const releaseNotes: ReleaseNote[] = await getReleaseNotes();
                setReleaseNotes(releaseNotes);
            } catch (ex) {
                showError(ex as AxiosError<IErrorResponse>);
            }
        };
        fetchNotes();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        const [month, day, year] = formattedDate.split(' ');
        return `${month} ${day} ${year}`;
    };
    return (
        <React.Fragment>
            <ReleaseNotesHeader />
            <div className='main main-app p-3 p-lg-3 ms-1'>
                <Row className='g-3'>
                    <Col>
                        <h2 className='main-title mb-3' style={{ fontSize: '30px' }}>
                            Release Notes
                        </h2>

                        <ul className='activity-group mb-5'>
                            {releaseNotes.map((releaseNote, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <li className='activity-date'>{formatDate(releaseNote.release_date)}</li>
                                        <li className='activity-item notes'>
                                            <Accordion defaultActiveKey='1' className='accordion-faq'>
                                                <Accordion.Item eventKey='0'>
                                                    <Accordion.Header>
                                                        <p className='d-sm-flex align-items-center mb-2'>
                                                            <Link to={`/release-notes/${releaseNote.version}`}>
                                                                Release Notes for the changes in {releaseNote.version}
                                                            </Link>
                                                            {releaseNote.sprint_link && (
                                                                <i
                                                                    className='ri-links-fill px-2'
                                                                    onClick={() =>
                                                                        window.open(releaseNote.sprint_link, '_blank')
                                                                    }
                                                                ></i>
                                                            )}
                                                        </p>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <ol>
                                                            {releaseNote.mini_notes.map((mini_note, index) => {
                                                                return <li key={index}>{mini_note}</li>;
                                                            })}
                                                        </ol>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </li>
                                    </React.Fragment>
                                );
                            })}
                        </ul>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default ReleaseNotes;
