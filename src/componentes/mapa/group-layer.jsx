import React from 'react'

import Marcador from './marcador';

export default class GroupLayer extends React.PureComponent {

/*

    <Camadas 
                groupLayers={this.props.mapa.groupLayers}
                mapRef={this.mapRef}
                iconeCategoria={this.iconeCategoria} 
                centralizar={this.centralizar}
                carregarCamerasProximas={this.props.carregarCamerasProximas}
                carregarAreaDeAtuacao={this.props.carregarAreaDeAtuacao}
                carregarPontosRelacionados={this.props.carregarPontosRelacionados}
              />
  */

  render() {

    const { groupLayer, mapRef, iconeCategoria, centralizar, carregarCamerasProximas, carregarAreaDeAtuacao, carregarPontosRelacionados } = this.props;

    if (!mapRef || !groupLayer || groupLayer.pontos.length === 0) {
      return <div></div>;
    }

    /*
          groupLayer.pontos.length > 0 &&
      groupLayer.pontos.map((ponto, idx) => ponto.geometry.type === 'Point' &&
        <Marcador icone={iconeCategoria(groupLayer.icone, 'ativo')}
          carregarAreaDeAtuacao={carregarAreaDeAtuacao}
          carregarPontosRelacionados={carregarPontosRelacionados}
          carregarCamerasProximas={carregarCamerasProximas}
          ponto={ponto}
          key={`marcador-key-${ponto.id}`}
          centralizar={centralizar}
          map={mapRef} />
      )

      <Marker position={[-22.9335,-43.3206]}/>
    */

    return (
      <div>
        {groupLayer.pontos.length > 0 &&
          groupLayer.pontos.map((ponto, idx) => ponto.geometry.type === 'Point' ?
            <Marcador icone={iconeCategoria(groupLayer.icone, 'ativo')}
              carregarAreaDeAtuacao={carregarAreaDeAtuacao}
              carregarPontosRelacionados={carregarPontosRelacionados}
              carregarCamerasProximas={carregarCamerasProximas}
              ponto={ponto}
              key={`marcador-key-${ponto.id}`}
              centralizar={centralizar}
              map={mapRef.leafletElement} /> : null
          )}
      </div>
    )
  }
}

