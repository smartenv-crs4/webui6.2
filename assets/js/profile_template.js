var customerProfileTemplate = `
<h2 class="heading-md" data-i18n="profile.title"></h2>
<br>
<dl class="dl-horizontal">
  <dt><strong data-i18n="profile.email"></strong></dt>
  <dd>
    {{email}}
    <!-- span>
      <a class="pull-right" href="#">
        <i class="fa fa-pencil"></i>
      </a>
    </span -->
  </dd>
  <hr>
  <dt><strong data-i18n="profile.type"></strong></dt>
  <dd id="pType" data-accountType={{type}}>
    {{typeTranslate}}
  </dd>
  <hr>
  <hr>
  <!-- --------------------------------- -->

  <dt><strong data-i18n="profile.logo"></strong></dt>
  <dd>
    <div class="row">
      <div class="col-xs-10">
        <input id="logoInput" name="logo"  type="file">
      </div>
        <button type="button" class="btn-u" data-i18n="profile.uploadLogo" onclick="uploadLogo()"></button>
    </div>    
  </dd>

  <!-- -------------------------------- -->

  <hr>
  <dt><strong data-i18n="profile.name"></strong></dt>
  <dd>
    <a class="editable editable-click" data-name="name" data-i18n="[data-emptytext]profile.emptyText" id="ed-name" data-type="text" href="#">{{name}}</a>
    <!-- span>
      <a class="pull-right" href="#">
        <i class="fa fa-pencil"></i>
      </a>
    </span -->
  </dd>
  <hr>
  <dt><strong data-i18n="profile.referenceName"></strong></dt>
  <dd>
    <a class="editable editable-click" data-name="references.name" data-i18n="[data-emptytext]profile.emptyText" id="ed-referencename" data-type="text" href="#">{{references.name}}</a>
  </dd>
  <hr>
  <dt><strong data-i18n="profile.referenceSurname"></strong></dt>
  <dd>
    <a class="editable editable-click" data-name="references.surname" data-i18n="[data-emptytext]profile.emptyText" id="ed-referencesurname" data-type="text" href="#">{{references.surname}}</a>    
  </dd>
  <hr>
  <dt><strong data-i18n="profile.address"></strong></dt>
  <dd>
    <a class="editable editable-click" data-name="address" data-i18n="[data-emptytext]profile.emptyText" id="ed-address" data-type="text" href="#">{{address}}</a>
    <!-- span>
      <a class="pull-right" href="#">
        <i class="fa fa-pencil"></i>
      </a>
    </span -->
  </dd>
  <hr>
  <dt><strong data-i18n="profile.phone"></strong></dt>
  <dd>
    <a class="editable editable-click" data-id="fld-phone" data-name="phone" data-i18n="[data-emptytext]profile.emptyText" id="ed-phone" data-type="tel" href="#">{{phone}}</a>
    <!-- span>
      <a class="pull-right" href="#">
        <i class="fa fa-pencil"></i>
      </a>
    </span -->
    {{#if_eq phoneVerified 'true'}}
    <div style="margin-left:12px; display:inline-block">
      <span class="glyphicon glyphicon-ok" style="color:green;"></span>
      <span data-i18n="profile.verified"></span>
    </div>
    {{/if_eq}}

    {{#if_not_eq phoneVerified 'true'}}
    {{#if phone}}
      <div style="display: inline-block;margin-left: 12px;" id="phoneVerificationBlock">
         <button type="button" class="btn-u" data-i18n="profile.sendVerificationCode" onclick="sendPhoneVerificationCode()"></button>
         <div class="input-group">
           <span class="input-group-btn">
             <button type="button" data-i18n="profile.verifyCode" onclick="verifyPhoneCode()" class="btn-u btn-outline-secondary">
             </button>
           </span>
           <input class="form-control" id="phoneValidationCode"  type="text">
         </div>
      </div>

     {{/if}}

    {{/if_not_eq}}


  </dd>
  <!-- hr>
  <dt><strong data-i18n="profile.logo"></strong></dt>
  <dd>
    <a class="editable editable-click" data-name="logo" data-i18n="[data-emptytext]profile.emptyText" id="ed-logo" data-type="text" href="#">{{logo}}</a>
  </dd>
  <hr>
  <dt><strong data-i18n="profile.favoriteSuppliers"></strong></dt>
  <dd>
    <a class="editable editable-click" data-name="favoriteSupplier" data-i18n="[data-emptytext]profile.emptyText" id="ed-favoriteSuppliers" data-type="text" href="#">{{favoriteSuppliers}}</a>    
  </dd -->
  <hr>     
</dl>
<button type="button" class="btn-u btn-u-default" data-i18n="profile.cancel" onclick="getUserProfile()">Cancel</button>
<button type="button" class="btn-u" data-i18n="profile.save" onclick="updateProfile()">Save Changes</button>
`;

 
var supplierProfileTemplate = `
<h2 class="heading-md" data-i18n="profile.title"></h2>
<br>
<dl class="dl-horizontal">
  <dt><strong data-i18n="profile.email"></strong></dt>
  <dd>
    {{email}}
    <span>
      <a class="pull-right" href="#">
        <!-- i class="fa fa-pencil"></i -->
      </a>
    </span>
  </dd>
  <hr>
  <dt><strong data-i18n="profile.type"></strong></dt>
  <dd id="pType" data-accountType={{type}}>    
    {{typeTranslate}}
    <span>
      <a class="pull-right" href="#">
      </a>
    </span>
  </dd>
  <hr>
  <hr>
  <!-- --------------------------------- -->

  <dt><strong data-i18n="profile.logo"></strong></dt>
  <dd>
    <div class="row">
      <div class="col-xs-10">
        <input id="logoInput" name="logo"  type="file">
      </div>
        <button type="button" class="btn-u" data-i18n="profile.uploadLogo" onclick="uploadLogo()"></button>
    </div>    
  </dd>

  <!-- -------------------------------- -->

  <hr>
  <dt><strong data-i18n="profile.name"></strong></dt>
  <dd>
    <a class="editable editable-click" data-name="name" data-i18n="[data-emptytext]profile.emptyText" id="ed-name" data-type="text" href="#">{{name}}</a>
    <!-- span>
      <a class="pull-right" href="#">
        <i class="fa fa-pencil"></i>
      </a>
    </span -->
  </dd>
  <hr>

  <dt><strong data-i18n="profile.referenceName"></strong></dt>
  <dd>
    <a class="editable editable-click" data-name="references.name" data-i18n="[data-emptytext]profile.emptyText" id="ed-referencename" data-type="text" href="#">{{references.name}}</a>
  </dd>
  <hr>
  <dt><strong data-i18n="profile.referenceSurname"></strong></dt>
  <dd>
    <a class="editable editable-click" data-name="references.surname" data-i18n="[data-emptytext]profile.emptyText" id="ed-referencesurname" data-type="text" href="#">{{references.surname}}</a>    
  </dd>
  <hr>
  <dt><strong data-i18n="profile.address"></strong></dt>
  <dd>
    <a class="editable editable-click" data-name="address" data-i18n="[data-emptytext]profile.emptyText" id="ed-address" data-type="text" href="#">{{address}}</a>
    <!-- span>
      <a class="pull-right" href="#">
        <i class="fa fa-pencil"></i>
      </a>
    </span -->
  </dd>
  <hr>
  <dt><strong data-i18n="profile.phone"></strong></dt>
  <dd>
    <a class="editable editable-click" data-id="fld-phone" data-name="phone" data-i18n="[data-emptytext]profile.emptyText" id="ed-phone" data-type="tel" href="#">{{phone}}</a>
    <!-- span>
      <a class="pull-right" href="#">
        <i class="fa fa-pencil"></i>
      </a>
    </span -->
    {{#if_eq phoneVerified 'true'}}
      <div style="margin-left:12px; display:inline-block">
       <span class="glyphicon glyphicon-ok" style="color:green;"></span>
        <span data-i18n="profile.verified"></span>
      </div>
    {{/if_eq}}

    {{#if_not_eq phoneVerified 'true'}}
    {{#if phone}}
      <div style="display: inline-block; margin-left: 12px;"  id="phoneVerificationBlock">
         <button type="button" class="btn-u" data-i18n="profile.sendVerificationCode" onclick="sendPhoneVerificationCode()"></button>
         <div class="input-group">
           <span class="input-group-btn">
             <button type="button" data-i18n="profile.verifyCode" onclick="verifyPhoneCode()" class="btn-u btn-outline-secondary">
             </button>
           </span>
           <input class="form-control" id="phoneValidationCode"  type="text">
         </div>
      </div>
    {{/if}}
    {{/if_not_eq}}
  </dd>
  <!-- hr>
  <dt><strong data-i18n="profile.logo"></strong></dt>
  <dd>
    <a class="editable editable-click" data-name="logo" data-i18n="[data-emptytext]profile.emptyText" id="ed-logo" data-type="text" href="#">{{logo}}</a>
  </dd -->
  <hr>
  <dt><strong data-i18n="profile.description"></strong></dt>
  <dd>
    <a class="editable editable-click" data-name="description" data-i18n="[data-emptytext]profile.emptyText" id="ed-description" data-type="textarea" href="#">{{description}}</a>
    <!-- span>
      <a class="pull-right" href="#">
        <i class="fa fa-pencil"></i>
      </a>
    </span -->
  </dd>
  <hr>     
  <dt><strong data-i18n="profile.web"></strong></dt>
  <dd>
    <a class="editable editable-click" data-name="web" data-i18n="[data-emptytext]profile.emptyText" id="ed-web" data-type="text" href="#">{{web}}</a>
    <!-- span>
      <a class="pull-right" href="#">
        <i class="fa fa-pencil"></i>
      </a>
    </span -->
  </dd>
  <hr>
  <dt><strong data-i18n="profile.pIva"></strong></dt>
  <dd>
    <a class="editable editable-click" data-name="pIva" data-i18n="[data-emptytext]profile.emptyText" id="ed-piva" data-type="text" href="#">{{pIva}}</a>
   
  </dd>
  <hr>
</dl>
<button type="button" class="btn-u btn-u-default" data-i18n="profile.cancel" onclick="getUserProfile()"></button>
<button type="button" class="btn-u" data-i18n="profile.save" onclick="updateProfile()"></button>
`;

