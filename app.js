if( 'serviceWorker' in navigator ) {
       navigator.serviceWorker.register('sw.js') 
          .then( reg => console.log('the servie worker was registered', reg))
          .catch( err => console.log('There was an error', err))
}