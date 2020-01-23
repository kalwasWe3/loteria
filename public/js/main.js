
getData();

async function getData(){
   var response = await fetch('/numeber');
   var data = await response.json();
    await $("#numer").text("pozostało: " + (100 - data.length));

}



var mail = "patryk@we3studio.pl";

var data={mail:mail};

var options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
};



$("#buttonGet").on('click', async  event => {
    const response = await fetch('/push', options);
    const dataJson = await response.json();
    const count = await dataJson.status;
     console.log(dataJson);
    if(count !== "faild"){
        const  generatedKode = await dataJson.kode;
        await $("#kode").text(generatedKode);
        await generateBarCode(generatedKode); 
    }else{
        $("#kode").text("już dzis probowało ponad 100 osob"); 
    }
});


function generateBarCode(n) {
    var nric = n;
    var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + nric + '&amp;size=50x50';
    $('#barcode').attr('src', url);
}





var doc = new jsPDF(); 
var specialElementHandlers = { 
    '#editor': function (element, renderer) { 
        return true; 
    } 
};



  $("#submit").click(function() {

    var doc = new jsPDF('p', 'pt', 'a4', true);

    doc.fromHTML($('#renderMe').get(0), 15, 15, {
      'width': 500
    }, function (dispose) {
    doc.save('promocode.pdf');
    });
  });






/**
 * Get the user IP throught the webkitRTCPeerConnection
 * @param onNewIP {Function} listener function to expose the IP locally
 * @return undefined
 */
function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
  //compatibility for firefox and chrome
  var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  var pc = new myPeerConnection({
      iceServers: []
    }),
    noop = function() {},
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;

  function iterateIP(ip) {
    if (!localIPs[ip]) onNewIP(ip);
    localIPs[ip] = true;
  }

  //create a bogus data channel
  pc.createDataChannel("");

  // create offer and set local description
  pc.createOffer(function(sdp) {
    sdp.sdp.split('\n').forEach(function(line) {
      if (line.indexOf('candidate') < 0) return;
      line.match(ipRegex).forEach(iterateIP);
    });

    pc.setLocalDescription(sdp, noop, noop);
  }, noop);

  //listen for candidate events
  pc.onicecandidate = function(ice) {
    if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
  };
}

// Usage

getUserIP(function(ip) {
  document.getElementById("ip").innerHTML = 'Got your IP ! : ' + ip + " | verify in http://www.whatismypublicip.com/";
});




