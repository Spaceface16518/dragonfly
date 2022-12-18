import Peer from "peerjs";
import { z } from "zod";

const Message = z.object({
	type: z.enum(["rename"]),
});
type Message = z.infer<typeof Message>;

const RenameMessage = Message.extend({
	type: z.literal("rename"),
	name: z.string(),
});
type RenameMessage = z.infer<typeof RenameMessage>;

interface PeerUserData {
	peer: string;
	name: string;
}

export default function setupStream(
	name: HTMLInputElement,
	join: HTMLInputElement,
	video: HTMLVideoElement
) {
	const peer = new Peer();
	const peers: PeerUserData[] = [];

	peer.on("error", (err) => console.error(err));

	peer.on("open", (id) => {
		console.log(`My peer ID is: ${id}`);
	});

	peer.on("connection", (conn) => {
		peers.push({ peer: conn.peer, name: "Guest" });

		// handle peer messages
		conn.on("data", (data) => {
			// handle user messages
			const message = Message.parse(data);
			switch (message.type) {
				// acknowledge a peer changing their name
				case "rename":
					const renameMessage = RenameMessage.parse(data);
					const peer = peers.find((peer) => peer.peer === conn.peer);
					if (peer) {
						peer.name = renameMessage.name;
						console.log(`Renamed peer ${conn.peer} to ${renameMessage.name}`);
					} else {
						console.error(
							`Peer ${conn.peer} not found for renaming to ${renameMessage.name}`
						);
					}
					break;
			}
		});

		// announce our name to the new peer
		conn.on("open", function() {
			conn.send({
				type: "rename",
				name: name.value,
			} as RenameMessage);
		});

		// announce when we change our name
		name.addEventListener("change", function() {
			conn.send({
				type: "rename",
				name: this.value,
			} as RenameMessage);
		});

		conn.on("error", function(err) {
			// TODO: show toast
			console.error(err);
		});
	});

	peer.on("call", (conn) => {
		conn.on("error", (err) => console.error(err));

		// peer must have connected with us first
		const peer = peers.find((peer) => peer.peer === conn.peer);
		if (peer) {
			// FIXME: remove cast when TS has this property
			if (join.value === "") {
				conn.answer((<any>video).captureStream());
			} else {
				conn.answer();
			}
			conn.answer((<any>video).captureStream());
		} else {
			console.error(
				`Peer ${peer} tried to call but does not have an existing data connection`
			);
		}

		conn.on("stream", (stream) => {
			// if we want to watch this peer, use the stream as the source of our
			// video element
			if (join.value === conn.peer) {
				video.srcObject = stream;
			}
		});
	});

	return peer;
}
