$(document).ready(function() {

  //sticky header
    $(window).scroll(function() {
      const navMenu = $('#nav-menu');
    const wasActive = navMenu.hasClass('active');

      if ($(this).scrollTop() > 1) {
        $(".header-area").addClass("sticky");
      } else {
        $(".header-area").removeClass("sticky");
      }
    
      
      // Update the active section in the header
      updateActiveSection();
    });
  
    $(".header ul li a").click(function(e) {
      e.preventDefault(); 
  
      var target = $(this).attr("href");
  
      if ($(target).hasClass("active-section")) {
        return; 
      }
  
      if (target === "#home") {
        $("html, body").animate(
          {
            scrollTop: 0 
          },
          500
        );
      } else {
        var offset = $(target).offset().top - 40; 
  
        $("html, body").animate(
          {
            scrollTop: offset
          },
          500
        );
      }
  
      $(".header ul li a").removeClass("active");
      $(this).addClass("active");
    });
  

    //Initial content revealing js
    ScrollReveal({
      distance: "100px",
      duration: 2000,
      delay: 200
    });
  
    ScrollReveal().reveal(".profile-photo, .about-content, .education", {
      origin: "left"
    });
    ScrollReveal().reveal(".profile-text, .about-skills, .internship", {
      origin: "right",
      reset: false
    });
    ScrollReveal().reveal(".project-title, .contact-title", {
      origin: "top"
    });
    ScrollReveal().reveal(".projects, .contact", {
      origin: "bottom"
    });

// Toggle menu on hamburger click
$('#menu-toggle').click(function (e) {
    e.stopPropagation();
    $('#nav-menu').toggleClass('active');
});


// Hide menu when clicking any nav link
$('#nav-menu a').click(function () {
    $('#nav-menu').removeClass('active');
});

// Hide menu when clicking outside the nav or toggle
$(document).click(function (e) {
    if (!$(e.target).closest('#nav-menu, #menu-toggle').length) {
        $('#nav-menu').removeClass('active');
    }
});




  //contact form to excel sheet
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyNGObUNNaxbGuH21MNkTjr2-drpAwyKnGvocX3aETtyiJPd5K2u0m_xuY6SVZLPUPz/exec';
  const form = document.forms['submitToGoogleSheet']
  const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
          .then(response => {
              msg.innerHTML = "Message sent successfully"
              setTimeout(function () {
                  msg.innerHTML = ""
              }, 5000)
              form.reset()
          })
          .catch(error => console.error('Error!', error.message))
  })
    
  });
  
  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();
  
    // Checking if scroll position is at the top of the page
    if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
    }
  
    // Iterate through each section and update the active class in the header
    $("section").each(function() {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();
  
      if (
        scrollPosition >= offset - 40 &&
        scrollPosition < offset + height - 40
      ) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + target + "']").addClass("active");
      }
    });
  }
  

 