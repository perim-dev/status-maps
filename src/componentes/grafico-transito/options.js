export const options = {
  limites: {
    normal: {
      transito: 200,
      pluviometro: 100
    },
    maximizado: {
      transito: 300,
      pluviometro: 150
    }
  },
  width: '100%',
  height: '100%',
  chartArea: { 'width': '75%', 'height': '80%' },
  legend: 'none',
  curveType: 'function',
  lineWidth: [2, 1, 1],
  colors: ['#FF0000', '#DDD', '#00FFFF'],
  backgroundColor: { fill: 'transparent' },
  legendTextStyle: { color: '#777777' },
  hAxis: {
    textColor: '#FFF',
    viewWindow: { // Valor atualizado dinâmicamente no index.jsx
      min: new Date('2020-01-01 00:00:00'),
      max: new Date('2020-01-02 00:00:00')
    },
    baselineColor: '#777777',
    gridlines: {
      color: ['#777777'],
      count: 4,
      units: {
        days: { format: ['MMM dd'] },
        hours: { format: ['HH:mm', 'ha'] },
      }
    },
    minorGridlines: {
      color: ['#777777'],
      units: {
        hours: { format: ['hh:mm:ss a', 'ha'] },
        minutes: { format: ['HH:mm a Z', ':mm'] }
      }
    }
  },
  vAxes: {
    0: {
      ticks:{
        max: 2
      },
      baselineColor: '#777777',
      textColor: '#00ffff',
      gridlines: {
        color: ['#777777'],
        count: 4
      },
      viewWindow: {
        min: 0,
        max: 100
      }

    },
    1: {
      ticks:{
        max: 2
      },
      baselineColor: '#777777',
      textColor: '#FF0000',
      gridlines: {
        color: ['#777777'],
        count: 4
      },
      viewWindow: {
        min: 0
        ,
        max: 200

      }
    },
    2: {
      ticks:{
        max: 2
      },
      baselineColor: '#777777',
      textColor: '#777777',
      gridlines: {
        color: ['#777777'],
        count: 4
      },
      viewWindow: {
        min: 0
        ,
        max: 200
      }
    }
  },
  series: {
    0: { targetAxisIndex: 1 },
    1: { targetAxisIndex: 1 },
    2: { targetAxisIndex: 0 }
  }
};
