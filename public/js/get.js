
//check insert code

$("#btnKod").on('click', async  event => {
    var kod =  $("#kod").val(); 
    var data =  {kod:kod};
    getData(data);
});


//check qr code
function openQRCamera(node) {
  var reader = new FileReader();
  reader.onload = function() {
    node.value = "";
    qrcode.callback = function(res) {
      if(res instanceof Error) {
        alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.");
      } else {
        var data =  {kod:res};
        getData(data);
      }
    };
    qrcode.decode(reader.result);
  };
  reader.readAsDataURL(node.files[0]);
}


async function getData(data){
    
        var options = await {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
    };
    
    const response = await fetch('/dane', options);
    const dataJson = await response.json();

    // check if code is in base
    if(dataJson.kode !== false){
            const code = await dataJson[0].kode;
            const codeUsed = await dataJson[0].used;
    // check that the code has been used
            if(codeUsed == false){
                await $("#response").text(code + "jest w bazie");
            }else{
                await $("#response").text("kod został użyty");
            }
     }else{
            $("#response").text("kod nie istnieje");
    }
    
}


