Ext.define('QS.view.kpitrend.Chart', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.kpitrendchart',
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
        //minimum: -300,
        displayName: 'Performance',
        position: 'left',
        fields: ['ReportValue', 'BenchMark', 'BenchMark2'], // whatever your series set is you should also include the field in this array.
        grid: true,
        label: {
            renderer: function(value) {
                return Ext.util.Format.usMoney(value);
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
            renderer: function(storeItem, item) {
                this.setTitle('ReportValue: ' + Ext.util.Format.usMoney(storeItem.get('ReportValue')));
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
                this.setTitle('BenchMark: ' + Ext.util.Format.usMoney(storeItem.get('BenchMark')));
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
            renderer: function(storeItem, item) {
                this.setTitle('BenchMark2: ' + Ext.util.Format.usMoney(storeItem.get('BenchMark2')));
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
