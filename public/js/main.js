
getData();
//generate check numbers
async function getData(){
   var response = await fetch('/numeber');
   var data = await response.json();
    await $("#numer").text("pozostało: " + (100 - data.length));

}





//check ip
var data;

$.getJSON('https://api.ipregistry.co/?key=wayqa2g5ssdkdf', function(nData) {
    var ip = JSON.stringify(nData.ip);
    data = {ip:ip};
})




$("#buttonGet").on('click', async  event => {
    console.log(data);
    var options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
    };

    const response = await fetch('/push', options);
    const dataJson = await response.json();
    const count = await dataJson.status;
     console.log(dataJson);
    if(count !== "faild" && count !== "ipUsed"){
        const  generatedKode = await dataJson.kode;
        await $("#kode").text(generatedKode);
        await generateBarCode(generatedKode); 
    }else if(count !== "ipUsed"){
        $("#kode").text("już dzis probowało ponad 100 osob"); 
    }else{
        $("#kode").text("dziś już probowales");
    }
});

//generate qr
function generateBarCode(n) {
    var nric = n;
    var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + nric + '&amp;size=50x50';
    $('#barcode').attr('src', url);
}



//generate pdf

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



