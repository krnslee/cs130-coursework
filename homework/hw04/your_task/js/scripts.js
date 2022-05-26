const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);
let currentSong = "";

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

// EC #1 
const refreshTracks_artist_2 = (data) => {
    console.log(data[0])
    let returnString = "";

    for (const item of data){
    console.log(item.album.artists[0].name)
    returnString += `<button class="track-item preview" data-preview-track="${item.preview_url}" onclick="handleTrackClick(event);">
    <img src="${item.album.images[0].url}">
    <i class="fas play-track fa-play" aria-hidden="true"></i>
    <div class="label">
        <h2>"${item.name}"</h2>
        <p>
            "${item.album.artists[0].name}"`

    if (item.preview_url == null){
        returnString += `" (no audio preview available)"`
    }

    returnString += `</p>
    </div>
    </button>`
    }

    return returnString;
}

const refreshTracks_artist_1 = (data1, data2) => {
    console.log(data1)
    console.log(data2)

    const ref_tracks_artist = document.querySelector("#tracks");
    ref_tracks_artist.innerHTML = "";

    fetch('https://www.apitutor.org/spotify/v1/artists/' + data1 + '/top-tracks?country=us')
        .then((res) => res.json())
        .then(data => {
            console.log(data.tracks)

            let data_arr = []

            for (const item of data.tracks){

                if (item.album.artists[0].id == data1){
                    data_arr.push(item)
                }
            }

            if (data_arr.length > 5){
                const ref_fiveTracks = data_arr.slice(0, 5);
                ref_tracks_artist.innerHTML = refreshTracks_artist_2(ref_fiveTracks)
            }

            else if (data_arr.length > 0){
                ref_tracks_artist.innerHTML = refreshTracks_artist_2(data_arr)
            }

            else {
                ref_tracks_artist.innerHTML = "No tracks found that match your search criteria."
            }
        });
}

const makeFirstArtist = (data) => {
    let returnString = `<section class="artist-card" id="${data.id}" onclick="refreshTracks_artist_1('${data.id}', '${data.name}')" tabindex="0">
    <div>
        <img src="${data.image_url}">
        <h2>"${data.name}"</h2>
        <div class="footer">
            <a href="${data.spotify_url}" target="_blank">
                view on spotify
            </a>
        <div>
    </div>
    </section>`

    return returnString;
}

const getArtist = (term) => {
    console.log(`
        get artists from spotify based on the search term
        "${term}" and load the first artist into the #artist section 
        of the DOM...`);

    const artist_html = document.querySelector("#artist");
    artist_html.innerHTML = "";

    fetch(baseURL + "?type=artist&q=" + term)
        .then((res) => res.json())
        .then((data) => {
            if (data.length > 0){
                const firstValue = data[0]
                artist_html.innerHTML = makeFirstArtist(data[0])
            }
            else {
                artist_html.innerHTML = "No artist has been returned.";
            }
        });
}

// EC #2
const refreshTracks_album_2 = (data, img) => {
    console.log(data)
    let returnString = "";

    for (const item of data){
    returnString += `<button class="track-item preview" data-preview-track="${item.preview_url}" onclick="handleTrackClick(event);">
    <img src="${img}">
    <i class="fas play-track fa-play" aria-hidden="true"></i>
    <div class="label">
        <h2>"${item.name}"</h2>
        <p>
            "${item.artists[0].name}"`

    if (item.preview_url == null){
        returnString += `" (no audio preview available)"`
    }

    returnString += `</p>
    </div>
    </button>`
    }

    return returnString;
}

const refreshTracks_album_1 = (data, img) => {
    const ref_tracks_album = document.querySelector("#tracks");
    ref_tracks_album.innerHTML = "";

    fetch('https://www.apitutor.org/spotify/v1/albums/' + data + '/tracks?country=us')
        .then((res) => res.json())
        .then(data => {
            if (data.items.length > 5){
                const album_fiveTracks = data.items.slice(0, 5);
                ref_tracks_album.innerHTML = refreshTracks_album_2(album_fiveTracks, img)
            }

            else if (data.items.length > 0){
                ref_tracks_album.innerHTML = refreshTracks_album_2(data.items, img)
            }

            else {
                ref_tracks_album.innerHTML = "No tracks found that match your search criteria."
            }
        })
}

const makeFirstAlbums = (data) => {
    let returnString = "";

    for (const item of data){
        console.log(item)
        returnString += `<section class="album-card" id="${item.id}" onclick="refreshTracks_album_1('${item.id}', '${item.image_url}')" tabindex="0">
        <div>
            <img src="${item.image_url}">
            <h2>"${item.name}"</h2>
            <div class="footer">
                <a href="${item.spotify_url}" target="_blank">
                    view on spotify
                </a>
            </div>
        </div>
        </section>`
    }

    return returnString;
}

const getAlbums = (term) => {
    console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);

    const albums_html = document.querySelector("#albums");
    albums_html.innerHTML = "";

    fetch(baseURL + '?type=album&q=' + term)
        .then((res) => res.json())
        .then(data => {
            if (data.length > 0){
                albums_html.innerHTML = makeFirstAlbums(data)
            }
            else {
                albums_html.innerHTML = "No albums were returned."
            }
        })
};

const makeFiveTracks = (data) => {
    console.log(data[0])
    let returnString = "";

    for (const item of data){
    returnString += `<button class="track-item preview" data-preview-track="${item.preview_url}" onclick="handleTrackClick(event);">
    <img src="${item.album.image_url}">
    <i class="fas play-track fa-play" aria-hidden="true"></i>
    <div class="label">
        <h2>"${item.name}"</h2>
        <p>
            "${item.artist.name}"`

    // EC #3 
    if (item.preview_url == null){
        returnString += `"(no audio preview available)"`
    }

    returnString += `</p>
    </div>
    </button>`
    }

    return returnString;
}

const getTracks = (term) => {
    console.log(`
        get tracks from spotify based on the search term
        "${term}" and load them into the #tracks section 
        of the DOM...`);
    
    const tracks_html = document.querySelector("#tracks");
    tracks_html.innerHTML = "";

    fetch(baseURL + '?type=track&q=' + term)
        .then((res) => res.json())
        .then(data => {
            console.log(data)
            console.log(data.length)
            if (data.length > 5) {
                const fiveTracks = data.slice(0, 5);
                tracks_html.innerHTML = makeFiveTracks(fiveTracks)
            }

            else if (data.length > 0){
                tracks_html.innerHTML = makeFiveTracks(data)
            }
            
            else {
                tracks_html.innerHTML = "No tracks found that match your search criteria."
            }
        });
}

const handleTrackClick = (ev) => {
    const previewUrl = ev.currentTarget.getAttribute('data-preview-track');
    // console.log(previewUrl);

    // EC #5 
    if (previewUrl == currentSong){
        if (!audioPlayer.isPaused()){
            audioPlayer.pause()
        }
        else {
            audioPlayer.play()
        }

        return;
    }

    currentSong = ev.currentTarget.getAttribute('data-preview-track')
    audioPlayer.setAudioFile(previewUrl);
    audioPlayer.play();

    document.querySelector("current-track").innerHTML = ev.currentTarget.innerHTML;
}

document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};