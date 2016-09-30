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
<h2 class="heading-md">Manage your Name, ID and Email Addresses.</h2>
<p>Below are the name and email addresses on file for your account.</p>
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
    {{name}}
    <span>
      <a class="pull-right" href="#">
        <i class="fa fa-pencil"></i>
      </a>
    </span>
  </dd>
  <hr>
  <dt><strong data-i18n="profile.address"></strong></dt>
  <dd>
    {{address}}
    <span>
      <a class="pull-right" href="#">
        <i class="fa fa-pencil"></i>
      </a>
    </span>
  </dd>
  <hr>
  <dt><strong data-i18n="profile.phone"></strong></dt>
  <dd>
    {{phone}}
    <span>
      <a class="pull-right" href="#">
        <i class="fa fa-pencil"></i>
      </a>
    </span>
  </dd>
  <hr>
  <dt><strong data-i18n="profile.favoriteSuppliers">Office Number </strong></dt>
  <dd>
    {{favoriteSuppliers}}
    <span>
      <a class="pull-right" href="#">
        <i class="fa fa-pencil"></i>
      </a>
    </span>
  </dd>
  <hr>     
</dl>
<button type="button" class="btn-u btn-u-default">Cancel</button>
<button type="button" class="btn-u">Save Changes</button>
`;
