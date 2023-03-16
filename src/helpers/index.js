import { store } from 'react-notifications-component';
export const showAlert = (params) => {
  store.addNotification({
    title: params.title,
    message: params.message,
    type: params.type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 4000,
      onScreen: true
    }
  });
}
export const playOnePauseOtherVideos = () =>{
  var videos = document.querySelectorAll('video');
  for(var i=0; i<videos.length; i++)
    videos[i].addEventListener('play', function(){pauseAll(this)}, true);
  function pauseAll(elem){
    for(var i=0; i<videos.length; i++){
      //Is this the one we want to play?
      if(videos[i] == elem) continue;
      //Have we already played it && is it already paused?
      if(videos[i].played.length > 0 && !videos[i].paused){
      // Then pause it now
        videos[i].pause();
      }
    }
  }
}