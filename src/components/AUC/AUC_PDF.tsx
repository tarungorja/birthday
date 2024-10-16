import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from 'react-bootstrap';

const Testing: React.FC = () => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const openOverlay = () => {
        setIsOverlayOpen(true);
    };

    const closeOverlay = () => {
        setIsOverlayOpen(false);
    };

    return (
        <div>
            <Button onClick={openOverlay}>Open PDF </Button>

            {isOverlayOpen && (
                <div className="pdf-overlay" onClick={closeOverlay}>
                    <div className="pdf-container">
                        <Document file="./document.pdf">
                            <Page
                                pageNumber={1}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                className="page"
                            />
                        </Document>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Testing;
