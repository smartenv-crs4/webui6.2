var header_template = `	<div class="header">
    <div class="container">
      <!-- Logo -->
      <a class="logo" href="index.html">
        <img src="assets/img/port/logo1-default.png" alt="Logo"/>
      </a>
      <!-- End Logo -->

      <!-- Topbar -->
      <div class="topbar">
        <ul class="loginbar pull-right">
          <li class="hoverSelector">
            <i class="fa fa-globe"></i>
            <a>Languages</a>
            <ul class="languages hoverSelectorBlock">
              <li class="active ">
                <a class="" data-lng="en" href="#">English <i class="fa fa-check"></i></a>
              </li>
              <li><a href="#" data-lng="en">English</a></li>
              <li><a  data-lng="it" href="#">Italiano</a></li>
            </ul>
          </li>
          <li class="topbar-devider"></li>
          <li><a href="page_faq.html" data-i18n="nav.help">Help</a></li>
          <li class="topbar-devider"></li>
          <li><a href="page_login_and_registration.html">Login</a></li>
          <li class="topbar-devider"></li>
          <li><a href="#" onclick="logout()">Logout</a></li>
        </ul>
      </div>
      <!-- End Topbar -->

      <!-- Toggle get grouped for better mobile display -->
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="fa fa-bars"></span>
      </button>
      <!-- End Toggle -->
    </div><!--/end container-->

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse mega-menu navbar-responsive-collapse">
      <div class="container">
        <ul class="nav navbar-nav">
          <!-- Home -->
          <li class="dropdown active">
            <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" >
              Home
            </a>
            <ul class="dropdown-menu">

            </ul>
          </li>

        </ul>
      </div><!--/end container-->
    </div><!--/navbar-collapse-->
  </div>`;

var profile_customer = `
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
  <dd>
    {{type}}
    <!-- span>
      <a class="pull-right" href="#">
        <!-- i class="fa fa-pencil"></i -->
      </a>
    </span -->
  </dd>
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
    <a class="editable editable-click" data-name="phone" data-i18n="[data-emptytext]profile.emptyText" id="ed-phone data-type="text" href="#">{{phone}}</a>
    <!-- span>
      <a class="pull-right" href="#">
        <i class="fa fa-pencil"></i>
      </a>
    </span -->
  </dd>
  <hr>
  <dt><strong data-i18n="profile.logo"></strong></dt>
  <dd>
    <a class="editable editable-click" data-name="logo" data-i18n="[data-emptytext]profile.emptyText" id="ed-logo" data-type="text" href="#">{{logo}}</a>
    <!-- span>
      <a class="pull-right" href="#">
        <i class="fa fa-pencil"></i>
      </a>
    </span -->
  </dd>
  <hr>
  <dt><strong data-i18n="profile.favoriteSuppliers"></strong></dt>
  <dd>
    <a class="editable editable-click" data-name="favoriteSupplier" data-i18n="[data-emptytext]profile.emptyText" id="ed-favoriteSuppliers" data-type="text" href="#">{{favoriteSuppliers}}</a>
    <!-- span>
      <a class="pull-right" href="#">
        <i class="fa fa-pencil"></i>
      </a>
    </span -->
  </dd>
  <hr>     
</dl>
<button type="button" class="btn-u btn-u-default" data-i18n="profile.cancel" onclick="getUserProfile()">Cancel</button>
<button type="button" class="btn-u" data-i18n="profile.save" onclick="updateProfile()">Save Changes</button>
`;

 

var profile_supplier = `
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
  <dd>    
    {{type}}
    <span>
      <a class="pull-right" href="#">
        <!-- i class="fa fa-pencil"></i -->
      </a>
    </span>
  </dd>
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
  <dt><strong data-i18n="profile.address"></strong></dt>
  <dd contenteditable="true">
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
    <a class="editable editable-click" data-name="phone" data-i18n="[data-emptytext]profile.emptyText" id="ed-phone" data-type="text" href="#">{{phone}}</a>
    <!-- span>
      <a class="pull-right" href="#">
        <i class="fa fa-pencil"></i>
      </a>
    </span -->
  </dd>
  <hr>
  <dt><strong data-i18n="profile.logo"></strong></dt>
  <dd>
    <a class="editable editable-click" data-name="logo" data-i18n="[data-emptytext]profile.emptyText" id="ed-logo" data-type="text" href="#">{{logo}}</a>
    <!-- span>
      <a class="pull-right" href="#">
        <i class="fa fa-pencil"></i>
      </a>
    </span -->
  </dd>
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
  <dt><strong data-i18n="profile.categories"></strong></dt>
  <dd>
    <a class="editable editable-click" data-name="categories" data-i18n="[data-emptytext]profile.emptyText" id="ed-categories" data-type="text" href="#">{{categories}}</a>
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
    <!-- span>
      <a class="pull-right" href="#">
        <i class="fa fa-pencil"></i>
      </a>
    </span -->
  </dd>
  <hr>
</dl>
<button type="button" class="btn-u btn-u-default" data-i18n="profile.cancel" onclick="getUserProfile()"></button>
<button type="button" class="btn-u" data-i18n="profile.save" onclick="updateProfile()"></button>
`;




