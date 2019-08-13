const template = `
<script type="text/x-kendo-template">
 <form role="form">
                <div id="popup-detailed">
                  <div class="form-group" style="width: 95%;">
                    <label for="exampleInputEmail1">Название</label>
                    <input type="text" class="form-control" placeholder="Введите название" data-bind="value: name" required>
                  </div>
                  <div class="form-group" style="width: 95%;">
                    <label for="exampleInputPassword1">Описание</label>
                    <input type="text" class="form-control" placeholder="Введите описание" data-bind="value: attribute01">
                  </div>
                </div>
                <!-- /.card-body -->

                <div style="float: left">
                  <button type="button" id="btn-add-project" class="btn btn-primary">Подтвердить</button>
                </div>

                <div style="float: right">
                  <button type="button" id="btn-close-project" class="btn btn-danger">Отмена</button>
                </div>

              </form>
</script>
`;

export default template;