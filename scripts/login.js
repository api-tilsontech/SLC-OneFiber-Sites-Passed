checkAuth();
bindUIActions();

function bindUIActions() {
  $("#login-btn").click(function() {
    gisLogin();
  });

  $("#login-modal").on("shown.bs.modal", function (e) {
    $(".modal-backdrop").css("opacity", "1");
  });

  $("#login-modal").on("hidden.bs.modal", function (e) {
    $(".modal-backdrop").css("opacity", "");
  });
};

function checkAuth() {
  if (!sessionStorage.getItem("gis_token") || sessionStorage.getItem("gis_token") ===  "ERROR") {
    $(document).ready(function() {
      $("#login-modal").modal("show");
    });
  } else {
    $("#login-modal").modal("hide");
    window.location.href = "main.html";
  }
};

function gisLogin() {
  var email = $("#email").val();
  var password = $("#password").val();

  $.ajax({
    type: "POST",
    url: "https://gis.tilsontech.com/portal/sharing/rest/generateToken",
    contentType: "application/x-www-form-urlencoded",
    data: {
        "f": "json",
        "username": email,
        "password": password,
        "client": "referer",
        "ip": "65.158.108.154",
        "referer": "arcgis.com",
        "expiration": "3600"
    },
    statusCode: {
      400: function() {
        alert("Incorrect credentials, please try again.");
      }
    },
    success: function (data) {
      var body = JSON.parse(data);

      if (body.token) {
        sessionStorage.setItem("gis_token", body.token);
        stLogin();
      } else {
        sessionStorage.setItem("gis_token", "ERROR");
        alert(body.error.details);
        checkAuth();
      }
    },
    error: function (data) {
      checkAuth();
      alert("No GIS Token Returned")
      console.log(data)
    }
  });
};


function stLogin() {
  $.ajax({
    type: "POST",
    url: "https://login.salesforce.com/services/oauth2/token",
    contentType: "application/x-www-form-urlencoded",
    data: {
      "grant_type": "password",
      "username": "api@tilsontech.com",
      "password": "T1l$0n-@P1!NGbBJVDK7ITtonlc0hC0Zq6f",
      "client_id": "3MVG9szVa2RxsqBZK_Iso6j7i51E9Emnc84NfMX6gbmBjacrCizqWKz9AQfHJaRJE2Gk.zkg.sCZZShIEuoWq",
      "client_secret": "1975582391282376903"
    },
    statusCode: {
      400: function() {
        alert("Incorrect credentials, please try again.");
      }
    },
    success: function (data) {
      if (data.access_token) {
        sessionStorage.setItem("st_token", data.access_token);
        checkAuth();
      } else {
        sessionStorage.setItem("st_token", "ERROR");
        alert(data.error.details);
        checkAuth();
      }
    },
    error: function (data) {
      checkAuth();
      alert("No ST Token Returned")
      console.log(data)
    }
  });
};