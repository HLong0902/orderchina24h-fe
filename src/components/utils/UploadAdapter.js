import ROUTES from "../../constants/routeDefine";

export default class UploadAdapter {
	constructor(loader) {
		// The file loader instance to use during the upload.
		this.loader = loader;
	}

	// Starts the upload process.
	upload() {
		return this.loader.file.then(
			(file) =>
				new Promise((resolve, reject) => {
					this._initRequest();
					this._initListeners(resolve, reject, file);
					this._sendRequest(file);
				})
		);
	}

	// Aborts the upload process.
	abort() {
		if (this.xhr) {
			this.xhr.abort();
		}
	}

	// Initializes the XMLHttpRequest object using the URL passed to the constructor.
	_initRequest() {
		const xhr = (this.xhr = new XMLHttpRequest());

		xhr.open(
			"POST",
			`${process.env.BASE_URL}${ROUTES.Complain.uploadFile}`,
			true
		);
		xhr.responseType = "json";
	}

	// Initializes XMLHttpRequest listeners.
	_initListeners(resolve, reject, file) {
		const xhr = this.xhr;
		const loader = this.loader;
		const genericErrorText = `Couldn't upload file: ${file.name}.`;

		xhr.addEventListener("error", () => reject(genericErrorText));
		xhr.addEventListener("abort", () => reject());
		xhr.addEventListener("load", () => {
			const response = xhr.response;

			if (!response || response.error) {
				return reject(
					response && response.error
						? response.error.message
						: genericErrorText
				);
			}
			console.log(
				encodeURI(
					`${process.env.BASE_URL}${ROUTES.Complain.getFile}?fileName=${response.url}`
				)
			);
			resolve({
				default: encodeURI(
					`${process.env.BASE_URL}${ROUTES.Complain.getFile}?fileName=${response.url}`
				),
			});
		});

		if (xhr.upload) {
			xhr.upload.addEventListener("progress", (evt) => {
				if (evt.lengthComputable) {
					loader.uploadTotal = evt.total;
					loader.uploaded = evt.loaded;
				}
			});
		}
	}

	// Prepares the data and sends the request.
	_sendRequest(file) {
		// Prepare the form data.
		const data = new FormData();

		data.append("file", file);

		// Send the request.
		this.xhr.send(data);
	}
}
