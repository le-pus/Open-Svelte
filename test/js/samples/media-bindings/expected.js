import {
	SvelteComponent,
	add_render_callback,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	raf,
	run_all,
	safe_not_equal,
	time_ranges_to_array
} from "svelte/internal";

function create_fragment(ctx) {
	let audio;
	let audio_updating = false;
	let audio_animationframe;
	let audio_is_paused = true;
	let dispose;

	function audio_timeupdate_handler() {
		cancelAnimationFrame(audio_animationframe);

		if (!audio.paused) {
			audio_animationframe = raf(audio_timeupdate_handler);
			audio_updating = true;
		}

		ctx.audio_timeupdate_handler.call(audio);
	}

	return {
		c() {
			audio = element("audio");
			if (ctx.played === void 0 || ctx.currentTime === void 0) add_render_callback(audio_timeupdate_handler);
			if (ctx.duration === void 0) add_render_callback(() => ctx.audio_durationchange_handler.call(audio));
			if (ctx.buffered === void 0) add_render_callback(() => ctx.audio_progress_handler.call(audio));
			if (ctx.buffered === void 0 || ctx.seekable === void 0) add_render_callback(() => ctx.audio_loadedmetadata_handler.call(audio));

			dispose = [
				listen(audio, "timeupdate", audio_timeupdate_handler),
				listen(audio, "durationchange", ctx.audio_durationchange_handler),
				listen(audio, "play", ctx.audio_play_pause_handler),
				listen(audio, "pause", ctx.audio_play_pause_handler),
				listen(audio, "progress", ctx.audio_progress_handler),
				listen(audio, "loadedmetadata", ctx.audio_loadedmetadata_handler),
				listen(audio, "volumechange", ctx.audio_volumechange_handler),
				listen(audio, "ratechange", ctx.audio_ratechange_handler)
			];
		},
		m(target, anchor) {
			insert(target, audio, anchor);
			audio.volume = ctx.volume;
			audio.playbackRate = ctx.playbackRate;
		},
		p(changed, ctx) {
			if (!audio_updating && changed.currentTime && !isNaN(ctx.currentTime)) {
				audio.currentTime = ctx.currentTime;
			}

			if (changed.paused && audio_is_paused !== (audio_is_paused = ctx.paused)) {
				audio[audio_is_paused ? "pause" : "play"]();
			}

			if (changed.volume && !isNaN(ctx.volume)) {
				audio.volume = ctx.volume;
			}

			if (changed.playbackRate && !isNaN(ctx.playbackRate)) {
				audio.playbackRate = ctx.playbackRate;
			}

			audio_updating = false;
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(audio);
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { buffered } = $$props;
	let { seekable } = $$props;
	let { played } = $$props;
	let { currentTime } = $$props;
	let { duration } = $$props;
	let { paused } = $$props;
	let { volume } = $$props;
	let { playbackRate } = $$props;

	function audio_timeupdate_handler() {
		played = time_ranges_to_array(this.played);
		currentTime = this.currentTime;
		$$invalidate("played", played);
		$$invalidate("currentTime", currentTime);
	}

	function audio_durationchange_handler() {
		duration = this.duration;
		$$invalidate("duration", duration);
	}

	function audio_play_pause_handler() {
		paused = this.paused;
		$$invalidate("paused", paused);
	}

	function audio_progress_handler() {
		buffered = time_ranges_to_array(this.buffered);
		$$invalidate("buffered", buffered);
	}

	function audio_loadedmetadata_handler() {
		buffered = time_ranges_to_array(this.buffered);
		seekable = time_ranges_to_array(this.seekable);
		$$invalidate("buffered", buffered);
		$$invalidate("seekable", seekable);
	}

	function audio_volumechange_handler() {
		volume = this.volume;
		$$invalidate("volume", volume);
	}

	function audio_ratechange_handler() {
		playbackRate = this.playbackRate;
		$$invalidate("playbackRate", playbackRate);
	}

	$$self.$set = $$props => {
		if ("buffered" in $$props) $$invalidate("buffered", buffered = $$props.buffered);
		if ("seekable" in $$props) $$invalidate("seekable", seekable = $$props.seekable);
		if ("played" in $$props) $$invalidate("played", played = $$props.played);
		if ("currentTime" in $$props) $$invalidate("currentTime", currentTime = $$props.currentTime);
		if ("duration" in $$props) $$invalidate("duration", duration = $$props.duration);
		if ("paused" in $$props) $$invalidate("paused", paused = $$props.paused);
		if ("volume" in $$props) $$invalidate("volume", volume = $$props.volume);
		if ("playbackRate" in $$props) $$invalidate("playbackRate", playbackRate = $$props.playbackRate);
	};

	return {
		buffered,
		seekable,
		played,
		currentTime,
		duration,
		paused,
		volume,
		playbackRate,
		audio_timeupdate_handler,
		audio_durationchange_handler,
		audio_play_pause_handler,
		audio_progress_handler,
		audio_loadedmetadata_handler,
		audio_volumechange_handler,
		audio_ratechange_handler
	};
}

class Component extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, [
			"buffered",
			"seekable",
			"played",
			"currentTime",
			"duration",
			"paused",
			"volume",
			"playbackRate"
		]);
	}
}

export default Component;