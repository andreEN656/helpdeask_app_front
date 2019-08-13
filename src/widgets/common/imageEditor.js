/**
 * Преобразовывает File в Image
 * @param {any} file
 */
function fileToImage(file) {
	return new Promise((resolve) => {
		const image = new Image();
		image.crossOrigin = 'anonymous';
		image.onload = () => {
			resolve(image);
		};

		const reader = new FileReader();
		reader.onload = function (e) {
			image.src = e.target.result;
		};
		reader.readAsDataURL(file);
	});
}

function imageURLtoFile(url, filename) {
	let arr = url.split(','), mime = arr[0].match(/:(.*?);/)[1],
	  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime });
}

export {
  fileToImage,
  imageURLtoFile
}
