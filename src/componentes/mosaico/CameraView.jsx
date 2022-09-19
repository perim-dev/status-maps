import React, { Component } from "react";
import config from "../../config";
import "../../css/camera-view.css";
import inativa from "../../img/camera-vigilancia.png";

class CameraView extends Component {
  constructor(props) {

    super(props);
    const { camera } = props;
    this.lazy = props.lazy;
    this.hideButtons = false;
    this.id = camera;

    this.urlCamera = `${camera ? config.URL_CAMERA_CET.replace("#NUMCAM#", camera) : ""}${camera || ""}`
    this.state = { 
      url: this.lazy ? inativa : this.urlCamera, 
      trocar: true, 
      expandido: false 
    }
    this.cameraRef = null;
    this.interval = null;

  }

  componentDidMount() {

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleDoubleClick = async (e, url) => {

    // if (this.state.trocar)
    //   e.target.src = "/camera-not-found.png";
    // else {
    //   e.target.src = this.state.url
    // }
    console.log("double-click")
    this.setState({ expandido: !this.state.expandido });
  }

  inactivate = () => {
    console.log("inativando")
    this.setState({ url: inativa });
    return true;
  }

  checkToShow = () => {

    // TODO melhor performance console.log(this.cameraRef)

    if (!this.cameraRef) return;

    const clientHeight = this.cameraRef.clientHeight * 3 / 4;

    const rect = this.cameraRef.getBoundingClientRect();

    if (rect.top + clientHeight >= 0 &&
      rect.left >= 0 &&
      rect.bottom - clientHeight <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    ) {
      this.setState({ url: this.urlCamera })
    } else {
      this.setState({ url: inativa })
    }
  }

  render() {

    const { camera, excluirCameraDoMosaico } = this.props;

    return (
      <div className="camera-view-body" ref={(ref) => this.cameraRef = ref}>
        <div className="camera-view-img-fechar">
          {excluirCameraDoMosaico && 
          <span className="span-img-label" title="Excluir" onClick={(e) => excluirCameraDoMosaico(camera)}>x</span>
          }
          <div className={`camera-view-container ${this.state.expandido ? "expandido" : ""}`} onDoubleClick={(e) => this.handleDoubleClick(e, this.urlCamera)} >
            <img alt="camera"
              src={this.state.url}
              onDoubleClick={(e) => this.handleDoubleClick(e, this.urlCamera)} />

          </div>
        </div>
      </div>
    )
  }
}

export default CameraView;
