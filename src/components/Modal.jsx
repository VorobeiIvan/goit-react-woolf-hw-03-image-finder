import * as basicLightbox from 'basiclightbox';

const instance = basicLightbox.create(`
<div class="overlay">
  <div class="modal">
    <img src="" alt="" />
  </div>
</div>;
`);

instance.show();
