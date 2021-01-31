$(document).ready(function () {
  //마우스 스크롤 마크 없애기
  $(".scrollMark").hide();

  //툴 팁 활성화
  $(document).tooltip();

  // 첫 화면 흐리게 등장
  $(".firstpage .head_content").delay(500).animate(
    {
      opacity: "1",
      top: "50%",
    },
    1000
  );

  // 'paper_img' 요소 안보이게 하고 호버될 때 보이기
  $(".hover-image").hide();
  $("#httl1").hover(
    function () {
      $("#himg1").show();
    },
    function () {
      $("#himg1").hide();
    }
  );
  $("#httl2").hover(
    function () {
      $("#himg2").show();
    },
    function () {
      $("#himg2").hide();
    }
  );

  // initiate full page scroll
  $("#fullpage").fullpage({
    // licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
    responsiveWidth: 600,
    autoScrolling: true,
    navigation: true,
    navigationPosition: "right",
    slidesNavigation: true,
    slidesNavPosition: "top",
    showActiveTooltip: true,
    navigationTooltips: ["홈", "소개", "프로젝트", "활동", "연락"],
    anchors: ["firstpage", "aboutme", "myprojects", "myextra", "contactme"],
    // menu: "#myMenu",

    // scrolling
    fitToSection: true,
    scrollingSpeed: 600,
    scrollOverflow: true,
    fitToSectloopBottom: false,
    loopTop: false,
    loopHorizontal: true,
    continuousVertical: false,
    continuousHorizontal: false,
    scrollHorizontally: false,

    //Accessibility
    keyboardScrolling: true,
    animateAnchor: true,
    recordHistory: true,

    afterLoad: function (anchorLink, index) {
      // 능숙도 그래프 애니메이션
      if (index == 2) {
        // animate skill bars
        $(".skillbar").each(function () {
          $(this)
            .find(".skillbar-bar")
            .animate(
              {
                width: $(this).attr("data-percent"),
              },
              1500
            );
        });
      }
      if (index == 1 || index == 3) {
        // 첫 페이지와 슬라이더 페이지 우측 내비게이션 없애기
        $("#fp-nav").each(function () {
          $(this).css({ opacity: "0" });
        });
      } else {
        $("#fp-nav").each(function () {
          $(this).css({ opacity: "1" });
        });
      }

      if (index == 4) {
        // 발자취 등장 애니메이션
        $.each($("ul.timeline li"), function (i, el) {
          setTimeout(function () {
            $(el).addClass("visible");
          }, Math.random() * 550 + i * 700);
        });

        // 스크롤 마크 생성되기
        $(".scrollMark").fadeIn(500, "linear");
      } else {
        $(".scrollMark").fadeOut(1200);
      }
    },
  });

  // 아래 화살표로 한 섹션 넘어가기
  $(document).on("click", ".fa-chevron-down", function () {
    $.fn.fullpage.moveSectionDown();
  });

  // JQuery UI 로 명함 끄는 효과 주기
  $(".cards").draggable();

  // NAME CARD 부분
  $(".card-toggle").on("click", function () {
    // Card toggle state
    $(".card-toggle").removeClass("active");
    $(this).addClass("active");

    var isAnimating = false;

    if (!isAnimating) {
      isAnimating = true;

      $(".card").find(".card-content").css("z-index", 0);
      $(".card").removeClass("active");

      var that = $(this);

      $(this).siblings().css("z-index", 1);

      setTimeout(function () {
        that
          .parent()
          .toggleClass("active")
          .find(".card-content")
          .on("transitionend", function () {
            isAnimating = false;
          });
      }, 10);
    } else {
      return;
    }
  });

  $("input,textarea").blur(function () {
    if ($(this).val()) {
      $(this).parent().addClass("filled");
    } else {
      $(this).parent().removeClass("filled");
    }
  });

  $(".contact").on("click", function () {
    $(".contact-form").toggleClass("active");
  });

  $(".contact-form input[type=submit], .contact-form .close").on("click", function (e) {
    e.preventDefault();
    $(".contact-form").toggleClass("active");
  });

  //이메일 클릭 시 클립보드로 저장

  function copyToClipboard(val) {
    var t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);
  }

  $(".toClip_email").click(function () {
    alert("이메일 주소가 클립보드로 복사되었습니다.");
    copyToClipboard("oh.can.do88@gmail.com");
  });
  //폰 번호 클릭 시 클립보드로 저장
  $(".toClip_mobile").click(function () {
    alert("전화번호가 클립보드로 복사되었습니다.");
    copyToClipboard("+82-10-2000-4824");
  });

  $("#submitting").click(function () {
    alert("메시지가 무사히 전달되었습니다. 감사합니다.");
  });
});
