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
              <li class="active">
                <a class="lang-select" data-lang="en" href="#">English <i class="fa fa-check"></i></a>
              </li>
              <li><a class="lang-select" data-lang="it" href="#">Italiano</a></li>
            </ul>
          </li>
          <li class="topbar-devider"></li>
          <li><a href="page_faq.html" data-i18n="nav.help"></a></li>
          <li class="topbar-devider"></li>
          <li><a href="page_login.html">Login</a></li>
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
