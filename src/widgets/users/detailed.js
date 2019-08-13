import Model from '../../models/user/user';

import template from '../../html/users/detailed';

import { router } from '../../app/router';
import { getLocalStorage } from '../../app/utils';

import * as imageEditor from '../common/imageEditor';

let postUrl,
  photoFile;
function init(id) {
  if (id !== 'create') {
    $.when(
      $.get('http://localhost:56813/api/User/Get', { id }))
      .then((req) => {
        const userModel = Model.initFromObject(req);
        postUrl = 'http://localhost:56813/api/User/Update';
        initTemplate(userModel);
      })
  } else {
    const userModel = Model.create();
    postUrl = 'http://localhost:56813/api/User/Create';
    initTemplate(userModel);
  }
}

function initTemplate(model) {
  const tpl = kendo.template($(template).html());
  $('#container').html(tpl(model));
  kendo.bind($('#user-detailed'), model);

  const validator = $('#user-detailed').kendoValidator().data("kendoValidator");
  $('#btn-add-user').off('click').on('click', () => {
    if (validator.validate()) {
      save(model, postUrl);
    }
  });

  const $fileInput = $('#add-user-photo-input');
  const $mainViewImg = $('#main-view');

  //$mainViewNettoImage[0].src
  $('#btn-add-user-photo').off('click').on('click', () => {
    $fileInput.click();
  });

  $fileInput
    .on('change', function (event) {
      const file = this.files[0];
      imageEditor.fileToImage(file).then(resp => {
        photoFile = file;
        $mainViewImg[0].src = resp.currentSrc;
      });
    }).on('fileclear', function (event) {
      
    });

  //btn-add-user-photo
  $('#btn-close-user').off('click').on('click', () => {
    router.navigate("/users");
  });

}

function save(model, url) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();

    //const $images = $commentPhotos.find($("a"));
    //files.each(function (index) {
    //  formData.append('images', imageEditor.imageURLtoFile($(this).attr('href'), `image${index}`));
    //});
    //files.forEach((data) => {
    //  formData.append('images', data);
    //});
    if (photoFile !== undefined) {
      formData.append('image', photoFile);
    }
    formData.append('data', JSON.stringify(model.toJSON()));

    const authData = getLocalStorage('auth');


    //formData.append('__RequestVerificationToken', $('input[name^=__RequestVerificationToken]').first().val());
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Authorization", 'Bearer ' + authData.token);
    //xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(formData);
    xhr.onload = (response) => {
      router.navigate("/users");
    };
    xhr.onerror = () => {
      reject();
    };
  });
}


export {
  init
}