var changePasswordTemplate = `
<h2 class="heading-md" data-i18n="profile.passwordTitle"></h2>
<p data-i18n="profile.passwordTitle2"></p>
<br>
<div>
  <div class="input-group margin-bottom-20">
    <span class="input-group-addon rounded-left"><i class="icon-lock color-white"></i></span>
    <input type="password" class="form-control rounded-right" data-i18n="[placeholder]profile.oldPasswordPlaceholder" id="oldPassword">
  </div>

  <div class="input-group margin-bottom-20">
    <span class="input-group-addon rounded-left"><i class="icon-lock color-white"></i></span>
    <input type="password" class="form-control rounded-right" data-i18n="[placeholder]profile.newPasswordPlaceholder" id="newPassword1">
  </div>
  
  <div class="input-group margin-bottom-20">
    <span class="input-group-addon rounded-left"><i class="icon-lock color-white"></i></span>
    <input type="password" class="form-control rounded-right" data-i18n="[placeholder]profile.newPassword2Placeholder" id="newPassword2">
  </div>
  <hr />
  <div class="input-group margin-bottom-20">
    <button type="button" class="btn-u" data-i18n="profile.save" onclick="changePassword()"></button>
  </div>
      
</div>
`;



var feedbackTabTemplate = `
<li class="tab-bar"><a data-toggle="tab" href="#feedbackTab" data-i18n="profile.feedback"></a></li>
`;

