import React, { forwardRef, useEffect, useState } from 'react';
import { getBatteryMeta } from '../../api/batteryApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AUCPage from '../../components/AUC/AUCPage';
import { getAUCListByBatteryId, downloadAUC, generateAUC } from '../../api/aucApi';
import { useError } from '../../Contexts/ErrorContext';
import { AxiosError } from 'axios';

interface ICustomToggleProps {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}
const AUCPageContainer = () => {
    const { batteryId } = useParams();
    const navigate = useNavigate();
    const [batteryMeta, setBatteryMeta] = useState<IBatteryData>();
    const [aucPdfList, setAucPdfList] = useState<IAucList[]>([]);
    const [pdfFileContent, setPdfFileContent] = useState<string>('');
    const [generatingAUC, setGeneratingAUC] = useState<boolean>(false);
    const { showError } = useError();
    useEffect(() => {
        const fetchHealthViewData = async () => {
            try {
                const batteryInfo = await getBatteryMeta(batteryId ?? '');
                setBatteryMeta(batteryInfo);
                const AucList = await getAUCListByBatteryId(batteryId ?? '');
                setAucPdfList(AucList);
            } catch (ex) {
                showError(ex as AxiosError<IErrorResponse>);
            }
        };
        fetchHealthViewData();
    }, [generatingAUC]);
    const CustomToggle = forwardRef<HTMLAnchorElement, ICustomToggleProps>((props, ref) => (
        <Link
            to=''
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                props.onClick(e);
            }}
            className='dropdown-link'
        >
            {props.children}
        </Link>
    ));
    CustomToggle.displayName = 'CustomToggle';

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const openPdf = async (batteryUId: string, certificate_id: string) => {
        try {
            const fileContent = await downloadAUC(batteryUId, certificate_id);
            setPdfFileContent(fileContent);
            setIsOverlayOpen(true);
        } catch (ex) {
            showError(ex as AxiosError<IErrorResponse>);
        }
    };
    const closeOverlay = () => {
        setIsOverlayOpen(false);
    };

    const generateNewAUC = async () => {
        try {
            setGeneratingAUC(true);
            await generateAUC(batteryId);
            const AucList = await getAUCListByBatteryId(batteryId ?? '');
            setAucPdfList(AucList);
            setGeneratingAUC(false);
        } catch (ex) {
            showError(ex as AxiosError<IErrorResponse>);
            setGeneratingAUC(false);
        }
    };

    const downloadAUCPdf = async (batteryUId: string, certificate_id: string, AUCPdfName: string) => {
        try {
            const fileContent = await downloadAUC(batteryUId, certificate_id);
            const pdfBlob = new Blob([fileContent], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(pdfBlob);
            const tempLink = document.createElement('a');
            tempLink.href = url;
            tempLink.setAttribute('download', AUCPdfName);
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(url);
        } catch (ex) {
            showError(ex as AxiosError<IErrorResponse>);
        }
    };

    const openViewPage = () => {
        navigate(-1);
    };
    const openUrlInNewTab = (transaction_id: string) => {
        const url = `${process.env.REACT_APP_BLOCKCHAIN_BASE_URL}?tab=transactions&transId=${transaction_id}`;
        window.open(url, '_blank');
    };
    return (
        <AUCPage
            openViewPage={openViewPage}
            batteryMeta={batteryMeta}
            CustomToggle={CustomToggle}
            isOverlayOpen={isOverlayOpen}
            closeOverlay={closeOverlay}
            openOverlay={openPdf}
            pdfFileContent={pdfFileContent}
            aucPdfList={aucPdfList}
            generateNewAUC={generateNewAUC}
            downloadAUCPdf={downloadAUCPdf}
            generatingAUC={generatingAUC}
            openUrlInNewTab={openUrlInNewTab}
        />
    );
};

export default AUCPageContainer;
