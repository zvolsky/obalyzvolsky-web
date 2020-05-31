// nullify the global reference while instrumenting the form
StaticEmail = (function (StaticEmail) {
    contact.addEventListener('submit', function (event) {
      event.preventDefault();
      var from = contact.from.value.trim();
      var md = contact.md.value.trim();
      if (from && md) {
        contact.submit.disabled = true;
        StaticEmail({
          path: '/api/paperboy',
          subject: 'WEB: ' + from,
          from: from,
          md: md
        })
        .then(
          thanks,
          function (error) {
            // this check is to make code testable via http-server
            if (
              (error.message === 'Method Not Allowed' || error.message.indexOf('Unsupported method') !== -1)
              // handle 405 errors as either OK (75%) or errors
              // if you don't want errors, comment the following line
              //&& Math.random() < .75
            )
              thanks();
            else {
              alert(error);
              contact.submit.disabled = false;
            }
          }
        );
      }
    });
    function thanks() {
      $('#send-hints').hide();
      var div = document.createElement('h3');
      div.textContent = 'Děkujeme !';
      contact.parentNode.replaceChild(div, contact);
    }
  }(StaticEmail));
