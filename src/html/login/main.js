const template = `
<script type="text/x-kendo-template">
<div class="login-box">
  <div class="login-logo">
    <a href=""><b>HelpDeskSystem</b></a>
  </div>
  <!-- /.login-logo -->
  <div class="card">
    <div class="card-body login-card-body">
      <p class="login-box-msg">Авторизуйтесь в системе</p>

        <div class="input-group mb-3">
          <input data-bind="value: userName" type="login" class="form-control" placeholder="Логин">
          <div class="input-group-append input-group-text">
              <span class="fas fa-envelope"></span>
          </div>
        </div>
        <div class="input-group mb-3">
          <input data-bind="value: password" type="password" class="form-control" placeholder="Пароль">
          <div class="input-group-append input-group-text">
              <span class="fas fa-lock"></span>
          </div>
        </div>
        <div class="row">
          <div class="col-8">

          </div>
          <!-- /.col -->
          <div class="col-4">
            <button id="save-button" type="submit" class="btn btn-primary btn-block btn-flat">Войти</button>
          </div>
          <!-- /.col -->
        </div>


    <!-- /.login-card-body -->
  </div>
</div>
<!-- /.login-box -->

</script>
`;
export default template;
