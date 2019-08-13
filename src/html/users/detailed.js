const template = `
<script type="text/x-kendo-template">
<div class="content">
  <div id="user-detailed" class="card card-default card-body">
    <div class="row">
      <div class="col-md-4">
          <div class="form-group">
            <img id="main-view" # if (data.photoUrl) { # data-bind="attr: { src: photoUrl }" # } else {# src="/some_folder/no-image-icon.png" # } # class="img-responsive" style="max-height: 100%;max-width: 100%;">
            <button id="btn-add-user-photo" class="btn btn-primary">Изменить фото</button> 
            <input type="file" accept="image/x-png,image/jpeg"  id="add-user-photo-input" style="display: none">    
         </div>


      </div>
      <div class="col-md-4">
          <div class="form-group" style="width: 95%;">
            <label for="exampleInputEmail1">Логин</label>
            <input type="text" class="form-control" placeholder="Введите логин" data-bind="value: userName" required >
          </div>
          <div class="form-group" style="width: 95%;">
            <label for="exampleInputPassword1">Пароль</label>
            <input type="password" class="form-control" placeholder="Введите пароль" data-bind="value: passwordHash" required >
          </div>

          <div class="form-group" style="width: 95%;">
            <label for="exampleInputPassword1">ФИО</label>
            <input type="text" class="form-control" placeholder="Введите ФИО" data-bind="value: fullName" >
          </div>
     </div>

     <div class="col-md-4">
        <div class="form-group" style="width: 95%;">
          <label for="exampleInputPassword1">E-mail</label>
          <input type="text" class="form-control" placeholder="Введите E-mail" data-bind="value: email" >
        </div>

        <div class="form-group" style="width: 95%;">
          <label for="exampleInputPassword1">Начальник</label>
          <input type="text" class="form-control" placeholder="Введите Начальника" data-bind="value: chiefName" >
        </div>

        <div class="form-group" style="width: 95%;">
          <label for="exampleInputPassword1">Телефон</label>
          <input type="text" class="form-control" placeholder="Введите Телефон" data-bind="value: phone" >
        </div>

     </div>
    </div>

        <!-- /.card-body -->

        <div style="float: left">
          <button id="btn-add-user" class="btn btn-primary">Подтвердить</button>
          <button id="btn-close-user" class="btn btn-danger">Назад</button>
        </div>

   </div>
</div>

</script>`;

export default template;