var feedbackTemplate = `

<div id="feedbackTab" class="profile-edit tab-pane fade">									
  <h2 class="heading-md" data-i18n="profile.feedbackTitle"></h2>
  <div>
    <div style="display:inline-block;margin-right:20px">
     <span id="label_overall" data-i18n="profile.overallFeedback">Overall</span>
     <div id="overall">
     </div>
    </div>
    <div style="display:inline-block;margin-right:20px">
     <span id="label_price" data-i18n="profile.priceFeedback">Price/Value</span>
     <div id="price">
     </div>
    </div>
    <div style="display:inline-block;margin-right:20px">
     <span id="label_cservice" data-i18n="profile.customerFeedback">Customer service</span>
     <div id="cservice">
     </div>
    </div>
    <div style="display:inline-block;margin-right:20px">
     <span id="label_delivery" data-i18n="profile.deliveryFeedback">Delivery</span>
     <div id="delivery">
     </div>
    </div>
    <div style="display:inline-block;margin-right:20px">
     <span id="label_product" data-i18n="profile.productFeedback">Product</span>
     <div id="product">
     </div>
    </div>
  </div>
  <!-- br>
  <p data-i18n="profile.feedbackTitle2"></p>
  <br>
  <div style="text-align:center;width:100%">
      <p data-i18n="profile.feedback_pros" style="font-size:15pt"></p>
      <div id="pros_feedbackBox">     
      </div>
      <p data-i18n="profile.feedback_cons" style="font-size:15pt"></p>
      <div id="cons_feedbackBox">     
      </div>
  </div -->

</div>
`;

