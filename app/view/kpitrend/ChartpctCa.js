Ext.define('QS.view.kpitrend.ChartpctCa', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.kpitrendchartpctca',
    store: 'KpiTrends',
    title: 'KPI Trend Chart',
    animate: true,
    closable: false,
    theme: 'Green',
    legend: {
        position: 'bottom'
    },
    axes: [{
        type: 'Category',
        title: 'Weeks',
        position: 'bottom',
        maximum: 2,
        fields: ['Per']
    }, {
        type: 'Numeric',
        title: 'Performance',
        minimum: -.05,
        maximum: .05,
        //minimum: -300,
        displayName: 'Performance',
        position: 'left',
        fields: ['ReportValue', 'BenchMark', 'BenchMark2'], // whatever your series set is you should also include the field in this array.
        grid: true,
        label: {
            renderer: function(value) {
                return (parseFloat(value) *100.0).toFixed(2) + "%";
            }
        }
    }],
    series: [{
        type: 'column',
        xField: 'Per',
        yField: 'ReportValue',
        tips: {
            trackMouse: true,
            width: 200,
            height: 25,
            renderer: function(storeItem) {
                var formatVal = (parseFloat(storeItem.get('ReportValue')) *100.0).toFixed(2) + "%"
                this.setTitle('ReportValue: ' + formatVal);
            }
        }
    }, {
        type: 'line',
        xField: 'Per',
        yField: 'BenchMark',
        style: {
            fill: '#333333',
            stroke: '#333333',
            'stroke-width': 3
        },
        markerConfig: {
            type: 'circle',
            size: 4,
            radius: 4,
            'stroke-width': 0,
            fill: '#333333',
            stroke: '#333333'
        },
        tips: {
            trackMouse: true,
            width: 200,
            height: 25,
            renderer: function(storeItem) {
                var formatVal = (parseFloat(storeItem.get('BenchMark')) *100.0).toFixed(2) + "%"
                this.setTitle('BenchMark: ' + formatVal);
            }
        }
    }, {
        type: 'line',
        xField: 'Per',
        yField: 'BenchMark2',
        style: {
            fill: '#695',
            stroke: '#695',
            'stroke-width': 3
        },
        markerConfig: {
            type: 'circle',
            size: 4,
            radius: 4,
            'stroke-width': 0,
            fill: '#695',
            stroke: '#698'
        },
        tips: {
            trackMouse: true,
            width: 200,
            height: 25,
            renderer: function(storeItem) {
                var formatVal = (parseFloat(storeItem.get('BenchMark2')) *100.0).toFixed(2) + "%"
                this.setTitle('BenchMark2: ' + formatVal);
            }
        }
    }],
    
    initComponent: function () {
        /*this.tipRenderer = function(chart, record, index, series) {
            return 'Performance Value:\t' + record.data.reportValue + '\nWeek Number:\t\t'+ record.data.week;
        }*/
        
        this.callParent(arguments);
    }
});
