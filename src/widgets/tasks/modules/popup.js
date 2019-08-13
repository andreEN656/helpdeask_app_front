import Model from '../../../models/tasks/task';
import ModelUser from '../../../models/user/user';
import ModelComment from '../../../models/tasks/comment';

import popupTemplate from '../../../html/tasks/popup';
import listViewTemplate from '../../../html/tasks/commentsListView';

import { getLocalStorage } from '../../../app/utils';

let popup,
  templatePopupKendo,
  grid,
  projectId,
  model,
  commentModel,
  validator;

let $commentPhotos;
let files = [];
function createPopup() {
  popup = $('#popup-tasks-container')
    .kendoWindow({
      resizable: false,
      draggable: false,
      modal: true,
      title: "Новый проект",
      visible: false,
      height: 450,
      width: 900,
      mobile: false,
    }).data("kendoWindow");

  popup.center();
}

function showPopup(mainGrid, projId, taskId) {
  files = [];
  projectId = projId;
  grid = mainGrid;
  if (popup === undefined) {
    createPopup();
  }

  if (taskId == null) {
    model = Model.create();
    model.set('projectId', projectId);
    initTemplate(model);
  } else {
    $.get('http://localhost:56813/api/tasks/get', { id: taskId })
      .then((response) => {
        model = Model.initFromObject(response);
        initTemplate(model);
      });
  }


  popup.open();
}

function initTemplate(model) {
  templatePopupKendo = kendo.template($(popupTemplate).html());
  popup.content(templatePopupKendo(model)).title('Новый проект');
  kendo.bind($('#popup-detailed'), model);

  if (model.get('id') !== null) {
    commentModel = ModelComment.create();
    commentModel.set('taskId', model.get('id'));

    kendo.bind($('#comment'), commentModel);
    initUpdateTemplate();
  } else {
    initCreateTemplate();
  }
  $('#btn-close-project').off('click').on('click', () => {
    popup.close();
  });

  createDropDown('#priority-dropdown', 'task_priority');
  createDropDown('#status-dropdown', 'task_status');

  //upload-comment-file
  const $fileUploadClick = $('#upload-comment-file');
  const $fileInput = $('#comment-file-input');
  $commentPhotos = $('#comment-photos');

  $fileUploadClick.off('click').on('click', () => {
    $fileInput.click();
  });

  $("#datetimepicker").kendoDateTimePicker({
    culture: "ru-RU",
    value: new Date(),
    dateInput: true,
    timeFormat: "HH:mm",
    format: "MM/dd/yyyy HH:mm",

  }).data("kendoDateTimePicker");


  $fileInput.change(function () {
    const [content] = this.files;
    const blob = content.slice(0, -1, content.type);
    const [, ext] = content.name.split('.');
    files.push(content);
    $commentPhotos.append(`<div style="display: inline-block; padding:5px 0px;">${content.name}
                                    <button class="button-close remove-image-btn" style="padding: 0px 3px 3px 3px;
    position: relative;background: #605f61;cursor: pointer;color: #fff;border: 1px solid;border-radius: 30px;line-height: 15px;">
      x</button>
                                    </div>`);
    $('.remove-image-btn').off('click').on('click', function () { $(this).parent().remove() });
  });

  $fileInput.off('click').on('click', function () {
    this.value = null;
  });

  validator = $('#popup-detailed').kendoValidator().data("kendoValidator");
}

function callbackAjax(e) {
  popup.close();
  grid.dataSource.read();
}

