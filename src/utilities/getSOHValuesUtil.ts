export function findLatestAndOneMonthBeforeSOHValues(data: IHealthViewGraphData) {
    if (!data.length) {
        return { latestSOH: 0, sohDropped: 0 };
    }
    const dates = Object.keys(data).map(key => new Date(key).getTime());
    const latestDate = new Date(Math.max.apply(null, dates));
    const oneMonthBefore = new Date(latestDate);
    oneMonthBefore.setMonth(latestDate.getMonth() - 1);

    // Format the dates as strings in "YYYY-MM-DD" format
    const latestDateStr = latestDate.toISOString().split('T')[0];
    const oneMonthBeforeStr = oneMonthBefore.toISOString().split('T')[0];

    const oneMonthBeforeSOH = data[oneMonthBeforeStr];
    const latestSOH = data[latestDateStr];
    const sohDropped = ((oneMonthBeforeSOH - latestSOH) * 100) / oneMonthBeforeSOH;
    return { latestSOH: data[latestDateStr], sohDropped: sohDropped };
}

// 90->80
