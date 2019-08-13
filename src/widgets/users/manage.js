import { renderDefaultToolbar } from '../../html/common/toolbar';

import Model from '../../models/user/user'

let table,
  $selector;
const defaultPageSize = 25;
//const filterOptions = {
//  cell: {
//    template: () => { },
//    showOperators: false,
//  },
//};
const filterOptions = false;

function initTable(selector) {
  $selector = $(selector);

  table = $selector.kendoGrid({
    columns: [
      {
        selectable: true,
        width: 30,
        hidden: false,
        menu: false,
        title: "<span class='field-selectable'></span>",
      },
      {
        field: 'id',
        template: '<input type="number" value="#: data.id #" hidden/>',
        hidden: true,
        menu: false,
        title: "<span class='field-id'></span>",
      },
      {
        field: 'userName',
        template: '<a href="\\#/users/#: id #">#: userName #</a>',
        title: 'Логин',
        filterable: filterOptions,
        //width: 80,
      },
    ],
    sortable: true,
    scrollable: true,
    reorderable: true,
    resizable: true,
    columnMenu: {
      filterable: false,
      sortable: false,
    },
    filterable: {
      mode: 'row',
    },
    pageable: {
      refresh: true,
      pageSizes: [10, 25, 50, 100],
      buttonCount: 5,
      pageSize: defaultPageSize,
    },
    dataSource: {
      transport: {
        read: {
          type: 'GET',
          url: 'http://localhost:56813/api/User/GetList',
          dataType: 'json',
          data(e) {
            if (e.filter === undefined) {
              e.filter = {
                filters: [],
                logic: 'and',
              };
            }

            e.filter = JSON.stringify(e.filter);
            return { data: JSON.stringify(e) };
          },
        },
      },
      schema: {
        model: Model.getSchema(),
        data: 'data',
        total: 'total',
      },
      serverPaging: true,
      serverFiltering: true,
      pageSize: defaultPageSize,
    },
    toolbar: kendo.template(renderDefaultToolbar({ class: 'user-add', element: 'a', href: "\\#/users/create" }, { class: 'user-delete', element: 'button' })),
    dataBound: onDataBound,
  }).data("kendoGrid");
}


function onDataBound(e) {
  $('.user-delete').off('click').on('click', () => {
    const checkedItem = $selector.find('tbody').find('input:checked');
    if (checkedItem.length) {
      const items = checkedItem.map((i, item) => table.dataSource.getByUid($(item).closest('tr').data('uid'))).get();

      $.ajax({
        type: "post",
        url: "http://localhost:56813/api/user/delete",
        data: JSON.stringify(Array.from(items, item => item.get('id'))),
        dataType: "json"
      }).done(function (response) {
        table.dataSource.read();
      })
        .fail(function (response) {
          console.log("Fail");
          console.log(response);
        });
    }
  });
}


export {
  initTable
}