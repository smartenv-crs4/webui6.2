var defaultResizeConfig =
{
  "formats": 
  {
    "thumbnail":
    {
      "maxSize":  50
    },
    "medium":
    {
      "maxSize":  300
    },
    "large":
    {
      "maxSize":  500
    }
  }
}


function resizeImage(imgField, msUploadUrl, doSuccess, doError, config, beforeSend)
{
  if(config)
  {
    if(!config.formats)
    {
      console.log("Invalid config object (missing formats parameter)");
      return;
    }
    else if(Object.keys(config.formats).length == 0)
    {
      console.log("Formats list is blank");
      return;
    }
    else
    {
      var valid = true;
      for(var i in config.formats)
      {
        if(isNaN(config.formats[i].maxSize))
        {
          valid = false;
          console.log("'" + i + "' format: invalid maxSize parameter");
        }
        if(!valid)
        {
          return;
        }        
      }
    }
  }
  else
  {
    config = defaultResizeConfig;
  }
    
  // Read in file
  var f = jQuery("#" + imgField)[0];
  var file =  f.files[0];
    
  var imgList = [];

  // Ensure it's an image
  if(file.type.match(/image.*/)) 
  {             
    // Load the image
    var reader = new FileReader();
    
    reader.onload = function (readerEvent) 
    {    
      var image = new Image();
      image.onload = function (imageEvent) 
      { 
        var sufs = Object.keys(config.formats);        
        var nImg = sufs.length;        
        for(var suf in config.formats)
        {          
          // Resize the image
          var canvas = document.createElement('canvas'),
            maxSize = config.formats[suf].maxSize,            
            width = image.width,
            height = image.height;
            
          if (width > height) 
          {
            if (width > maxSize) 
            {
              height *= maxSize / width;
              width = maxSize;
            }
          } 
          else 
          {
            if (height > maxSize) 
            {
              width *= maxSize / height;
              height = maxSize;
            }
          }                  
            
          canvas.width = width;
          canvas.height = height;
  
          canvas.getContext('2d').drawImage(image, 0, 0, width, height);

          var dataUrl = canvas.toDataURL("image/jpeg");                       
          //var dataUrl = canvas.toDataURL(file.type);                       
          var resizedImage = b64toBlob(dataUrl)


            console.log(suf);
            imgList.push({
              "suffix": suf,
              "blob": resizedImage,
              "origName" : file.name
            });            

        }               
        uploadImages(imgList, msUploadUrl, doSuccess, doError, beforeSend);
      }
      image.src = readerEvent.target.result;

    }
    reader.readAsDataURL(file);
  }
}

/**
 * Convert a base64 string in a Blob according to the data and contentType.
 * 
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
function b64toBlob(dataURL, sliceSize) {
  if(!sliceSize)
    sliceSize = 256;
  var BASE64_MARKER = ';base64,';  
  if (dataURL.indexOf(BASE64_MARKER) != -1) {
    var parts = dataURL.split(',');
    var contentType = parts[0].split(':')[1];
    var raw = parts[1];

    var byteCharacters = atob(raw);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});

    return blob;
  }
  return null;
}

function uploadImages(imgList, msUploadUrl, doSuccess, doError, beforeSend)
{
  var form = jQuery('form')[0];
  var formData = new FormData(form);
  
  for(var i in imgList)
  { 
    var name = "";
    var n =  imgList[i].origName;
    var ns = n.split(".");
  
    if(ns.length > 1)
    {
      for(var j = 0; j < ns.length - 1; j++)
      {
        var d = "";
        if(j < ns.length - 2)
        {
          d = "."
        }
        name += ns[j] + d;
      }
      name += "_" + imgList[i].suffix + "." + ns[ns.length -1];
    }
    else
    {
      name = n + "_" + imgList[i].suffix;
    }
   
    formData.append(imgList[i].suffix, imgList[i].blob, name);    
  }

  jQuery.ajax({
    url: msUploadUrl,
    data: formData,
    //cache: false,
    contentType: false,
    processData: false,
    type: "POST",
    success: function(data){
      if(doSuccess)
      {
        doSuccess(data);
      }
    },
    error: function(xhr)
    {
      if(doError)
      {
        doError(xhr);
      }
    },
    beforeSend: function(xhr, settings)
    {
      if(beforeSend)
      {
        beforeSend(xhr, settings);
      }
    }
  });
  
  
  
}
