const template = `
<script type="text/x-kendo-template">
      <div id="popup-detailed">
        <div>
          <div class="flex-container flex-container-header">
            <div>
              <p>АВТОР:</p>
# if (data.id !== null) { # 
              <b> #= fromUserName # </b>
# } else{ #
              <b> <Я> </b>
#} #
            </div>
            <div>
              <p>ПРИОРИТЕТ:</p>
               <p><input id="priority-dropdown" data-bind="value: priorityId" name="type" required validationMessage="Выберите приоритет"/></p>
            </div>
            <div>
              <p>ИСПОЛНИТЕЛИ:</p>
# if (data.id !== null) { # 
              <b> #= users.map(function(item) { return item['userName']; }).join() # </b>
# } else{ #
              <p><select id="users-multiselect" multiple="multiple" style="width: 12.4em;" data-placeholder="Выберите исполнителей" required validationMessage="Выберите исполнителей"></select></p>
#} #
            </div>
            <div>
              <p>ДАТА ВЫПОЛНЕНИЯ:</p>
               <p><input id="datetimepicker" data-bind="value: finishDatetime" required validationMessage="Выберите дату"/></p>
            </div>
          </div> 

          <div class="flex-container flex-container__cs">
            <div class="status">
               <h2>Статус</h2>
               <p><input id="status-dropdown" data-bind="value: statusId" name="type" required validationMessage="Выберите статус"/></p>
            </div>

            <div class="comments">
                <h2>Название</h2>
# if (data.id !== null) { # 
                <textarea disabled style="width: 100%;" maxlength="60" rows="1" placeholder="Укажите название.." class="placement-attr-item k-textbox k-invalid" type="text" data-bind="value: name" required aria-invalid="true"></textarea>
                <h2>Описание</h2>

                <div style="display: -webkit-flex; -webkit-align-items: flex-end;">
                    <textarea disabled style="width: 100%;" maxlength="252" rows="4" placeholder="Укажите комментарий.." class="placement-attr-item k-textbox" id="comment-textarea" type="text" name="comment-area" data-bind="value: description"></textarea>                  
                </div>
                <div id="files-descriptions"> </div>
                <h2> Добавление комментария </h2>                      
                <div id="comment" style="display: -webkit-flex; -webkit-align-items: flex-end;">
                  <textarea  style="width: 100%;"  data-bind="value: text" rows="3" placeholder="Укажите комментарий.." class="placement-attr-item k-textbox" id="comment-textarea" type="text" name="comment-area"/>
                  <button type="button" class="custom_button custom_button_attach" id="upload-comment-file" title="Прикрепить файл">
                    <i class="fas fa-paperclip"></i>
                  </button> 

                </div>
                <input type="file" accept="image/x-png,image/jpeg"  id="comment-file-input" style="display: none">    
                <div id="comment-photos"> </div>

                <button id="btn-add-task" class="btn btn-primary">Сохранить и закрыть</button>
# } else{ #
                <textarea style="width: 100%;" maxlength="60" rows="1" placeholder="Укажите название.." class="placement-attr-item k-textbox" type="text" data-bind="value: name" aria-invalid="true" required validationMessage="Введите название"></textarea>
                <h2>Описание</h2>

                <div style="display: -webkit-flex; -webkit-align-items: flex-end;">
                    <textarea style="width: 100%;" maxlength="252" rows="4" placeholder="Укажите комментарий.." class="placement-attr-item k-textbox" id="comment-textarea" type="text" name="comment-area" data-bind="value: description" required validationMessage="Введите описание"></textarea>
                   
                    <button type="button" class="custom_button custom_button_attach" id="upload-comment-file" title="Прикрепить файл">
                      <i class="fas fa-paperclip"></i>
                    </button> 
                </div>

                <input type="file" id="comment-file-input" style="display: none">

                <div id="comment-photos" style="min-height: 110px"> </div>

                <button id="btn-add-task" class="btn btn-primary">Создать и закрыть</button>
#} #
                
# if (data.id !== null) { # 
              <h2 style="margin-top: 45px!important;">Комментарии</h2>
              <div class="placement-attr__item placement-attr-item placement-attr-item_thin-title">
                <ul id="listView-comments">
                </ul>
              </div>
 # } #
            </div>
          </div>
        </div>
      </div><!-- /.container-fluid -->
</script>
`;

export default template;