import React from 'react';
import Header from '../../layouts/Header';
import { Button, Card, Col, Dropdown, Row, Table } from 'react-bootstrap';
import Avatar from '../common/Avatar';
import qrImg from '../../assets/svg/qr-code.svg';
import bImg from '../../assets/img/battery-icon.png';
import { Link } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import IAucPageProps from '../../interfaces/AUCPage';
import { pdfjs } from 'react-pdf';
import SpinnerLoader from '../common/SpinnerComponent';

const AUCPage = (props: IAucPageProps) => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
    const {
        downloadAUCPdf,
        generateNewAUC,
        aucPdfList,
        pdfFileContent,
        openViewPage,
        batteryMeta,
        isOverlayOpen,
        openOverlay,
        closeOverlay,
        generatingAUC,
        openUrlInNewTab,
    } = props;
    const recentlyGeneratedPdf = aucPdfList?.[0];
    return (
        <React.Fragment>
            <div>
                <Header />
                <div className='main main-app p-3 p-lg-3 ms-1 auc-page'>
                    <div className='d-md-flex align-items-center justify-content-between'>
                        <div>
                            <ol className='breadcrumb fs-sm mb-0'>
                                <li className='breadcrumb-item active' aria-current='page'>
                                    Asset Usage Certificate
                                </li>
                            </ol>
                            <h2 className='main-title pt-1 mouse-hover' onClick={openViewPage}>
                                {batteryMeta?.asset_name}
                            </h2>
                        </div>
                    </div>
                    <Row className='g-3'>
                        <Col xl='8' md='12' sm='12'>
                            <Card className='card-one'>
                                <Card.Body className='meta-info p-0 m-2'>
                                    <div className='d-flex m-0 p-1 px-2 justify-content-between'>
                                        <div className='d-flex'>
                                            <Avatar img={bImg} />
                                            <div className='ps-2'>
                                                <p className='fs-sm text-secondary mb-0'>Model</p>
                                                <h6 className='fw-semibold text-dark mb-1'>{batteryMeta?.model}</h6>
                                            </div>
                                        </div>
                                        <div className='ps-3'>
                                            <p className=' text-secondary mb-0'>Chemistry</p>
                                            <p className='fw-semibold text-dark fs-sm  mb-0'>{batteryMeta?.chemistry}</p>
                                        </div>
                                        <div className='ps-3'>
                                            <p className=' text-secondary mb-0'>Nominal Energy</p>
                                            <p className='fw-semibold text-dark fs-sm  mb-0'>
                                                {batteryMeta?.nominal_energy_kwh}
                                            </p>
                                        </div>
                                        <div className='ps-3'>
                                            <p className=' text-secondary mb-0'>Commissioned on</p>
                                            <p className='fw-semibold text-dark fs-sm  mb-0'>
                                                {batteryMeta?.comissioned_on}
                                            </p>
                                        </div>
                                        <div className='ps-3'>
                                            <p className=' text-secondary mb-0'>Battery Application</p>
                                            <p className='fw-semibold text-dark fs-sm  mb-0'>{batteryMeta?.battery_type}</p>
                                        </div>
                                        <div className='ps-3'>
                                            <p className=' text-secondary mb-0'>Location</p>
                                            <p className='fw-semibold text-dark fs-sm  mb-0'>{batteryMeta?.location}</p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl='4' md='12' sm='12'>
                            <Card className='card-one'>
                                <Card.Body className='meta-info p-0 m-2'>
                                    <div className='d-flex m-0 p-1 px-2 justify-content-between meta-info'>
                                        <div className='d-flex'>
                                            <img
                                                src={qrImg}
                                                alt=''
                                                style={{
                                                    height: '40px',
                                                    width: '30px',
                                                }}
                                            />
                                            <div className='ps-3'>
                                                <h6 className='fw-semibold text-dark mb-1'>Blockchain AUC</h6>
                                                <p className='fs-sm text-secondary mb-0'>
                                                    {recentlyGeneratedPdf
                                                        ? recentlyGeneratedPdf.certificate_id
                                                        : 'Generate Certificate'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='ps-3'>
                                            <p className=' text-secondary mb-0'>Generated Date</p>
                                            <p className='fw-semibold text-dark fs-sm  mb-0'>
                                                {recentlyGeneratedPdf?.generated_on}
                                            </p>
                                        </div>
                                        <div className='ps-3'>
                                            <p className=' text-secondary mb-0'>Current Phase</p>
                                            <p className='fw-semibold text-dark fs-sm  mb-0'>
                                                {/* {recentlyGeneratedPdf
                                                    ? recentlyGeneratedPdf.current_phase
                                                    } */}
                                                {recentlyGeneratedPdf?.current_phase}
                                            </p>
                                        </div>
                                        <div className='ps-3'>
                                            <p className=' text-secondary mb-0'>Valid Till</p>
                                            <p className='fw-semibold text-dark fs-sm  mb-0'>
                                                {recentlyGeneratedPdf?.expiry}
                                            </p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <label className='d-block fs-sm text-secondary mb-1'>Recently Generated AUC</label>
                        <Col xs='12' sm='12' md='6' xl='6'>
                            <Card className='card-file'>
                                <Dropdown align='end' className='dropdown-file'>
                                    {/* <Dropdown.Toggle as={CustomToggle}>
                                        <i className='ri-more-2-fill'></i>
                                    </Dropdown.Toggle> */}
                                    <Dropdown.Menu>
                                        <Dropdown.Item href='#' className='details'>
                                            <i className='ri-information-line'></i>
                                            View Details
                                        </Dropdown.Item>
                                        <Dropdown.Item href='#' className='important'>
                                            <i className='ri-star-line'></i>
                                            Mark as Important
                                        </Dropdown.Item>
                                        <Dropdown.Item href='#' className='share'>
                                            <i className='ri-share-forward-line'></i>
                                            Share
                                        </Dropdown.Item>
                                        <Dropdown.Item href='#' className='download'>
                                            <i className='ri-download-2-line'></i>
                                            Download
                                        </Dropdown.Item>
                                        <Dropdown.Item href='#' className='copy'>
                                            <i className='ri-file-copy-line'></i>
                                            Copy to
                                        </Dropdown.Item>
                                        <Dropdown.Item href='#' className='move'>
                                            <i className='ri-folders-line'></i>
                                            Move to
                                        </Dropdown.Item>
                                        <Dropdown.Item href='#' className='rename'>
                                            <i className='ri-edit-2-line'></i>
                                            Rename
                                        </Dropdown.Item>
                                        <Dropdown.Item href='#' className='delete'>
                                            <i className='ri-delete-bin-line'></i>
                                            Delete
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <div
                                    className={'card-file-icon blockchain_background'}
                                    style={{ backgroundImage: 'url("/blockchain_img.svg")' }}
                                    onClick={() =>
                                        openOverlay(
                                            recentlyGeneratedPdf?.battery_uid,
                                            recentlyGeneratedPdf?.certificate_id
                                        )
                                    }
                                >
                                    {/* <i className='ri-file-pdf-line'></i> */}
                                </div>
                                {generatingAUC ? (
                                    <SpinnerLoader />
                                ) : (
                                    <Card.Body>
                                        <h6
                                            className='link-02 mouse-hover'
                                            onClick={() =>
                                                openOverlay(
                                                    recentlyGeneratedPdf?.battery_uid,
                                                    recentlyGeneratedPdf?.certificate_id
                                                )
                                            }
                                        >
                                            {recentlyGeneratedPdf?.file_name}
                                        </h6>
                                        <span>AUC GENERATED ON :{recentlyGeneratedPdf?.completed_on}</span>
                                        <span>SUBMITTED ON :{recentlyGeneratedPdf?.completed_on}</span>
                                        <span>COMPLETED ON :{recentlyGeneratedPdf?.completed_on}</span>
                                    </Card.Body>
                                )}

                                <Card.Footer className='mt-2'>
                                    <span className='d-none d-sm-inline'>Last Download: 2 hours ago</span>
                                    <div className='d-flex justify-content-around mt-4'>
                                        {/* <Button variant="light" className='border ' onClick={openOverlay}>Open Certificate</Button> */}
                                        <Button
                                            onClick={() =>
                                                downloadAUCPdf(
                                                    recentlyGeneratedPdf?.battery_uid,
                                                    recentlyGeneratedPdf?.certificate_id,
                                                    recentlyGeneratedPdf?.file_name
                                                )
                                            }
                                            variant='light'
                                            className='border '
                                        >
                                            Download Certificate
                                        </Button>
                                        <Button variant='light' className=' border '>
                                            Verify Certificate
                                        </Button>
                                        <Button variant='primary' className=' border' onClick={generateNewAUC}>
                                            Generate New Certificate
                                        </Button>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col xs='12' sm='12' md='6' xl='6'>
                            <Card className='card-one'>
                                <Card.Header>
                                    <Card.Title as='h6'>Battery Current State</Card.Title>
                                </Card.Header>
                                <Card.Body className='p-3 p-xl-3 battery-aging-table'>
                                    <h4>First Life</h4>
                                    <Table className='m-0 p-0'>
                                        <tbody>
                                            <tr>
                                                <th scope='row' className='fw-semibold text-dark mb-0'>
                                                    FILE NAME
                                                </th>
                                                <td className='fs-sm text-secondary mb-0'>
                                                    {recentlyGeneratedPdf?.file_name}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope='row' className='fw-semibold text-dark mb-0'>
                                                    TRANSACTION ID
                                                </th>
                                                <td className='fs-sm text-secondary mb-0'>
                                                    {recentlyGeneratedPdf?.transaction_id}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope='row' className='fw-semibold text-dark mb-0'>
                                                    DOCUMENT HASH(SHA-256)
                                                </th>
                                                <td className='fs-sm text-secondary mb-0'>
                                                    {recentlyGeneratedPdf?.document_hash}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope='row' className='fw-semibold text-dark mb-0'>
                                                    SIGN COMPLETED ON
                                                </th>
                                                <td className='fs-sm text-secondary mb-0'>
                                                    {recentlyGeneratedPdf?.completed_on}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope='row' className='fw-semibold text-dark mb-0'>
                                                    TRANSACTION BLOCK COMMENTED ON
                                                </th>
                                                <td className='fs-sm text-secondary mb-0'>
                                                    {recentlyGeneratedPdf?.completed_on}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                                <Card.Footer>
                                    <div className='d-flex justify-content-around mt-4'>
                                        <Button
                                            variant='light'
                                            className='px-5 border'
                                            onClick={() => openUrlInNewTab(recentlyGeneratedPdf?.transaction_id)}
                                        >
                                            View in Blockchain Explorer
                                        </Button>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <label className='d-block fs-sm text-secondary mb-1'>Previous Asset Usage Certificates</label>
                        <Row className='g-1 g-sm-2 g-xl-3 mb-5'>
                            {aucPdfList?.slice(1).map((aucPdf, index) => (
                                <Col xs='6' sm='4' md='3' xl='2' key={index}>
                                    <Card className='card-file'>
                                        <Dropdown align='end' className='dropdown-file'>
                                            {/* <Dropdown.Toggle as={CustomToggle}>
                                                <i className='ri-more-2-fill'></i>
                                            </Dropdown.Toggle> */}
                                            <Dropdown.Menu>
                                                <Dropdown.Item href='#' className='details'>
                                                    <i className='ri-information-line'></i>
                                                    View Details
                                                </Dropdown.Item>
                                                <Dropdown.Item href='#' className='important'>
                                                    <i className='ri-star-line'></i>
                                                    Mark as Important
                                                </Dropdown.Item>
                                                <Dropdown.Item href='#' className='share'>
                                                    <i className='ri-share-forward-line'></i>
                                                    Share
                                                </Dropdown.Item>
                                                <Dropdown.Item href='#' className='download'>
                                                    <i className='ri-download-2-line'></i>
                                                    Download
                                                </Dropdown.Item>
                                                <Dropdown.Item href='#' className='copy'>
                                                    <i className='ri-file-copy-line'></i>
                                                    Copy to
                                                </Dropdown.Item>
                                                <Dropdown.Item href='#' className='move'>
                                                    <i className='ri-folders-line'></i>
                                                    Move to
                                                </Dropdown.Item>
                                                <Dropdown.Item href='#' className='rename'>
                                                    <i className='ri-edit-2-line'></i>
                                                    Rename
                                                </Dropdown.Item>
                                                <Dropdown.Item href='#' className='delete'>
                                                    <i className='ri-delete-bin-line'></i>
                                                    Delete
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <div
                                            className={'card-file-icon blockchain_background'}
                                            style={{ backgroundImage: 'url("/blockchain_img.svg")' }}
                                            onClick={() => openOverlay(aucPdf.battery_uid, aucPdf.certificate_id)}
                                        ></div>
                                        <Card.Body>
                                            <h6>
                                                <Link
                                                    to='#'
                                                    className='link-02'
                                                    onClick={() =>
                                                        openOverlay(aucPdf.battery_uid, aucPdf.certificate_id)
                                                    }
                                                >
                                                    {aucPdf.file_name}
                                                </Link>
                                            </h6>
                                            {/* <span>HASH {aucPdf.document_hash}</span> */}
                                        </Card.Body>

                                        <Card.Footer>
                                            <span className='d-none d-sm-inline'>
                                                Generated On:
                                                {aucPdf.completed_on}
                                            </span>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Row>
                </div>
                {isOverlayOpen && (
                    <div className='pdf-overlay' onClick={closeOverlay}>
                        <div className='pdf-container'>
                            <Document file={{ data: pdfFileContent }}>
                                <Page
                                    pageNumber={1}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    className='page'
                                />
                            </Document>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default AUCPage;
