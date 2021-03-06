var sidebarTemplate = `
<div class=" md-margin-bottom-40; text-center">
  <img class="img-thumbnail profile-img margin-bottom-20" style="max-width: 100px; border: none" src="assets/img/team/img32-md.jpg" alt="" id="imgBox">

  <ul class="list-group sidebar-nav-v1 margin-bottom-40" id="sidebar-nav-1">
      <!-- li class="list-group-item active">
          <a href="page_profile.html"><i class="fa fa-bar-chart-o"></i> Menu</a>
      </li -->
      
      {{#if isSupplier}}
      <li class="list-group-item">
          <a href="page_catalog.html?idSupplier={{idSupplier}}&catalog=true"><i class="fa fa-book"></i> <span data-i18n="catalog.mycatalog"></span></a>
      </li>
      <li class="list-group-item">
          <a href="page_product_new.html"><i class="fa fa-plus"></i> <span data-i18n="product.newProduct"></span></a>
      </li>
      
      {{else}}
      <li class="list-group-item">
          <a href="page_profile_settings.html?tab=favoriteTab"><i class="fa fa-star"></i> <span data-i18n="profile.favoriteSuppliers"></span></a>
      </li>      
      {{/if}}

      <li class="list-group-item">
          <a href="page_rfq_inbox.html"><i class="fa fa-paper-plane"></i><span data-i18n="rfq.myrfqs"></span> </a>
      </li>

      <li class="list-group-item">
          <a href="page_profile_settings.html"><i class="fa fa-cog"></i> <span data-i18n="profile.profileManagement"></span></a>
      </li>
  </ul>






</div>
`;
