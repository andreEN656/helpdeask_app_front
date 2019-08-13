import Model from '../../../models/projects/base';

import popupTemplate from '../../../html/projects/popup';

let popup,
  templatePopupKendo,
  grid;
function showPopup(mainGrid) {
  grid = mainGrid;
  if (popup === undefined) {
    createPopup();
  }
  popup.open();
}

function createPopup() {
  const model = Model.create();

  templatePopupKendo = kendo.template($(popupTemplate).html());

  popup = $('#popup-projects-container')
    .kendoWindow({
      resizable: false,
      draggable: false,
      modal: true,
      title: "Новый проект",
      visible: false,
      //height: 550,
      width: 870,
      mobile: false,
    }).data("kendoWindow");
  popup.content(templatePopupKendo(model)).title('Новый проект');
  kendo.bind($('#popup-detailed'), model);

  popup.center();

  $('#btn-add-project').off().on('click', () => {
    const validator = $('#popup-projects-container').kendoValidator().data("kendoValidator");
    if (validator.validate()) {
      $.ajax({
        type: "post",
        url: "http://localhost:56813/api/projects/create",
        data: JSON.stringify(model),
        dataType: "json"
      }).done(function (response) {
        grid.dataSource.read();
        popup.close();
      })
        .fail(function (response) {
          console.log("Fail");
          console.log(response);
        });
    }
  });


  $('#btn-close-project').off('click').on('click', () => {
    popup.close();
  });
}

export {
  showPopup
}