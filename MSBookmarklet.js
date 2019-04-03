javascript: (function () {
  $.ajax({
    url: window.location.origin + document.getElementById('ServicePath').innerHTML + '/GetPlayerOptions',
    type: 'POST',
    data: JSON.stringify({
      'getPlayerOptionsRequest': {
        'ResourceId': document.getElementById('ResourceId').innerHTML,
        'QueryString': '',
        'UseScreenReader': 'false',
        'UrlReferrer': ''
      }
    }),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (playerOpts) {
      $('<style type=\'text/css\'>\
          .modal-window {position: fixed;\
            display: flex;\
            justify-content: center;\
            align-items: center;\
            background-color: rgba(0, 0, 0, 0.75);\
            top: 0;\
            right: 0;\
            bottom: 0;\
            left: 0;\
            z-index: 999;\
            opacity: 0;\
            pointer-events: none;\
          }\
          .modal-window:target {\
            opacity: 1;\
            pointer-events: auto;\
          }\
          .modal-window > div {\
            width: 400px;\
            position: absolute;\
            padding: 3em;\
            background: #ffffff;\
            color: #333333;\
            border-radius: 5px;\
          }\
          .modal-window header {\
            font-weight: bold;\
          }\
          .modal-window h1 {\
            font-size: 150%;\
            margin: 0 0 15px;\
            color: #333333;\
          }\
          .modal-close {\
            color: #4c4c4c;\
            line-height: 35px;\
            position: absolute;\
            right: 5px;\
            text-align: center;\
            top: 5px;\
            width: 70px;\
            text-decoration: none;\
            border: #4c4c4c;\
            border-style: solid;\
            border-radius: 5px;\
            border-width: 1px;\
          }\
          .modal-window > div > ul > li {\
          margin: 10px 0;\
          }\
          </style>')
        .appendTo('head');
      if (playerOpts.d.Presentation.PlayStatus != "OnDemand") {
        $('body').append(
          '<div id="open-modal" class="modal-window"> \
            <div>\
              <a href="#" title="Close" class="modal-close">Close</a>\
              <p style="font-size: 20px;">Lecture is currently not available on-demand and therefore cannot be downloaded.<br>Try again later.</p>\
            </div>\
          </div>');
      } else {
        var allMedia = playerOpts.d.Presentation.Streams[1].VideoUrls;
        for (var i = 0; i < allMedia.length; i++) {
          if (allMedia[i].MediaType == 'MP4') {
            var mp4Url = allMedia[i].Location;
            $('body').append(
              '<div id="open-modal" class="modal-window"> \
              <div>\
                <a href="#" title="Close" class="modal-close">Close</a>\
                <ul style="list-style: inside;">\
                  <li>Copy the title: <input type="text" onClick="this.select();" value="' + document.title + '"></li>\
                  <li><a href=' + mp4Url + ' target="_blank">Right click on this link and then "Save as..."</a></li>\
                  <li>Paste in to rename file correctly and save it</li>\
                  <li>Click <a href="https://klvn.github.io/MediasiteDownloader/" target="_blank">here<a/> for more detailed instructions</li>\
                </ul>\
              </div>\
            </div>');
          }
        }
      }
      location.href = "#open-modal";
    }
  })
})()