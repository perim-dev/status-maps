var options = {

	width: 350,
	height: 100,
	chartArea: { 'width': '280', 'height': '70' },
	legend: 'none',
	curveType: 'function',
	lineWidth: [2, 1, 1],

	colors: ['#00FFFF', '#555555', '#ff0000'],
	backgroundColor: { fill: 'transparent' },
	legendTextStyle: { color: '#777777' },


	hAxis: {
		textColor: '#777777',





		viewWindow: {
			min: new Date(2020, 4, 6, 0),
			max: new Date(2020, 4, 6, 24)
		},


		baselineColor: '#777777',
		gridlines: {
			color: ['#777777'],
			count: -1,
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
			baselineColor: '#777777',
			textColor: '#00ffff',
			gridlines: {
        color: ['#777777'],
        
			},
			viewWindow: {
				min: 0,
				max: 100
			}

		},
		1: {
			baselineColor: '#777777',
			textColor: '#FF4500',
			gridlines: {
				color: ['#777777']
			},
			viewWindow: {
				min: 0,
				max: 200

			}
		},
		2: {
			baselineColor: '#777777',
			textColor: '#777777',
			gridlines: {
				color: ['#777777']
			},
			viewWindow: {
				min: 0,
				max: 200
			}
		}
	},
	series: {
		0: { targetAxisIndex: 0 },
		1: { targetAxisIndex: 1 },
		2: { targetAxisIndex: 1 }
	}
};