function initUpdateTemplate() {
  const commentsListView = $("#listView-comments").kendoListView({
    template: listViewTemplate,
    dataSource: {
      transport: {
        read: function (options) {
          options.success(model.comments);
        },
      },
      schema: {
        model: ModelComment.getSchema(),
      },
    },
    dataBound: function (e) {
      const items = e.items;
      const senderItems = e.sender.items();
      senderItems.each(function (index) {
        const item = $("#listView-comments").data("kendoListView").dataItem(this);
        if (item.files.length !== 0) {
          const $this = $(this);
          const $fileContainer = $this.find('#attach-files');

          item.files.forEach(file => {
            $fileContainer.append(`<a href="${file.url}" target="_blank"> ${file.name} </a>`);
          });
        }
      });
    }


  }).data("kendoListView");
  $('#btn-add-task').off('click').on('click', () => {
    if (validator.validate()) {
      model.set('finishDatetime', kendo.toString(kendo.parseDate(model.get('finishDatetime')), 'yyyy-MM-dd HH:mm:ss'));
      //const users = multiselectUsers.value();
      //model.users = users;
      if (commentModel.get('text') != "") {
        save(commentModel, 'http://localhost:56813/api/tasks/CreateComment');
        files = [];
      }
      save(model, 'http://localhost:56813/api/tasks/Update');
    }
  });

  if (model.files.length !== 0) {
    const $filesDescriptions = $('#files-descriptions');

    model.files.forEach(file => {
      $filesDescriptions.append(`<a href="${file.url}" target="_blank"> ${file.name} </a>`);
    });

  }
}

function initCreateTemplate() {
  $("#datetimepicker").kendoDateTimePicker({
    culture: "ru-RU",
    value: new Date(),
    dateInput: true,
    timeFormat: "HH:mm",
    //format: "dd.MM.yyyy HH:mm",
  }).data("kendoDateTimePicker");

  const multiselectUsers = $("#users-multiselect").kendoMultiSelect({
    autoClose: false,
    autoBind: true,
    dataTextField: 'userName',
    dataValueField: 'id',
    dataSource: {
      transport: {
        read: {
          type: 'GET',
          url: 'http://localhost:56813/api/User/GetList',
          dataType: 'json',
        },
      },
      schema: {
        model: ModelUser.getSchema(),
        data: 'data',
      },

    },
  }).data("kendoMultiSelect");

  $('#btn-add-task').off().off('click').on('click', () => {
    if (validator.validate()) {
      model.set('finishDatetime', kendo.toString(kendo.parseDate(model.get('finishDatetime')), 'yyyy-MM-dd HH:mm:ss'));
      const usersData = multiselectUsers.dataSource.data();
      const users = multiselectUsers.value().map((item) => {
        const [user] = usersData.filter((data) => data.id === item);
        return { userId: item, userName: user.userName };
      });

      model.users = users;
      save(model, 'http://localhost:56813/api/tasks/create');
    }
  });
}


function createDropDown(selector, tableName) {
  const dropdownShops = $(selector).kendoDropDownList({
    autoBind: true,
    dataTextField: 'name',
    dataValueField: 'id',
    dataSource: {
      transport: {
        read: {
          type: 'GET',
          url: 'http://localhost:56813/api/base/GetProperty',
          dataType: 'json',
          data: e => ({
            tableName
          }),
        },
      },
      //requestStart: () => { progress(true, $('#popup-task-container')) },
      //requestEnd: () => { progress(false, $('#popup-task-container')) },
      //schema: {
      //  model: ModelShopBase.getSchema(),
      //},
    },
    //change: function (e) {
    //  e.sender.element.siblings().removeClass('k-invalid');
    //  currentTask.set('shop', this.text());
    //}
  }).data("kendoDropDownList");
}


function save(task, url) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();

    const $images = $commentPhotos.find($("a"));
    //files.each(function (index) {
    //  formData.append('images', imageEditor.imageURLtoFile($(this).attr('href'), `image${index}`));
    //});
    files.forEach((data) => {
      formData.append('images', data);
    });

    formData.append('data', JSON.stringify(task.toJSON()));

    const authData = getLocalStorage('auth');


    //formData.append('__RequestVerificationToken', $('input[name^=__RequestVerificationToken]').first().val());
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Authorization", 'Bearer ' + authData.token);
    //xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(formData);
    xhr.onload = (response) => {
      callbackAjax();
    };
    xhr.onerror = () => {
      reject();
    };
  });
}

export {
  showPopup
}