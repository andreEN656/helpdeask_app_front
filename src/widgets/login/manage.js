
import { router } from '../../app/router';
import * as utils from '../../app/utils';

import template from '../../html/login/main';

import ModelUser from '../../models/user/base';

let user;
function init() {
  user = ModelUser.create();

  const tpl = kendo.template($(template).html());
  $('#app').html(tpl(user));
  kendo.bind($('.login-card-body'), user);

  $('#save-button').on('click', (e) => {
    $.ajax({
      type: 'POST',
      url: 'http://localhost:56813/api/User/Login',
      data: JSON.stringify(user),
      dataType: 'json',
      success: function (done) {
        utils.setLocalStorage('auth', JSON.stringify(done));
        //console.log(router);
       // router.navigate("/");
        //router.navigate("/tasks");
        document.location.reload(true);
      },
      fail: function (jqXHR, textStatus) {
        console.log(jqXHR, textStatus);
      }
    });
  });
  // const view = new kendo.View(template, { wrap: false });
  // layout.showIn('#container', view);
}

export {
  init
}
