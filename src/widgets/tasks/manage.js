import { showPopup } from './modules/popup';

import { renderDefaultToolbar, renderTabsToolbar } from '../../html/common/toolbar';

import Model from '../../models/tasks/task';

let table,
  projectId,
  selector;
const defaultPageSize = 25;
//const filterOptions = {
//  cell: {
//    template: () => { },
//    showOperators: false,
//  },
//};

const filterOptions = false;
function initTable(selector_, projId) {
  projectId = projId;
  selector = selector_;

  const toolbar = projectId != null
    ? kendo.template(renderDefaultToolbar({ class: 'task-add', element: 'button' }))
    : kendo.template(renderTabsToolbar(null, null));

  table = $(selector).kendoGrid({
    columns: [
      //{
      //  selectable: true,
      //  width: 30,
      //  hidden: false,
      //  menu: false,
      //  title: "<span class='field-selectable'></span>",
      //},
      {
        field: 'id',
        template: '<input type="number" value="#: data.id #" hidden/>',
        hidden: true,
        menu: false,
        title: "<span class='field-id'></span>",
      },
      {
        field: 'statusName',
        title: 'Статус',
        filterable: filterOptions,
        //width: 80,
      },
      {
        field: 'name',
        title: 'Название',
        filterable: filterOptions,
        //width: 150,
      },
      {
        field: 'users',
        title: 'Исполнители',
        filterable: filterOptions,
        template: `#= data.users.map(function(item) { return item['userName']; }).join() #`
        //width: 150,
      },
      //{
      //  field: 'performers',
      //  title: 'Исполнители',
      //  filterable: filterOptions,
      //  //width: 150,
      //},
      {
        field: 'finishDatetime',
        title: 'Дата окончания',
        filterable: filterOptions,
        template: `#= kendo.toString(kendo.parseDate(finishDatetime), 'dd.MM.yyyy HH:mm:ss') #`
        //width: 150,
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
          url: 'http://localhost:56813/api/tasks/GetAll',
          dataType: 'json',
          data(e) {
            if (e.filter === undefined) {
              e.filter = {
                filters: [],
                logic: 'and',
              };
            }

            if (projectId != null) {
              e.filter.filters.push({
                field: 'projectId',
                operator: 'eq',
                value: projectId,
              });
            } else {
              e.filter.filters.push({
                field: 'typeview',
                operator: 'eq',
                value: $('#nav-bar-list-toolbar').find('.is_active').index(),
              });
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
    toolbar,
    dataBound: onDataBound,
  }).data("kendoGrid");
}

function onDataBound(e) {
  const grid = e.sender;
  
  $('.task-add').off('click').on('click', () => {
    showPopup(grid, projectId);
  });

  $(selector).find('tbody tr').off().on('click', (e) => {
    const element = e.target;
    const task = grid.dataItem($(element).closest("tr"));
    showPopup(grid, projectId, task.id)
  });

  $('.task-delete').off('click').on('click', () => {
    const checkedItem = $selector.find('tbody').find('input:checked');
    if (checkedItem.length) {
      const items = checkedItem.map((i, item) => grid.dataSource.getByUid($(item).closest('tr').data('uid'))).get();

      $.ajax({
        type: "post",
        url: "",
        data: JSON.stringify(Array.from(items, item => item.get('id'))),
        dataType: "json"
      }).done(function (response) {
        grid.dataSource.read();
      })
        .fail(function (response) {
          console.log("Fail");
          console.log(response);
        });
    }
  });

  const $mainLink = $('.bar-link-toolbar');
  $mainLink.click((event) => {
    const $target = $(event.currentTarget);
    $mainLink.removeClass('is_active');
    $target.addClass('is_active');
    grid.dataSource.read();
  });
}

export {
  initTable
}