let songName=document.getElementById("song-name");
let songSinger=document.getElementById("song-singer");
let songImage=document.querySelector(".song-image");
let playPauseImg=document.querySelector("#play-pause");
let volumeRange=document.querySelector("#volume-range");
let volSvg=document.querySelector("#vol-svg");
let songRange=document.querySelector("#song-duration");
let playlistImg=document.querySelector("#playlist-img");
let playlist=document.querySelector(".playlist");
let playlistSong=document.querySelectorAll(".playlist-song");


let index=0;
let playingSong=false;
let track=document.createElement("audio");
let songs=[
  {
    name:"Sakhi Ri Mero Radha Raman",
    path:"firstsong.mp3",
    image:"image1.jpg",
    singer:"Sanatana Sankirtan,Shyam Bihari Das,JayShree"
  },
  {
    name:"Namo Namo",
    path:"secondsong.mp3",
    image:"image2.jpg",
    singer:"Amit Trivedi"
  },
  {
    name:"Koi Jaye Vrindavan",
    path:"thirdsong.mp3",
    image:"image3.jpg",
    singer:"Nikhil Verma"
  },
  {
    name:"Shiv Kailasho Ke Vasi",
    path:"fourthsong.mp3",
    image:"image4.jpg",
    singer:"Hansraj Raghuwanshi"
  }
]
function loadTrack(index){
  track.src=songs[index].path;
  songName.innerHTML=songs[index].name;
  songSinger.innerHTML=songs[index].singer;
  songImage.style=`background-image:url("${songs[index].image}");`
  volume();
  duration();
  track.load();
  track.loop=true;
  setInterval(()=>{
    songRange.max=track.duration;
    songRange.value=track.currentTime;

  },1000);
}
loadTrack(index);

function playPause(){
  if(playingSong==false){
    playSong();
  }else{
    pauseSong();
  }
}
function playSong(){
  track.play();
  playingSong=true;
  playPauseImg.src="pause.svg";
}
function pauseSong(){
  track.pause();
  playingSong=false;
  playPauseImg.src="play.svg";
}
function nextSong(){
  if(index < songs.length-1){
    index++;
    loadTrack(index);
    playSong();
  }else{
    index=0;
    loadTrack(index);
    playSong();
  }
}
function previousSong(){
  if(index > 0){
    index--;
    loadTrack(index);
    playSong();
  }else{
    index=songs.length;
    loadTrack(index);
    playSong();
  }
}
function volume(){
  track.volume=volumeRange.value/100;
  if(volumeRange.value==0){
    volSvg.src="mute.svg";
  }else{
    volSvg.src="vol.svg";
  }
}
function duration(){
track.currentTime=songRange.value;
}
playlistImg.addEventListener("click",()=>{
playlist.classList.toggle('playlist-active');
if(playlist.classList.contains("playlist-active")){
  playlistImg.src="cross.svg";
}else{
  playlistImg.src="playlist.svg";
}

})
playlistSong.forEach((song,index)=>{
  song.addEventListener('click',()=>{
    loadTrack(index);
    playSong();
    playlist.classList.remove('playlist-active');
    playlistImg.src="playlist.svg";

})
})

