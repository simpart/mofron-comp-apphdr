/**
 *  @file  mofron-comp-appheader/index.js
 *  @brief app header component for mofron
 *  @license MIT
 */
const Image  = require('mofron-comp-image');
const Header = require('mofron-comp-txtheader');
const Text   = require('mofron-comp-text');
const Link   = require('mofron-event-link');
const Synhei = require('mofron-effect-synchei');
const Hrzpos = require('mofron-effect-hrzpos');
const Horiz  = require('mofron-layout-horizon');
const comutl = mofron.util.common;
const ConfArg = mofron.class.ConfArg;

module.exports = class extends Header {
    /**
     * initialize component
     * 
     * @param mixed: title config parameter
     *        dict: component config list
     * @param mixed: image config parameter
     * @param component: navi config parameter 
     * @short title,image,navi
     * @type private
     */
    constructor (p1, p2, p3) {
        try {
            super();
            this.name('AppHeader');
            this.shortForm('title', 'image', 'navi');
            
	    if (0 < arguments.length) {
                this.config(p1, p2, p3);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * init dom contents
     * 
     * @type private
     */
    initDomConts() {
        try {
            super.initDomConts();
            this.child(this.image(), 0);
	    this.image().event(new Link("./"));
	    this.text().event(new Link("./"));
            
            let conts = new mofron.class.Component({ layout: new Horiz() });
            this.child([ conts, this.naviWrap() ]);

	    this.styleDom(this.styleDom());
            this.childDom(conts.childDom());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * header title
     *
     * @param (mixed) string: header title
     *                mofron-comp-text: replace title component of header
     * @param (key-value) text config
     * @return (mofron-comp-text) text contents
     * @type parameter
     */
    title (txt, cnf) {
        try {
            let ret = this.text(txt, cnf);
            if (undefined !== txt) {
                this.text().style({ "margin-left" : "0.2rem" });
	    }
	    return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter logo image
     * insert logo image to left side of title
     *
     * @param (mixed) string: path to logo image
     *                mofron-comp-image: replace image component
     * @param (key-value) image config
     * @return (mofron-comp-image) logo image
     * @type parameter
     */
    image (prm, cnf) {
        try {
	    if (undefined !== cnf) {
	        let add_cnf = (true === comutl.isinc(prm, 'Image')) ? prm : this.image();
                add_cnf.config(cnf);
	    }
            if ('string' === typeof prm) {
                this.image().config({ path : prm });
                return;
            } else if (true === comutl.isinc(prm, 'Image')) {
                prm.config({ effect : new Synhei(this) });
            }
            return this.innerComp('image', prm, Image);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter navigate area
     *
     * @param (component) navigate component
     * @return (array) navigate component list
     * @type parameter
     */
    navi (prm) {
        try {
            return this.naviWrap().child(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * logo image position and size offset
     * 
     * @param (string (size)) left offset position
     * @param (string (size)) height offset position
     * 
     */
    imgpos (lft, hei) {
        try {
            this.image().style({ "margin-left" : lft });
            let syn = this.image().effect({ name: "SyncHei" });
            if (true === comutl.isinc(syn, "SyncHei") ) {
                syn.offset(hei);
            }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * setter/getter url jump target
     * it jump to this url when user clicks logo or title
     * set null if you don't want jump
     * 
     * @param (mixed) string: jump url
     *                null: not jump
     * @return (string) jump url
     * @type parameter
     */
    url (prm) {
        try {
	    let txt_link = this.text().event({ name: "Link" });
	    let img_link = this.image().event({ name: "Link" });
	    if (undefined === prm) {
                return ("" === txt_link.url()) ? null : txt_link.url();
	    }
	    if (null === prm) {
	        txt_link.config({ url:"", suspend: true });
		img_link.config({ url:"", suspend: true });
	    } else {
                txt_link.url(prm);
		img_link.url(prm);
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter navigate wrapper
     * 
     * @param (component) wrap component
     * @return (component) wrap component
     * @type private
     */
    naviWrap (prm) {
        try {
            if (true === comutl.isinc(prm, 'Component')) {
                prm.config({
                    layout : new Horiz(),
                    effect : new Hrzpos("right", "0.2rem")
                });
            }
            return this.innerComp('naviWrap', prm, mofron.class.Component);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
