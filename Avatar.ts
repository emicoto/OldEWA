window["BLENDMODE"] = {
	"SOURCE_OVER": "source-over",
	"SOURCE_IN": "source-in",
	"SOURCE_OUT": "source-out",
	"SOURCE_ATOP": "source-atop",
	"DESTINATION_OVER": "destination-over",
	"DESTINATION_IN": "destination-in",
	"DESTINATION_OUT": "destination-out",
	"DESTINATION_ATOP": "destination-atop",
	"LIGHTER": "lighter",
	"COPY": "copy",
	"XOR": "xor",
	"MULTIPLY": "multiply",
	"SCREEN": "screen",
	"OVERLAY": "overlay",
	"DARKEN": "darken",
	"LIGHTEN": "lighten",
	"COLOR_DODGE": "color-dodge",
	"COLOR_BURN": "color-burn",
	"HARD_LIGHT": "hard-light",
	"SOFT_LIGHT": "soft-light",
	"DIFFERENCE": "difference",
	"EXCLUSION": "exclusion",
	"HUE": "hue",
	"SATURATION": "saturation",
	"COLOR": "color",
	"LUMINOSITY": "luminosity"
}

namespace Avatar {
	const AVATARPATH = "image/avatar"
	const __resolve = (mainpath, ...paths) => path.resolve(mainpath, ...paths)
	// export const CANVAS = Renderer.createCanvas(180,260)
	// const layer = [{name:"eyes",z:0,src:}]
	// Renderer.Animations["eyes"] = {frames: 2,
	//     duration: 1000
	// }
	Renderer.CanvasModels["Avatar"] = {
		name: "Avatar",
		width: 180,
		height: 260,
		frames: 8,
		generatedOptions() {
			console.log("generatedOptions");
			return []
		},
		defaultOptions() {
			console.log("defaultOptions");

			return {

				filters: {}
			}
		}, preprocess(options) {
			console.log("preprocess");
		}, layers: {
			"eyes": {
				showfn() {
					return true
				},
				width: 180,
				height: 260,
				z: 1,
				srcfn() {
					return __resolve(AVATARPATH, "hairfront/curly/basic_1.png")
				},animationfn(){
					return "eyes"
				},
				desaturatefn(){
					return true
				},
				blendModefn(){
					return BLENDMODE.OVERLAY
				},blendfn(){
					return tinycolor.random().toHexString();
				},
				masksrcfn(){
					// dist\image\avatar\hairfront\curly\hl_mask.png
					return  __resolve(AVATARPATH, "hairfront/curly/hl_mask.png")
				}
			}
		}
	}
 const s = 5000
//  const f = 30
 const frame =[0,1,2,3,2,1,0]
 let n = 0


 export const fm = [[58,60,62,64,66,68,70],[84,85,86,87,88,89,90],[94,95,96,97,98,99,100]].map((v1)=>v1.map(
	 (v2,i)=>{
		 let num
		 
		if (n===0) {
			n = s / 100 * v2
			num = n
		}else{
			num = n
			n =  (s / 100 * v2)
			num = n - num 
				// console.log(v2,frame[i],n ,num,i);
		}
		console.log(v2,frame[i],n ,num,i);
		
		return{
			frame:frame[i],
			duration:num
		}
	 }
 )).flat()

//  const keyframes = [{
//         frame: 0,
//         duration: s / f
//     }, {
//         frame: 1,
//         duration: s / f
//     }, {
//         frame: 2,
//         duration: s / f
//     }, {
//         frame: 3,
//         duration: s / f
//     },
//     {
//         frame: 2,
//         duration: s / f
//     },
//     {
//         frame: 1,
//         duration: s / f
//     },
//     {
//         frame: 0,
//         duration: 3000
//     }]
	Renderer.Animations["eyes"] = {
    keyframes: fm
};
	// export const canvas = CANVAS.canvas
	export var model = Renderer.locateModel("Avatar");
	export var options = model.defaultOptions();
	// options.hair = true;
	// options.hair_sides_type = "default";
	// options.hair_sides_position = "front";
	// options.filters.hair = { desaturate: true, brightness: -0.3, blendMode: 'hard-light', blend: '#e49b67' }
	export var canvas = model.createCanvas();
	model.render(canvas, options);
	model.animate(canvas, options)
}
window.Avatar = Avatar
