// IAucPageProps.ts
interface ICustomToggleProps {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

interface IAucPageProps {
    pdfFileContent: string;
    openViewPage: () => void;
    batteryMeta?: IBatteryData;
    CustomToggle: React.ForwardRefExoticComponent<ICustomToggleProps & React.Ref<HTMLAnchorElement>>;
    isOverlayOpen: boolean;
    closeOverlay: () => void;
    openOverlay: (battery_uid: string, certificate_id: string) => void;
    aucPdfList: IAucList[];
    generateNewAUC: () => void;
    downloadAUCPdf: (battery_uid: string, certificate_id: string, fileName: string) => void;
    generatingAUC: boolean;
    openUrlInNewTab: (transaction_id: string) => void;
}

export default IAucPageProps;
