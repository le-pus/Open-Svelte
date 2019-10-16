import {
	SvelteComponentDev,
	dispatch_dev,
	init,
	noop,
	safe_not_equal
} from "svelte/internal";

const file = undefined;

function create_fragment(ctx) {
	const block = {
		c: function create() {
			{
				const { obj } = ctx;
				console.log({ obj, kobzol });
				debugger;
			}
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: noop,
		p: function update(changed, ctx) {
			if (changed.obj || changed.kobzol) {
				const { obj } = ctx;
				console.log({ obj, kobzol });
				debugger;
			}
		},
		i: noop,
		o: noop,
		d: noop
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

let kobzol = 5;

function instance($$self) {
	let obj = { x: 5 };

	$$self.$capture_state = () => {
		return {};
	};

	$$self.$inject_state = $$props => {
		if ("obj" in $$props) $$invalidate("obj", obj = $$props.obj);
		if ("kobzol" in $$props) $$invalidate("kobzol", kobzol = $$props.kobzol);
	};

	return { obj };
}

class Component extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, []);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Component",
			options,
			id: create_fragment.name
		});
	}
}

export default Component;