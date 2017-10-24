/* generated by Svelte vX.Y.Z */
import { assign, callAll, createText, detachNode, init, insertNode, noop, proto } from "svelte/shared.js";
import Imported from 'Imported.html';



function create_main_fragment(state, component) {
	var text;

	var imported = new Imported({
		_root: component._root
	});

	var nonimported = new NonImported({
		_root: component._root
	});

	return {
		c: function create() {
			imported._fragment.c();
			text = createText("\n");
			nonimported._fragment.c();
		},

		m: function mount(target, anchor) {
			imported._mount(target, anchor);
			insertNode(text, target, anchor);
			nonimported._mount(target, anchor);
		},

		p: noop,

		u: function unmount() {
			imported._unmount();
			detachNode(text);
			nonimported._unmount();
		},

		d: function destroy() {
			imported.destroy(false);
			nonimported.destroy(false);
		}
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign({}, options.data);

	if (!options._root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		this._lock = true;
		callAll(this._beforecreate);
		callAll(this._oncreate);
		callAll(this._aftercreate);
		this._lock = false;
	}
}

assign(SvelteComponent.prototype, proto);
export default SvelteComponent;