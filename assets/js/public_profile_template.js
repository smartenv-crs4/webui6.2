var pTemplate = `
<div class="profile-bio">
  <div class="row">
    <div class="col-md-5">
      {{#if logo}}
        <img class="img-responsive md-margin-bottom-10" src="{{logo}}" alt="" >
      {{else}}
        <img class="img-responsive md-margin-bottom-10" src="assets/img/team/img32-md.jpg" alt="" id="supplierLogo">
       {{/if}}
        
        
    </div>
    <div class="col-md-7">
      <h2 >{{name}}</h2>
      <span><strong data-i18n="publicProfile.web"></strong>{{web}}</span>
      <span><strong data-i18n="publicProfile.address"></strong>{{address}}</span>
      <hr>
      {{description}}
    </div>
  </div>
</div>

<hr>

<div id="documentsList"></div>

`;

var noSupplierTemplate = `
  <div data-i18n="publicProfile.noSupplier"></div>
`;


var documentsListTemplate = `
<div class="table-search-v1 margin-bottom-30">
  <div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th data-i18n="profile.documents"></th>								
        </tr>
      </thead>
      <tbody>
        {{#each this}}               
          <tr>
            <td>
              <a href="{{url}}"> {{name}} </a>              
            </td>                  
          </tr>
        {{/each}}							
      </tbody>
    </table>
  </div>  
</div>
`;
