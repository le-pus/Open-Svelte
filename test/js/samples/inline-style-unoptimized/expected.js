/* generated by Svelte vX.Y.Z */
import { SvelteComponent as SvelteComponent_1, createElement, createText, detachNode, flush, init, insert, noop, safe_not_equal } from "svelte/internal";

function create_fragment(ctx) {
	var div0, text, div1, div1_style_value;

	return {
		c() {
			div0 = createElement("div");
			text = createText("\n");
			div1 = createElement("div");
			div0.style.cssText = ctx.style;
			div1.style.cssText = div1_style_value = "" + ctx.key + ": " + ctx.value;
		},

		m(target, anchor) {
			insert(target, div0, anchor);
			insert(target, text, anchor);
			insert(target, div1, anchor);
		},

		p(changed, ctx) {
			if (changed.style) {
				div0.style.cssText = ctx.style;
			}

			if ((changed.key || changed.value) && div1_style_value !== (div1_style_value = "" + ctx.key + ": " + ctx.value)) {
				div1.style.cssText = div1_style_value;
			}
		},

		i: noop,
		o: noop,

		d(detach) {
			if (detach) {
				detachNode(div0);
				detachNode(text);
				detachNode(div1);
			}
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { style, key, value } = $$props;

	$$self.$set = $$props => {
		if ('style' in $$props) $$invalidate('style', style = $$props.style);
		if ('key' in $$props) $$invalidate('key', key = $$props.key);
		if ('value' in $$props) $$invalidate('value', value = $$props.value);
	};

	return { style, key, value };
}

class SvelteComponent extends SvelteComponent_1 {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal);
	}

	get style() {
		return this.$$.ctx.style;
	}

	set style(style) {
		this.$set({ style });
		flush();
	}

	get key() {
		return this.$$.ctx.key;
	}

	set key(key) {
		this.$set({ key });
		flush();
	}

	get value() {
		return this.$$.ctx.value;
	}

	set value(value) {
		this.$set({ value });
		flush();
	}
}

export default SvelteComponent;