var favoriteTabTemplate = `
<li class="tab-bar"><a data-toggle="tab" href="#favoriteTab" data-i18n="profile.favoriteSuppliers"></a></li>
`;

var favoriteTemplate = `
<div id="favoriteTab" class="profile-edit tab-pane fade">									
  <h2 class="heading-md" data-i18n="profile.favoriteTitle"></h2>
  <p data-i18n="profile.favoriteTitle2"></p>
  <br>
  <div id="favoriteSuppliersList">     
  </div>
</div>
`;

var favoriteTableTemplate = `
<div class="table-search-v1 margin-bottom-30">
  <div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Name</th>								
        </tr>
      </thead>
      <tbody>
        {{#each this}}               
          <tr data-supplier-id="{{_id}}">
            <td>
              <a href="page_catalog.html?idSupplier={{_id}}">{{name}}</a>
              <span class="pull-right"  style="cursor:pointer"onclick="removeFavoriteSupplier('{{_id}}')">
                <i class="fa fa-remove"></i>
              </span>
            </td>                  
          </tr>
        {{/each}}							
      </tbody>
    </table>
  </div>
</div>
`;


var documentsTabTemplate = `
<li class="tab-bar"><a data-toggle="tab" href="#documentsTab" data-i18n="profile.documents"></a></li>
`;

var documentsTemplate = `
<div id="documentsTab" class="profile-edit tab-pane fade">									
  <h2 class="heading-md" data-i18n="profile.documentsTitle"></h2>
  <p data-i18n="profile.documentsTitle2"></p>
  <br>
    <div class="row">
      <div class="col-xs-10"><input  type="file" id="documentInput" name="document"></div>
      <button type="button" class="btn-u" data-i18n="profile.uploadDocument" onclick="uploadDocument()"></button>
    </div>
    <hr />
  <div id="documentsList">     
  </div>
</div>
`;


var documentsTableTemplate = `
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
              <a class="supDocLnk"  target="_blank" href="{{url}}"> {{name}} </a>
              <span>                
                <a class="pull-right" data-toggle="confirmation" 
                   data-placement="top" href="#" data-on-confirm="deleteDocument" data-fid="{{fid}}" data-fname="{{name}}" 
                   data-btn-ok-class="btn-success important-white"
                   data-i18n="[data-btn-cancel-label]profile.no;[data-btn-ok-label]profile.yes;[data-title]profile.areYouSure;[data-content]profile.confirmDeleteDocument"
                   data-btn-cancel-class="btn-danger important-white" data-popout="true">
                  <i class="fa fa-remove"></i>
               </a>
             </span>
            </td>                  
          </tr>
        {{/each}}							
      </tbody>
    </table>
  </div>
</div>
`;

