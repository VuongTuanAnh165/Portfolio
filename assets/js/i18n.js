/**
 * i18n.js
 * Xử lý đa ngôn ngữ bằng jquery.i18n
 */
(function ($) {
  const i18n = $.i18n();

  function updateCVLinkByLang(lang) {
    const cvLinks = {
        vi: "https://drive.google.com/file/d/1CN_LbEN0iNv00tlisSDWB58T4o1eHP2c/view",
        en: "https://drive.google.com/file/d/1rONp75d3sK3eLlgVDgoW6vh4DCbvqSaM/view"
    };

    const href = cvLinks[lang] || cvLinks['vi']; // fallback
    $('.download-cv-link').attr('href', href);
}

  function applyLocale(lang) {
    i18n.locale = lang;
    $("html").attr("lang", lang);
    $("body").i18n();
    localStorage.setItem("lang", lang);
    updateCVLinkByLang(lang)
  }

  function initI18n(initialLang) {
    i18n
      .load({
        en: "../../i18n/en.json",
        vi: "../../i18n/vi.json",
      })
      .done(function () {
        applyLocale(initialLang);
      })
      .fail(function (jqXHR, status, err) {
        console.error("❌ i18n load failed:", status, err);
      });
  }

  $(document).on("change", ".langSwitch", function () {
    const lang = $(this).prop("checked") ? "vi" : "en";
    applyLocale(lang);
  });

  $(function () {
    const savedLang = localStorage.getItem("lang") || "vi";
    $(".langSwitch").prop("checked", savedLang === "vi");
    initI18n(savedLang);
  });
})(jQuery);
