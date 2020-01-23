
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






async function getUserAsync() 
{
  let response = await fetch(`https://ipapi.co/json/`);
  let data = await response.json();
  return data;
}

getUserAsync().then(data => console.log(data)); 


$.getJSON('https://ipapi.co/json/', function(data) {
  console.log(JSON.stringify(data, null, 2) + "sec");
});




