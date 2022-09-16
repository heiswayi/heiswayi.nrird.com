---
layout: post
title: Creating a simple Equipment Tracking app in PHP
description: This is how I created a simple CRUD-based web app for internal equipment tracking using PHP, AJAX and DataTables.
tags: [PHP, CRUD, AJAX, DataTables, jQuery, JavaScript, Programming]
---

A couple of weeks ago I was asked to gather and compile a proper list of equipment that has been borrowed by other engineers/contractors who are working with my department. Unfortunately, the list that I had received is recorded in Excel file. So, whenever I need to check the status of the equipment, I have to wait those engineers/contractors to send me the updated list by email or through the shared drive. To me, this will be a quite tedious work.

So, I decided to create a web app for that. Instead of using Excel file, those engineers/contractors can just go to the web app and then update the equipment record or status. By doing this, anytime I need the latest list to do the audit, I can just simply export the data from the app. At the end, this is the outcome of how I spent my weekend.



### Screenshots

The app name is **Equipment Tracking** or **Etrac** for short, and successfully deployed on my company internal server.

{% include image.html src="assets/images/37sZLWO.png" caption="Application showing the latest list of equipment records" %}

{% include image.html src="assets/images/oxSMOga.png" caption="Updating particular equipment record" %}

{% include image.html src="assets/images/3zRj0Gr.png" caption="Viewing the details of equipment record" %}



### About Etrac

Etrac is built from scratch in PHP using [DataTables](https://datatables.net/), jQuery and MySQL as its database. The UI is designed using [Bootstrap](http://getbootstrap.com/) and [Google-style theme](https://todc.github.io/todc-bootstrap/).

I hosted Etrac on IIS7, in one of virtual machines and only can be accessed within the company's intranet. Since the app is running using IIS, I can use the session to capture user's Active Directory (AD) account that used the company network. So, I don't need to implement user authentication module here.

Etrac also supports data exporting into PDF, Excel and CSV file.



### Code snippets

DataTables JS code that I wrote for Etrac:

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

This is how the PHP code looked like:

```php
<?php
// Comments are removed for the sake of brevity

require_once 'config.php';
$table = TABLE_EQUIPMENTS;
$primaryKey = 'id';
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
$sql_details = array(
  'user' => DB_USER,
  'pass' => DB_PASS,
  'db'   => DB_NAME,
  'host' => DB_HOST
);
require( 'ssp.class.php' );
echo json_encode(
	SSP::complex( $_POST, $sql_details, $table, $primaryKey, $columns, null, 'deleted=0' )
);
```

Please note that the PHP code above requires a library class provided by DataTables called `ssp.class.php`. You can get this class source code from [DataTables's repository on GitHub](https://github.com/DataTables/DataTables/blob/master/examples/server_side/scripts/ssp.class.php).