/**
 * i18n.js
 * Xử lý đa ngôn ngữ bằng jquery.i18n
 */
(function ($) {
  const i18n = $.i18n();

  function updateCVLinkByLang(lang) {
    const cvLinks = {
        vi: "https://www.topcv.vn/xem-cv/DwNZUFZSAVAFW1IMCAcJBlAKBlUFVVAIVgZcAA7bda",
        en: "https://www.topcv.vn/xem-cv/BQUCVAEAA1ILDwMPBggLAAEAVlBSU1UCDVxVWge95e"
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
