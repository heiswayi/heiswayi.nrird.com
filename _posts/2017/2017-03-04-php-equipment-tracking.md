---
layout: post
title: Creating a simple Equipment Tracking web app in PHP
description: Creating of a simple CRUD-based web app for internal equipment tracking using PHP, AJAX and DataTables.
keywords: crud application, php application, datatables, equipment tracking web app, crud ajax web application
tags: [PHP, CRUD, AJAX, DataTables, jQuery, JavaScript, Programming]
comments: true
---

### Real world problem

A couple of weeks ago I was asked to gather and compile a proper list of equipment that has been borrowed by other engineers/contractors who are working with my department. Unfortunately, the list that I had received is recorded in Excel file. Microsoft Excel to be exact. Well, whenever I need to check the status of the equipment, I have to wait those engineers to send me the updated list by email or through the shared drive. To me, this is quite tedious.

I had an idea and I decided to create a web app for that. Instead of using Excel file, those engineers or any engineer can just go to the web app and then update the equipment record or status. By doing this, anytime I need the latest list to audit, I can just simply export from the web app. So, I decided to spend some hours during my weekend to create the web app.

### Implementing the solution

Finally, the idea was realized. The web app was ready, successful deployed! Here are some screenshots of the complete web app after I asked those engineers to update the equipment latest records:

{% include figure.html src="https://i.imgur.com/37sZLWO.png" caption="Application showing the latest list of equipment records" %}

{% include figure.html src="https://i.imgur.com/oxSMOga.png" caption="Updating particular equipment record" %}

{% include figure.html src="https://i.imgur.com/3zRj0Gr.png" caption="Viewing the details of equipment record" %}

### Here's how I created the app

