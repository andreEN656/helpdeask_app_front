const defaultButtonAdd = {
  text: '<span class="k-icon k-i-plus" style="margin: 0 4px 0 0 "></span>Добавить',
  class: 'button-add',
};

const defaultButtonCopy = {
  text: 'Копировать',
  class: 'button-copy',
};

const defaultButtonDel = {
  text: '<span class="k-icon k-i-minus" style="margin: 0 4px 0 0 "></span>Удалить',
  class: 'button-delete',
};

function renderButton(button, buttonType) {
  return `
      <${button.element} 
      class="toolbar__item ${buttonType} k-button k-primary ${button.class} ${
    button.isHidden ? 'is_hidden' : ''
    }" 
      ${button.element === 'a' ? 'role="button"' : ''} 
      ${button.element === 'a' ? `href="${button.href}"` : ''}
      >${button.text}</${button.element}>
    `;
}

function renderDefaultToolbar(add = false, del = false, copy = false, buttonType = '') {
  const defaultButton = { element: 'button', isHidden: false };

  return `
    <div class="toolbar">
      ${
    add
      ? renderButton(Object.assign({ element: 'button', isHidden: false }, defaultButtonAdd, add), buttonType)
      : ''
    }
      ${
    copy
      ? renderButton(Object.assign({ element: 'button', isHidden: false }, defaultButtonCopy, copy), buttonType)
      : ''
    }
      ${
    del
      ? renderButton(Object.assign({ element: 'button', isHidden: false }, defaultButtonDel, del), buttonType)
      : ''
    }
    </div>`;

}

function renderTextboxToolbar(add = false, del = false, copy = false, buttonType = '') {
  return `
          <div id="search-template" class="placement-item__wrapper placement-item__wrapper_columns" style="margin-top: 0em;">
            <div style="padding: 0 .0em .0em!important; margin: 0!important;" class="placement__column_no-line">
              <div class="toolbar">
                  ${
    add
      ? renderButton(Object.assign({ element: 'button', isHidden: false }, defaultButtonAdd, add), buttonType)
      : ''
    }
                  ${
    copy
      ? renderButton(Object.assign({ element: 'button', isHidden: false }, defaultButtonCopy, copy), buttonType)
      : ''
    }
                  ${
    del
      ? renderButton(Object.assign({ element: 'button', isHidden: false }, defaultButtonDel, del), buttonType)
      : ''
    }
                </div>
            </div>
            <div style="padding: .0em .0em .0em!important; margin: 0!important;"  class="placement__column_no-line">           
              <div style="float:right">
                <div style="width: 49em;">
                  <input placeholder="поиск товаров в планограммах.." class="k-textbox" id="good-filter" style="width: calc(100% - 107px)!important;" type="text"/>
                    <button type="button" class="k-button k-button-icon" title="очистить" aria-label="очистить" style="display: none; padding:0.01em; margin: 0.05em 0em 0em 0.0em ; width: 2.066em; height: 2.066em;">
                      <span style="width: 0.99em; height: 0.99em; margin: auto;" class="k-icon k-i-close"></span>
                    </button>
                   <button id="find-by-good" class="k-button k-primary" style="width:6em"><span class="k-icon k-i-search" style="margin: 0 4px 0 0 "></span>Найти</button>
                 </div>
               </div>
             </div>
           </div>`;
}

function renderDropdownToolbar(add = false, del = false, copy = false, buttonType = '') {
  return `
          <div id="search-template" class="placement-item__wrapper placement-item__wrapper_columns" style="margin-top: 0em;">
            <div style="padding: 0 .0em .0em!important; margin: 0!important;" class="placement__column_no-line">
              <div class="toolbar">
                  ${
    add
      ? renderButton(Object.assign({ element: 'button', isHidden: false }, defaultButtonAdd, add), buttonType)
      : ''
    }
                  ${
    copy
      ? renderButton(Object.assign({ element: 'button', isHidden: false }, defaultButtonCopy, copy), buttonType)
      : ''
    }
                  ${
    del
      ? renderButton(Object.assign({ element: 'button', isHidden: false }, defaultButtonDel, del), buttonType)
      : ''
    }
                </div>
            </div>
            <div style="padding: .0em .0em .0em!important; margin: 0!important;"  class="placement__column_no-line">           
              <div style="float:right">
                <input style="width: 7em" id="toolbar-dropdown"/>
              </div>
             </div>
           </div>`;
}

function renderTabsToolbar(add = false, del = false, copy = false, buttonType = '') {
  return `
          <div id="search-template" class="placement-item__wrapper placement-item__wrapper_columns" style="margin-top: 0em;display: flex;padding: 0;">
            <div style="padding: 0 .0em .0em!important; margin: 0 0 6px 0!important;">
              <div class="toolbar">
                  ${
    add
      ? renderButton(Object.assign({ element: 'button', isHidden: false }, defaultButtonAdd, add), buttonType)
      : ''
    }
                  ${
    copy
      ? renderButton(Object.assign({ element: 'button', isHidden: false }, defaultButtonCopy, copy), buttonType)
      : ''
    }
                  ${
    del
      ? renderButton(Object.assign({ element: 'button', isHidden: false }, defaultButtonDel, del), buttonType)
      : ''
    }
              </div>
            </div>
            <div style="padding: .0em .0em .0em!important; margin: 0!important;flex: 1 1 50%;">           
              <div style="float:right">
                <!--<div class="tabstrip">-->
                  <div style=" margin-top: 0.4em; margin-bottom: -.4em;">
                  <ul style="margin-bottom: 0" class="nav-bar-list" id="nav-bar-list-toolbar">
                    <li style="padding-bottom:7px" class="bar-link bar-link-toolbar bar-link__bc-inherit is_active">ВСЕ МОИ</li>
                    <li style="padding-bottom:7px" class="bar-link bar-link-toolbar bar-link__bc-inherit">СОЗДАННЫЕ МНОЙ</li>
                    <li style="padding-bottom:7px" class="bar-link bar-link-toolbar bar-link__bc-inherit">СОЗДАННЫЕ ДЛЯ МЕНЯ</li>
                    <!--<li style="padding-bottom:7px" class="bar-link bar-link-toolbar bar-link__bc-inherit">ВСЕ СОЗДАННЫЕ</li>-->
                  </ul>
                </div>
              </div>
            </div>`;
}

export {
  renderDefaultToolbar,
  renderTextboxToolbar,
  renderDropdownToolbar,
  renderTabsToolbar
}
