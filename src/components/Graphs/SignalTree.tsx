import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import Tree, { CustomNodeElementProps, TreeNodeDatum } from 'react-d3-tree';
import 'react-tooltip/dist/react-tooltip.css';
import { getSignalTreeData, getSignalTreeDataWithDateRange } from '../../api/signalApi';
import { useError } from '../../Contexts/ErrorContext';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../scss/components/_signal_tree_carousel.scss';
import { truncateText } from '../../utilities/truncateText';
import { getLastMonthStartAndEndDates, getNextMonthStartAndEndDates } from '../../utilities/dateFormatConverter';
import CustomSnackbar from '../common/CustomSnackBar';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const TreeGraph = (props: { signalId: string; bat_uid: string; }) => {
    const { showError } = useError();
    const navigate = useNavigate();
    const { signalId, bat_uid } = props;
    const [signalData, setSignalData] = useState<SignalTreeChartData[]>([]);
    const [signalDate, setSignalDate] = useState<string>('');
    const [noSignalFound, setNoSignalFound] = useState<boolean>(false);
    const [hidePrev, setHidePrev] = useState<boolean>(false);
    const [hideNext, setHideNext] = useState<boolean>(false);
    const containerRef = useRef<HTMLElement | null>(null);
    const [tooltip, setTooltip] = useState<TreeNodeDatum | null>(null);

    const scrollLeft = () => {
        if (containerRef.current) {
            const { scrollWidth, clientWidth, scrollLeft } = containerRef.current;

            if (scrollLeft === 0) {
                containerRef.current.scrollTo({
                    left: scrollWidth - clientWidth,
                });

                setTimeout(() => {
                    containerRef.current?.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                }, 100);
            } else {
                containerRef.current.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }
    };
    const scrollRight = () => {
        if (containerRef.current) {
            const { scrollWidth, clientWidth } = containerRef.current;
            containerRef.current.scrollTo({
                left: scrollWidth - clientWidth,
                behavior: 'smooth'
            });
        }
    };
    const fetchPrev = async () => {
        try {
            const { startDate, endDate } = getLastMonthStartAndEndDates(new Date(signalDate));
            let signalDataDoc: SignalTreeChartData[] = await getSignalTreeDataWithDateRange(bat_uid, signalId, startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'), 'asc');
            signalDataDoc = signalDataDoc ? signalDataDoc : [];
            const signals = [...signalDataDoc, ...signalData].filter(
                (signal, index, self) => index === self.findIndex((s) => s.id === signal.id)
            );
            setNoSignalFound(signalData.length == signals.length);
            setHidePrev(true);
            setSignalData(signals);
            setTimeout(scrollLeft, 100);
        } catch (ex) {
            showError(ex as AxiosError<IErrorResponse>);
        }
    };
    const fetchNext = async () => {
        try {
            const { startDate, endDate } = getNextMonthStartAndEndDates(new Date(signalDate));
            let signalDataDoc: SignalTreeChartData[] = await getSignalTreeDataWithDateRange(bat_uid, signalId, startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'), 'asc');
            signalDataDoc = signalDataDoc ? signalDataDoc : [];
            setNoSignalFound(signalDataDoc.length == 0);
            const signals = [...signalData, ...signalDataDoc].filter(
                (signal, index, self) => index === self.findIndex((s) => s.id === signal.id)
            );
            setNoSignalFound(signalData.length == signals.length);
            setSignalData(signals);
            setHideNext(true);
            setTimeout(scrollRight, 100);
        } catch (ex) {
            showError(ex as AxiosError<IErrorResponse>);
        }
    };
    const fetchSignalTreeData = async () => {
        try {
            let signalDataDoc: SignalTreeChartData[] = await getSignalTreeData(bat_uid, signalId);
            signalDataDoc = signalDataDoc[0] ? [signalDataDoc[0]] : [];
            setSignalDate(signalDataDoc[0].attributes?.['Date'] ?? '');
            setSignalData(signalDataDoc);
        } catch (ex) {
            showError(ex as AxiosError<IErrorResponse>);
        }
    };
    useEffect(() => {
        setTimeout(() => {
            setNoSignalFound(false);
        }, 3000);
    }, [noSignalFound]);

    useEffect(() => {
        setTooltip(null);
        fetchSignalTreeData();
        setHideNext(false);
        setHidePrev(false);
    }, [signalId, bat_uid]);


    const MyCustomNode: React.FC<CustomNodeElementProps> = ({ nodeDatum }): ReactElement => {
        const nodeDatumWithId = nodeDatum as TreeNodeDatum & { id: string; };
        const navigateById: React.MouseEventHandler<SVGGElement> = (): void => {
            setTooltip(null);
            navigate(`/dashboard/signals-view-page/${nodeDatumWithId.id}`, { replace: true });

        };
        const onHover: React.MouseEventHandler<SVGGElement> = (): void => {
            setTooltip(nodeDatum); // Display the tooltip
        };

        const onLeave: React.MouseEventHandler<SVGGElement> = (): void => {
            setTooltip(null);
        };
        return (
            <g onClick={navigateById} onMouseOver={onHover} onMouseOut={onLeave}>
                {nodeDatumWithId.id === signalId && <circle className='ripple-effect' r='15' />}
                <circle r='15' data-tooltip-id={nodeDatum.__rd3t.id} data-tooltip-variant='info' />
                <text className='rd3t-label__title' x='-60' dy='2.2em' >
                    {truncateText(nodeDatum.name, 30)}
                </text>
                <g className='rd3t-label'>
                    {nodeDatum.attributes?.Date && (
                        <text className='rd3t-label__attributes'>
                            <tspan x='40' dy='1.2em'>
                                {nodeDatum.attributes?.Date}
                            </tspan>
                        </text>
                    )}
                </g>

            </g>
        );
    };

    return (
        <div style={{ position: 'relative', overflow: 'hidden', scrollBehavior: 'smooth' }}>
            <div ref={(ref) => { containerRef.current = ref; }} className='scrollable-container' style={{ display: 'inline-flex', whiteSpace: 'nowrap', overflowX: 'auto' }}>
                {signalData.map((signal, index) => (
                    <div
                        key={index}
                        style={{ minWidth: '50%', padding: '0 0px' }}
                    >
                        <Tree
                            data={signal}
                            orientation='horizontal'
                            nodeSize={{ x: 300, y: 200 }}
                            separation={{ siblings: 2, nonSiblings: 2 }}
                            translate={{ x: 150, y: 100 }}
                            collapsible={false}
                            renderCustomNodeElement={(rd3tProps) => <MyCustomNode {...rd3tProps} />}
                            zoomable={false}
                        />
                    </div>
                ))}
            </div>

            {tooltip != null && <Tooltip id={tooltip.__rd3t.id} isOpen={tooltip != null}>
                <div>
                    <h5>{tooltip.name}</h5>
                    <p>{tooltip.attributes?.Description}</p>
                </div>
            </Tooltip>
            }
            <CustomSnackbar
                message='No Signals found.'
                open={noSignalFound}
            />
            {!hidePrev && <div style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}>
                <div className='prev-icon' onClick={fetchPrev}></div>
            </div>}
            {!hideNext && <div style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}>
                <div className='next-icon' onClick={fetchNext}></div>
            </div>}
        </div>
    );
};

export default TreeGraph;