The web app is known as **Equipment Tracking**, or in short is **Etrac**. I created Etrac from scratch using [DataTables](https://datatables.net/), [jQuery](https://jquery.com/), and [PHP](http://php.net/). [MySQL](https://www.mysql.com/) is used as the database. The layout is designed based on [Bootstrap](http://getbootstrap.com/) with [Google-style theme](https://todc.github.io/todc-bootstrap/).

I hosted Etrac on IIS7, in one of VM servers and only can be accessed within the company's intranet. Since the app is deployed within IIS, I can use the session to capture the user's Active Directory account. So, I don't need to implement user authentication module here. Other than that, Etrac supports exporting to PDF, Excel and CSV file format. Whenever I need the list, I can just export it to any format I want.

### Code snippets from the project

Etrac is built based on DataTables, which is an [open source project](https://datatables.net/license/) distributed under MIT license. Following code snippet is the customized version of DataTables JS code that I wrote for Etrac app:

```js
var table = $('.datatables-table').DataTable({
    fixedHeader: true,
    "processing": true,
    "serverSide": true,
    "ajax": {
        "url": "datatables.php",
        "type": "POST"
    },
    "columns": [{
            "data": "id"
        },
        {
            "data": "model"
        },
        {
            "data": "description"
        },
        {
            "data": "project"
        },
        {
            "data": "serial_number"
        },
        {
            "data": "owner"
        },
        {
            "data": "current_owner"
        },
        {
            "data": "remark"
        },
        {
            "data": "id"
        }
    ],
    "order": [
        [0, "desc"]
    ],
    aLengthMenu: [
        [10, 25, 50, 100, 200, -1],
        [10, 25, 50, 100, 200, "All"]
    ],
    iDisplayLength: 10, // default display
    // Enable mark.js search term highlighting
    mark: true,
    dom: 'lBfrtip',
    buttons: [{
            extend: 'copy',
            text: '<span class="hand-pointer" title="Copy to clipboard"><i class="fa fa-clipboard" aria-hidden="true"></i> Copy</span>',
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7]
            }
        },
        {
            extend: 'csv',
            text: '<span class="hand-pointer" title="Export to CSV file"><i class="fa fa-file-text-o" aria-hidden="true"></i> CSV</span>',
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7]
            }
        },
        {
            extend: 'excel',
            text: '<span class="hand-pointer" title="Export to Excel file"><i class="fa fa-file-excel-o" aria-hidden="true"></i> Excel</span>',
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7]
            }
        },
        {
            extend: 'pdf',
            text: '<span class="hand-pointer" title="Export as PDF file"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> PDF</span>',
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7]
            }
        },
        {
            extend: 'print',
            text: '<span class="hand-pointer" title="Print"><i class="fa fa-print" aria-hidden="true"></i> Print</span>',
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7]
            }
        },
        {
            text: '<span class="hand-pointer" title="Select all visible rows"><i class="fa fa-check-square-o" aria-hidden="true"></i> Select All</span>',
            action: function() {
                table.rows().select();
            }
        },
        {
            text: '<span class="hand-pointer" title="Deselect all"><i class="fa fa-square-o" aria-hidden="true"></i> Select None</span>',
            action: function() {
                table.rows().deselect();
            }
        }
    ],
    select: {
        style: 'multi'
    },
    columnDefs: [{
        targets: 8,
        render: function(data, type, full, meta) {
            if (type === 'display') {
                if (userlevel == 0 || userlevel == 1) {
                    data = '<div class="action-links"><button type="button" class="btn btn-default btn-xs disabled" data-eqid="' + data + '" id="btnUpdate"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Update</button> <button type="button" class="btn btn-default btn-xs disabled" data-eqid="' + data + '" id="btnDelete" title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></button> <a href="equipment.php?id=' + data + '" class="btn btn-primary btn-xs hand-pointer" data-eqid="' + data + '" title="View details"><i class="fa fa-eye" aria-hidden="true"></i></a></div>';
                }
                if (userlevel == 2) {
                    data = '<div class="action-links"><button type="button" class="btn btn-info btn-xs btnUpdate hand-pointer" data-eqid="' + data + '" id="btnUpdate"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Update</button> <button type="button" class="btn btn-default btn-xs disabled" data-eqid="' + data + '" id="btnDelete" title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></button> <a href="equipment.php?id=' + data + '" class="btn btn-primary btn-xs hand-pointer" data-eqid="' + data + '" title="View details"><i class="fa fa-eye" aria-hidden="true"></i></a></div>';
                }
                if (userlevel == 3 || userlevel == 4) {
                    data = '<div class="action-links"><button type="button" class="btn btn-info btn-xs btnUpdate hand-pointer" data-eqid="' + data + '" id="btnUpdate"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Update</button> <button type="button" class="btn btn-danger btn-xs btnDelete hand-pointer" data-eqid="' + data + '" id="btnDelete" title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></button> <a href="equipment.php?id=' + data + '" class="btn btn-primary btn-xs hand-pointer" data-eqid="' + data + '" title="View details"><i class="fa fa-eye" aria-hidden="true"></i></a></div>';
                }
            }

            return data;
        }
    }],
    "language": {
        "search": "<strong>Search / filter records:</strong>",
        "lengthMenu": "<strong>Display:</strong> _MENU_ records per page",
        "zeroRecords": "Nothing found - sorry!",
        "info": "Showing page _PAGE_ of _PAGES_",
        "infoEmpty": "No records available",
        "infoFiltered": "(filtered from _MAX_ total records)"
    }

});
```

And following below is the PHP code to work with DataTable for server-side processing:

```php
<?php

// Global config
require_once 'config.php';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Easy set variables
 */

// DB table to use
$table = TABLE_EQUIPMENTS;

// Table's primary key
$primaryKey = 'id';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case object
// parameter names
$columns = array(
  array( 'db' => 'id',           'dt' => 'id'),
  array( 'db' => 'model',        'dt' => 'model' ),
  array( 'db' => 'description',  'dt' => 'description' ),
  array( 'db' => 'project',      'dt' => 'project' ),
  array( 'db' => 'serial_number','dt' => 'serial_number' ),
  array( 'db' => 'owner',        'dt' => 'owner' ),
  array( 'db' => 'current_owner','dt' => 'current_owner' ),
  array( 'db' => 'remark',       'dt' => 'remark' )
);

// SQL server connection information
$sql_details = array(
  'user' => DB_USER,
  'pass' => DB_PASS,
  'db'   => DB_NAME,
  'host' => DB_HOST
);


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */

require( 'ssp.class.php' );

echo json_encode(
	SSP::complex( $_POST, $sql_details, $table, $primaryKey, $columns, null, 'deleted=0' )
);
```

The PHP code above requires a library class provided by DataTables called `ssp.class.php`. You can get this class source code from [DataTables's repo on GitHub here](https://github.com/DataTables/DataTables/blob/master/examples/server_side/scripts/ssp.class.php).