var certificationsTabTemplate = `
<li class="tab-bar"><a data-toggle="tab" href="#certificationsTab" data-i18n="profile.certifications"></a></li>
`;

var certificationsTemplate = `
<div id="certificationsTab" class="profile-edit tab-pane fade">									
  <h2 class="heading-md" data-i18n="profile.certificationsTitle"></h2>
  <p data-i18n="profile.certificationsTitle2"></p>
  <br>
<div id="certificationsAdd" style="border: solid 1px #ccc; padding: 8px;" class="margin-bottom-20">
    <div class="row">
      <div class="form-group col-xs-6">
        <input id="iCertName" class="form-control rounded tt-input" data-i18n="[placeholder]profile.certifications" type="text">
      </div>
      <div class="form-group col-xs-6">
        <input id="iCertDate" class="form-control rounded tt-input" data-i18n="[placeholder]profile.certificationsDate" type="text">
      </div>
    </div>
    
    <div class="form-group">
      <textarea id="iCertDescription" class="form-control rounded tt-input" data-i18n="[placeholder]profile.certificationsDescription"></textarea>
    </div>
    <button type="button" class="btn-u" data-i18n="profile.addCertification" onclick="addCertification()"></button>
  </div>
  <div id="certificationsList">     
  </div>
</div>
`;


var certificationsTableTemplate = `
<div class="table-search-v1 margin-bottom-30">
  <div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th data-i18n="profile.certifications"></th>								
          <th data-i18n="profile.certificationsDate"></th>
          <th data-i18n="profile.certificationsDescription"></th>
          <th data-i18n="profile.certificationsActions"></th>
        </tr>
      </thead>
      <tbody>              
        {{#each this}}                         
          <tr data-id="{{name}}">
            <td>
              {{name}}
            </td>
            
            <td>
              {{date}}
            </td>
            
            <td>
              {{description}}
            </td>
            
            <td>              
              <span style="cursor:pointer"                
                 onclick="removeCertification('{{name}}')">
                  <i class="fa fa-remove"></i>
               </span>
             </span>
            </td>                  
          </tr>
        {{/each}}						
      
      </tbody>
    </table>
  </div>
</div>
`;



var categoriesTabTemplate = `
<li class="tab-bar"><a data-toggle="tab" href="#categoriesTab" data-i18n="profile.categories"></a></li>
`;

var categoriesTemplate = `
<div id="categoriesTab" class="profile-edit tab-pane fade">									
  <h2 class="heading-md" data-i18n="profile.categoriesTitle"></h2>
  <p data-i18n="profile.categoriesTitle2"></p>
  <br>
  <div class="row">
    <div class="col-xs-10">
      <input id="acCat" class="form-control rounded tt-input" data-i18n="[placeholder]profile.categories" type="text">
    </div>
    <button type="button" class="btn-u" data-i18n="profile.addCategory" onclick="addUserCategory()"></button>
  </div>

  <div id="categoriesList"></div>
  </div>
</div>
`;

var categoriesTableTemplate = `
<div class="table-search-v1 margin-bottom-30">
  <div class="table-responsive">
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th data-i18n="profile.categories"></th>								
        </tr>
      </thead>
      <tbody>
        {{#each this}}               
          <tr>
            <td>
              <span data-id="{{id}}" > {{name}} </span>
              <span>                
                <a class="pull-right"
                   data-placement="top" href="#" data-catid="{{id}}" onclick="removeUserCategory('{{id}}')">
                  <i class="fa fa-remove"></i>
               </a>
             </span>
            </td>                  
          </tr>
        {{/each}}							
      </tbody>
    </table>
  </div>
</div>
`;





