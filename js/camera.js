class Camera {
    constructor(videoNode) {
        this.videoNode = videoNode;
        this.stream = null;
        this.photo = null;
    }

    on() {
        return this.initCamera( {
            width: 300,
            height: 300
        });
    }

    onBack() {
        return this.initCamera( {
            width: 300,
            height: 300,
            facingMode: 'user'
        });
    }

    initCamera(config) {
        if (navigator.mediaDevices) {
            this.off();
            return navigator.mediaDevices.getUserMedia({
                audio: false,
                video: config
            }).then(streamResult => {
                this.videoNode.srcObject = streamResult;
                this.stream = streamResult;
                return true;
            }).catch(error => {
                alert("Ups! error al intentar abrir la camara");
                return false;
            });
        } else {
            alert("No se cuenta con dispositivos multimedia");
            return false;
        }
    }

    off() {
        if (this.videoNode) {
            this.videoNode.pause();
            if (this.stream) {
                this.stream.getTracks().forEach(track => {
                    track.stop();
                });
            }
        }
    }

    takePhoto() {
        let canvas = document.createElement('canvas');
        canvas.setAttribute('width', '300');
        canvas.setAttribute('height', '300');
        let context = canvas.getContext('2d');
        context.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);
        this.photo = context.canvas.toDataURL();
        canvas = null;
        context = null;
        this.videoNode.removeAttribute('src');
        this.videoNode.load();
        return this.photo;
    }
}
