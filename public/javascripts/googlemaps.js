window.onload = () => {
    const amsterdamcentrum = {
      lat: 52.37, 
      lng: 4.89
    };

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: amsterdamcentrum
    });
    
    const markers = []

    let pin1 = new google.maps.Marker({
      position: {lat: 52.372987, lng: 4.875782},
      map: map,
      title: "Amsterdam-West"
    });

    markers.push(pin1);

    let pin2 = new google.maps.Marker({
      position: {lat: 52.358037, lng: 4.939726},
      map: map,
      title: "Amsterdam-Oost"
    });

    markers.push(pin2);

    let pin3 = new google.maps.Marker({
      position: {lat: 52.337662, lng: 4.875393},
      map: map,
      title: "Amsterdam-Zuid"
    });

    markers.push(pin3);

    let pin4 = new google.maps.Marker({
      position: {lat: 52.393675, lng: 4.910712},
      map: map,
      title: "Amsterdam-Noord"
    });

    markers.push(pin4);

    let pin5 = new google.maps.Marker({
      position: {lat: 52.372431, lng: 4.893739},
      map: map,
      title: "Amsterdam-Centrum"
    });

    markers.push(pin5);
  };