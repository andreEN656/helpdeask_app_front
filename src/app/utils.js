$.ajaxPrefilter((options) => {
  if (!options.beforeSend) {
    options.beforeSend = function (xhr) {
      const authData = getLocalStorage('auth');
      if (authData !== null) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + authData.token);
      }
      if (options.type.toUpperCase() === 'POST') {
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
    }
  }
});

function clickMenuEvent() {
  const $mainLink = $('.menu-link');
  $mainLink.click((event) => {
    console.log('click');
    const $target = $(event.currentTarget);
    $mainLink.removeClass('active');
    $target.addClass('active');
  });
}



function emptyContainer() {
  $('#container').empty();
  $('#container').removeClass('scrollable');
}

function setLocalStorage(key, data) {
  localStorage.setItem(key, data);
}

function getLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (ex) {
    return null;
  }
}


export {
  emptyContainer,
  setLocalStorage,
  getLocalStorage,
  clickMenuEvent
}
