import React, { useState, useEffect, useRef } from "react";
import ReactAudioPlayer from "react-audio-player";
//create your first component

export function Home() {
	const [playlist, setPlaylist] = useState([]);
	let audioPlayer = useRef();

	const [cancionActual, setCancionActual] = useState(0);

	const cancionDetras = () => {
		if (cancionActual > 0) {
			setCancionActual(cancionActual - 1);
		} else {
			setCancionActual(playlist.length - 1);
		}
		reproducirCancion();
	};

	const cancionAdelante = () => {
		if (cancionActual === playlist.length - 1) {
			setCancionActual(0);
		} else {
			setCancionActual(cancionActual + 1);
		}
		reproducirCancion();
	};

	const reproducirCancion = () => {
		let url =
			"https://assets.breatheco.de/apis/sound/" +
			playlist[cancionActual].url;
		audioPlayer.current.src = url;
		audioPlayer.current.play();
	};

	const pausarCancion = () => {
		audioPlayer.current.pause();
	};

	useEffect(() => {
		getPlayList();
	}, []);

	const getPlayList = () => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(response => response.json())
			.then(data => setPlaylist(data));
	};

	return (
		<div className="text-center mt-5">
			<div className="contenedor">
				<h1>Music player with React</h1>
				<ol>
					{playlist.map((e, i) => {
						return (
							<li
								key={i}
								className={
									cancionActual === i ? "reproduciendo" : ""
								}>
								{e.name}
							</li>
						);
					})}
				</ol>
			</div>
			<div>
				<audio ref={audioPlayer}></audio>
			</div>
			<div className="botones">
				<button onClick={cancionDetras}>
					<i className="fa fa-caret-left" />
				</button>
				<button onClick={reproducirCancion}>
					<i className="fa fa-play" aria-hidden="true" />
				</button>
				<button onClick={pausarCancion}>
					<i className="fa fa-pause" aria-hidden="true" />
				</button>
				<button onClick={cancionAdelante}>
					<i className="fa fa-caret-right" aria-hidden="true" />
				</button>
			</div>
		</div>
	);
}
