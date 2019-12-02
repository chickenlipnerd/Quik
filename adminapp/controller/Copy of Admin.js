/// <reference path="../../Scripts/jquery-1.7.2-vsdoc.js" />
/// <reference path="../../Scripts/jquery-1.7.2.js" />
/// <reference path="file://C:/Apps/extjs/ext-all-debug-w-comments.js" />

/// Admin controller to manage adding new reports to the system

Ext.define('QSAdmin.controller.Admin', {
    extend: 'Ext.app.Controller',
    stores: [
        
    ],
    views: [
        'Viewer'
    ],
    
    refs: [{
        ref: 'adminViewer',
        selector: 'adminviewer'
    }],

    init: function () {
        this.control({
            'adminviewer': {
                afterrender: function(viewer) {
                    Ext.QuickTips.init();
                    
                        /*
                         * ================  Simple form  =======================
                         */
                        viewer.add({tag: 'h2', html: 'Form 1 - Very Simple'});
                    
                    
                        var simple = Ext.create('Ext.form.Panel', {
                            url:'save-form.php',
                            frame:true,
                            title: 'Simple Form',
                            bodyStyle:'padding:5px 5px 0',
                            width: 350,
                            fieldDefaults: {
                                msgTarget: 'side',
                                labelWidth: 75
                            },
                            defaultType: 'textfield',
                            defaults: {
                                anchor: '100%'
                            },
                    
                            items: [{
                                fieldLabel: 'First Name',
                                name: 'first',
                                allowBlank:false
                            },{
                                fieldLabel: 'Last Name',
                                name: 'last'
                            },{
                                fieldLabel: 'Company',
                                name: 'company'
                            }, {
                                fieldLabel: 'Email',
                                name: 'email',
                                vtype:'email'
                            }, {
                                xtype: 'timefield',
                                fieldLabel: 'Time',
                                name: 'time',
                                minValue: '8:00am',
                                maxValue: '6:00pm'
                            }],
                    
                            buttons: [{
                                text: 'Save'
                            },{
                                text: 'Cancel'
                            }]
                        });
                    
                        viewer.add(simple);
                    
                    
                        /*
                         * ================  Form 2  =======================
                         */
                        viewer.add({tag: 'h2', html: 'Form 2 - Adding fieldsets'});
                    
                        var fsf = Ext.create('Ext.form.Panel', {
                            url:'save-form.php',
                            frame:true,
                            title: 'Simple Form with FieldSets',
                            bodyStyle:'padding:5px 5px 0',
                            width: 350,
                            fieldDefaults: {
                                msgTarget: 'side',
                                labelWidth: 75
                            },
                            defaults: {
                                anchor: '100%'
                            },
                    
                            items: [{
                                xtype:'fieldset',
                                checkboxToggle:true,
                                title: 'User Information',
                                defaultType: 'textfield',
                                collapsed: true,
                                layout: 'anchor',
                                defaults: {
                                    anchor: '100%'
                                },
                                items :[{
                                    fieldLabel: 'First Name',
                                    name: 'first',
                                    allowBlank:false
                                },{
                                    fieldLabel: 'Last Name',
                                    name: 'last'
                                },{
                                    fieldLabel: 'Company',
                                    name: 'company'
                                }, {
                                    fieldLabel: 'Email',
                                    name: 'email',
                                    vtype:'email'
                                }]
                            },{
                                xtype:'fieldset',
                                title: 'Phone Number',
                                collapsible: true,
                                defaultType: 'textfield',
                                layout: 'anchor',
                                defaults: {
                                    anchor: '100%'
                                },
                                items :[{
                                    fieldLabel: 'Home',
                                    name: 'home',
                                    value: '(888) 555-1212'
                                },{
                                    fieldLabel: 'Business',
                                    name: 'business'
                                },{
                                    fieldLabel: 'Mobile',
                                    name: 'mobile'
                                },{
                                    fieldLabel: 'Fax',
                                    name: 'fax'
                                }]
                            }],
                    
                            buttons: [{
                                text: 'Save'
                            },{
                                text: 'Cancel'
                            }]
                        });
                    
                        viewer.add(fsf);
                    
                        /*
                         * ================  Form 3  =======================
                         */
                        viewer.add({tag: 'h2', html: 'Form 3 - A little more complex'});
                    
                    
                        var top = Ext.create('Ext.form.Panel', {
                            frame:true,
                            title: 'Multi Column, Nested Layouts and Anchoring',
                            bodyStyle:'padding:5px 5px 0',
                            width: 600,
                            fieldDefaults: {
                                labelAlign: 'top',
                                msgTarget: 'side'
                            },
                    
                            items: [{
                                xtype: 'container',
                                anchor: '100%',
                                layout:'column',
                                items:[{
                                    xtype: 'container',
                                    columnWidth:.5,
                                    layout: 'anchor',
                                    items: [{
                                        xtype:'textfield',
                                        fieldLabel: 'First Name',
                                        name: 'first',
                                        anchor:'96%'
                                    }, {
                                        xtype:'textfield',
                                        fieldLabel: 'Company',
                                        name: 'company',
                                        anchor:'96%'
                                    }]
                                },{
                                    xtype: 'container',
                                    columnWidth:.5,
                                    layout: 'anchor',
                                    items: [{
                                        xtype:'textfield',
                                        fieldLabel: 'Last Name',
                                        name: 'last',
                                        anchor:'100%'
                                    },{
                                        xtype:'textfield',
                                        fieldLabel: 'Email',
                                        name: 'email',
                                        vtype:'email',
                                        anchor:'100%'
                                    }]
                                }]
                            }, {
                                xtype: 'htmleditor',
                                name: 'bio',
                                fieldLabel: 'Biography',
                                height: 200,
                                anchor: '100%'
                            }],
                    
                            buttons: [{
                                text: 'Save'
                            },{
                                text: 'Cancel'
                            }]
                        });
                    
                        viewer.add(top);
                    
                    
                        /*
                         * ================  Form 4  =======================
                         */
                        viewer.add({tag: 'h2', html: 'Form 4 - Forms can be a TabPanel...'});
                    
                    
                    
                        var tabs = Ext.create('Ext.form.Panel', {
                            width: 350,
                            border: false,
                            bodyBorder: false,
                            fieldDefaults: {
                                labelWidth: 75,
                                msgTarget: 'side'
                            },
                            defaults: {
                                anchor: '100%'
                            },
                    
                            items: {
                                xtype:'tabpanel',
                                activeTab: 0,
                                defaults:{
                                    bodyStyle:'padding:10px'
                                },
                    
                                items:[{
                                    title:'Personal Details',
                                    defaultType: 'textfield',
                    
                                    items: [{
                                        fieldLabel: 'First Name',
                                        name: 'first',
                                        allowBlank:false,
                                        value: 'Ed'
                                    },{
                                        fieldLabel: 'Last Name',
                                        name: 'last',
                                        value: 'Spencer'
                                    },{
                                        fieldLabel: 'Company',
                                        name: 'company',
                                        value: 'Ext JS'
                                    }, {
                                        fieldLabel: 'Email',
                                        name: 'email',
                                        vtype:'email'
                                    }]
                                },{
                                    title:'Phone Numbers',
                                    defaultType: 'textfield',
                    
                                    items: [{
                                        fieldLabel: 'Home',
                                        name: 'home',
                                        value: '(888) 555-1212'
                                    },{
                                        fieldLabel: 'Business',
                                        name: 'business'
                                    },{
                                        fieldLabel: 'Mobile',
                                        name: 'mobile'
                                    },{
                                        fieldLabel: 'Fax',
                                        name: 'fax'
                                    }]
                                }]
                            },
                    
                            buttons: [{
                                text: 'Save'
                            },{
                                text: 'Cancel'
                            }]
                        });
                    
                        viewer.add(tabs);
                    
                    
                    
                        /*
                         * ================  Form 5  =======================
                         */
                        viewer.add({tag: 'h2', html: 'Form 5 - ... and forms can contain TabPanel(s)'});
                    
                        var tab2 = Ext.create('Ext.form.Panel', {
                            title: 'Inner Tabs',
                            bodyStyle:'padding:5px',
                            width: 600,
                            fieldDefaults: {
                                labelAlign: 'top',
                                msgTarget: 'side'
                            },
                            defaults: {
                                anchor: '100%'
                            },
                    
                            items: [{
                                layout:'column',
                                border:false,
                                items:[{
                                    columnWidth:.5,
                                    border:false,
                                    layout: 'anchor',
                                    defaultType: 'textfield',
                                    items: [{
                                        fieldLabel: 'First Name',
                                        name: 'first',
                                        anchor:'95%'
                                    }, {
                                        fieldLabel: 'Company',
                                        name: 'company',
                                        anchor:'95%'
                                    }]
                                },{
                                    columnWidth:.5,
                                    border:false,
                                    layout: 'anchor',
                                    defaultType: 'textfield',
                                    items: [{
                                        fieldLabel: 'Last Name',
                                        name: 'last',
                                        anchor:'95%'
                                    },{
                                        fieldLabel: 'Email',
                                        name: 'email',
                                        vtype:'email',
                                        anchor:'95%'
                                    }]
                                }]
                            },{
                                xtype:'tabpanel',
                                plain:true,
                                activeTab: 0,
                                height:235,
                                defaults:{bodyStyle:'padding:10px'},
                                items:[{
                                    title:'Personal Details',
                                    defaults: {width: 230},
                                    defaultType: 'textfield',
                    
                                    items: [{
                                        fieldLabel: 'First Name',
                                        name: 'first',
                                        allowBlank:false,
                                        value: 'Jamie'
                                    },{
                                        fieldLabel: 'Last Name',
                                        name: 'last',
                                        value: 'Avins'
                                    },{
                                        fieldLabel: 'Company',
                                        name: 'company',
                                        value: 'Ext JS'
                                    }, {
                                        fieldLabel: 'Email',
                                        name: 'email',
                                        vtype:'email'
                                    }]
                                },{
                                    title:'Phone Numbers',
                                    defaults: {width: 230},
                                    defaultType: 'textfield',
                    
                                    items: [{
                                        fieldLabel: 'Home',
                                        name: 'home',
                                        value: '(888) 555-1212'
                                    },{
                                        fieldLabel: 'Business',
                                        name: 'business'
                                    },{
                                        fieldLabel: 'Mobile',
                                        name: 'mobile'
                                    },{
                                        fieldLabel: 'Fax',
                                        name: 'fax'
                                    }]
                                },{
                                    cls: 'x-plain',
                                    title: 'Biography',
                                    layout: 'fit',
                                    items: {
                                        xtype: 'htmleditor',
                                        name: 'bio2',
                                        fieldLabel: 'Biography'
                                    }
                                }]
                            }],
                    
                            buttons: [{
                                text: 'Save'
                            },{
                                text: 'Cancel'
                            }]
                        });
                    
                        viewer.add(tab2);

                    
                    /*var fakeHTML = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

                    var SamplePanel = Ext.extend(Ext.Panel, {
                        width    : 500,
                        height   : 250,
                        style    : 'margin-top:15px',
                        bodyStyle: 'padding:10px',
                        renderTo : Ext.getBody(),
                        html     : fakeHTML,
                        autoScroll: true
                    });
                    
                    var sampleP = new SamplePanel({
                        title: 'Standard',
                        tbar: [{
                            xtype:'splitbutton',
                            text: 'Menu Button',
                            iconCls: 'add16',
                            menu: [{text: 'Menu Button 1'}]
                        },'-',{
                            xtype:'splitbutton',
                            text: 'Cut',
                            iconCls: 'add16',
                            menu: [{text: 'Cut Menu Item'}]
                        },{
                            text: 'Copy',
                            iconCls: 'add16'
                        },{
                            text: 'Paste',
                            iconCls: 'add16',
                            menu: [{text: 'Paste Menu Item'}]
                        },'-',{
                            text: 'Format',
                            iconCls: 'add16'
                        }]
                    });
                    
                    viewer.add(sampleP);*/
                }
            }
        });
    }
});
