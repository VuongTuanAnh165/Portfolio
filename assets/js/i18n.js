/**
 * i18n.js
 * Xử lý đa ngôn ngữ bằng jquery.i18n
 */

(function ($) {
    const i18n = $.i18n();

    // Hàm load & apply ngôn ngữ
    function loadLanguage(lang) {
        i18n.locale = lang;
        i18n.load(`i18n/${lang}.json`, lang).done(function () {
            $("body").i18n();
            localStorage.setItem("lang", lang);
            $("html").attr("lang", lang);
        });
    }

    // Khi người dùng đổi ngôn ngữ
    $(document).on("change", ".langSwitch", function () {
        const isChecked = $(this).prop('checked');
        const lang = isChecked ? "vi" : "en";
        loadLanguage(lang);
    });

    // Ngôn ngữ mặc định khi load trang
    $(function () {
        const savedLang = localStorage.getItem("lang") || "vi";
        if (savedLang === "vi") {
            $(".langSwitch").prop('checked', true);
        } else {
            $(".langSwitch").prop('checked', false);
        }
        loadLanguage(savedLang);
    });
})(jQuery);
