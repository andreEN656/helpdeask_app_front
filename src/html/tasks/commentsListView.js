const template = `     
<div style="width: 100% !important; height: auto; margin-bottom: 0.7em;">

  <div style="padding: .5em; background-color: rgb(242,242,242);">
  <i class="fas fa-user"></i>
  <span class="comment-user"> #= userName # </span> 
  <span class="comment-date"> #= kendo.toString(kendo.parseDate(datetime), 'dd.MM.yyyy HH:mm:ss') # </span></div>
  <div style="-webkit-border-radius: 2px; background-color: white; -webkit-box-shadow: 0 0 4px rgba(0,0,0,0.1);">
    <div style='padding: 10px;'><p> #= text #  </p></div>
    <div id="attach-files" style="padding: 10px;"></div>
  </div>
</div >`;

export default template;