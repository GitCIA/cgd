(function () {
  'use strict';

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  // Mobile menu
  const toggle = qs('[data-mobile-menu-toggle]');
  const menu = qs('[data-mobile-menu]');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('hidden');
    });
  }

  // Basic toast notifications (used by contact form)
  const toastContainer = qs('#toast-container');
  function toast(message, type) {
    if (!toastContainer) return;
    const el = document.createElement('div');
    el.className = 'toast ' + (type || 'success');
    el.innerHTML = '<div class="text-sm"><div class="font-semibold">' +
      (type === 'error' ? 'Error' : 'Success') +
      '</div><div class="text-gray-600">' +
      String(message) +
      '</div></div>';
    toastContainer.appendChild(el);

    window.setTimeout(function () {
      el.classList.add('removing');
      window.setTimeout(function () {
        el.remove();
      }, 350);
    }, 3200);
  }

  // Contact form handler (no backend; just validates + shows toast)
  const form = qs('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = qs('#name', form);
      const email = qs('#email', form);
      const message = qs('#message', form);

      const missing = [];
      if (!name || !name.value.trim()) missing.push('name');
      if (!email || !email.value.trim()) missing.push('email');
      if (!message || !message.value.trim()) missing.push('message');

      if (missing.length) {
        toast('Please complete: ' + missing.join(', ') + '.', 'error');
        return;
      }

      form.reset();
      toast('Thanks — we received your message and will get back to you shortly.', 'success');
    });
  }

  /* LIGHTBOX FUNCTIONALITY */
  const gallery = document.querySelectorAll(".gallery-img");
  if (gallery.length > 0) {
    let index = 0;

    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.innerHTML = `
      <span class="lightbox-close">×</span>
      <span class="lightbox-prev lightbox-btn">‹</span>
      <img>
      <span class="lightbox-next lightbox-btn">›</span>
    `;
    document.body.appendChild(lightbox);

    const imgBox = lightbox.querySelector("img");

    const show = (i) => {
      index = i;
      imgBox.src = gallery[i].src;
      lightbox.style.display = "flex";
    };

    gallery.forEach((img, i) =>
      img.addEventListener("click", () => show(i))
    );

    const closeLightbox = () => lightbox.style.display = "none";

    document.querySelector(".lightbox-close").onclick = closeLightbox;
    document.querySelector(".lightbox-prev").onclick = () => show((index - 1 + gallery.length) % gallery.length);
    document.querySelector(".lightbox-next").onclick = () => show((index + 1) % gallery.length);
    lightbox.onclick = (e) => { if (e.target === lightbox) closeLightbox(); };

    document.addEventListener("keydown", (e) => {
      if (lightbox.style.display === "flex") {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") document.querySelector(".lightbox-prev").click();
        if (e.key === "ArrowRight") document.querySelector(".lightbox-next").click();
      }
    });
  }
})();
