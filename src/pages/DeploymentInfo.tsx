import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import ReleaseNotesHeader from '../layouts/ReleaseNotesHeader';
import GitInfo from 'react-git-info/macro';

const DeploymentInfo = () => {
    const gitInfo = GitInfo();
    console.log(gitInfo);
    return (
        <React.Fragment>
            <ReleaseNotesHeader />

            <div className='deployment-info'>
                <Card className=''>
                    <Card.Header>
                        <h1 className='header-logo mb-4'>Deployment Info</h1>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col xs='3' className=' text-secondary'>
                                Branch :
                            </Col>
                            <Col>{gitInfo.branch}</Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col xs='3' className=' text-secondary'>
                                Last Commit Id :
                            </Col>
                            <Col>{gitInfo.commit.hash}</Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col xs='3' className=' text-secondary'>
                                Last Commit Time :
                            </Col>
                            <Col>{gitInfo.commit.date}</Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </React.Fragment>
    );
};

export default DeploymentInfo;
