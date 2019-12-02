Ext.define('QS.common.HelperMethods', {

    filterRepeats: function(value, rowIndex, tempObjVar) {
        
        if (rowIndex == 0 || this.temp[tempObjVar] != value) {
            this.temp[tempObjVar] = value;
            return value;
        } else {
            return '';
        }
    },
    
    // This is going to hide the container instead returning a blank value 
    hideRepeats: function(value, rowIndex, tempObjVar, formatter) {

        // populate temp object with current value if property doesn't already exists
        if (typeof this.repeatsTemp[tempObjVar] === 'undefined') {
            this.repeatsTemp[tempObjVar] = value;
        }
        
        if (typeof formatter !== 'function') {
            formatter = false;
        }

        if (rowIndex == 0 || this.repeatsTemp[tempObjVar] != value) {
            this.temp[tempObjVar] = value;
            
            return (formatter) ? formatter(value) : value;
            
        } else {
            return (formatter) ? '<span style="display:hidden">' + formatter(value) + '</span>' : '<span style="display:hidden">' + value + '</span>';
        }
    },
    
    repeatsTemp: {},
        
    temp: {     //hold previous value used to allow dynamic display of KPI max rank data
        'prevFranGrp': '',
        'prevCompany': '',
        'prevStoreName': '',
        'prevWeekOf': '',
        'curMaxRank': 0
    },
    
    convertJsonDate: function(val, record) {
        if (typeof val == 'string') {
            var nDate = Number(val.match(/\d+/g).join(''));
            var date = new Date(nDate);
            
            return date;
        } else {
            return val;
        }
    },
    
    formatNumber: function (val) {
        // console.log(val);
        if (val > 0) {
            return '<span style="color:black;">' + Ext.util.Format.number(val, '0,0') + '</span>';
        } else if (val < 0) {
            return '<span style="color:red;">(' + Ext.util.Format.number(val, '0,0').replace('-', '') + ')</span>';
        }
        
        return val;
    },

    formatMoney: function (val) {        // copied from this List.js change function
        var adjVal = (parseFloat(val)).toFixed(2)
        
        if (val > 0) {
            return '<span style="color:black;">' + Ext.util.Format.usMoney(adjVal) + '</span>';
        } else if (val < 0) {
            return '<span style="color:red;">(' + Ext.util.Format.usMoney(adjVal).replace('-', '') + ')</span>';
        }
        
        return val;
    },

    formatPercent: function (val) {     // copied from this List.js pctChange function
        var adjVal = (parseFloat(val) *100.0).toFixed(2);
        
        if (val > 0) {
            return '<span style="color:black;">' + Ext.util.Format.number(adjVal, '0.00') + '%</span>';
        } else if (val < 0) {
            return '<span style="color:red;">(' + Ext.util.Format.number(adjVal, '0.00').replace('-', '') + '%)</span>';
        }
        
        return val;
    },
    
    formatDate: function (date) {
        if (typeof date == 'string' || typeof date == 'undefined') {
            return date;
        } else {
            return Ext.Date.format(date, 'm/d/Y');
        }
    }

});
