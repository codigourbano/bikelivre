(function($) {

	var sources = [
		{
			'name': 'São Paulo',
			'bounds': {
				'south': -24.0070018768311,
				'north': -23.3569984436035,
				'west': -46.826000213623,
				'east': -46.3649978637695
			}
		},
		{
			'name': 'Porto Alegre',
			'bounds': {
				'south': -30.2694511413574,
				'north': -29.9306144714355,
				'west': -51.3032264709473,
				'east': -51.0119972229004
			}
		},
		{
			'name': 'Belo Horizonte',
			'bounds': {
				'south': -20.0590000152588,
				'north': -19.7769985198975,
				'west': -44.0613059997559,
				'east': -43.8569984436035
			}
		},
		{
			'name': 'New York',
			'bounds': {
				'south': 40.4773979187012,
				'north': 40.9175796508789,
				'west': -74.2590942382812,
				'east': -73.7001647949219
			}
		}
	];

	var nodes = [
		'"amenity"="bicycle_parking"',
		'"amenity"="bicycle_rental"',
		'"amenity"="fuel"',
		'"shop"="bicycle"'
	];

	function getUrl(bounds) {

		var boundsQuery = '(' + bounds.south + ',' + bounds.west + ',' + bounds.north + ',' + bounds.east + ')';

		var query = '';

		$.each(nodes, function(i, node) {
			query += 'node[' + node + ']' + boundsQuery + ';';
		});

		query = encodeURIComponent('[out:json];(' + query + ');out body;>;out skel;');

		return 'http://overpass-api.de/api/interpreter?data=' + query;

	}

	var config = {
		dataSource: getUrl(sources[0].bounds),
		get: 'elements',
		dataType: 'json',
		dataRef: {
			id: 'id',
			lat: 'lat',
			lng: 'lon'
		},
		map: {
			tiles: 'http://{s}.tiles.mapbox.com/v3/tmcw.map-7s15q36b/{z}/{x}/{y}.png',
			markers: {
				cluster: false,
				icons: [
					{
						iconUrl: 'icons/fuel-12.png',
						iconSize: [12,12],
						iconAnchor: [6,6],
						popupAnchor: [0,-6],
						ref: [
							{
								key: 'tags.amenity',
								value: 'fuel'
							}
						]
					},
					{
						iconUrl: 'icons/bicycle-24.png',
						iconSize: [24,24],
						iconAnchor: [12,12],
						popupAnchor: [0,-12],
						ref: [
							{
								key: 'tags.amenity',
								value: 'bicycle_rental'
							}
						]
					},
					{
						iconUrl: 'icons/parking-24.png',
						iconSize: [24,24],
						iconAnchor: [12,12],
						popupAnchor: [0,-12],
						ref: [
							{
								key: 'tags.amenity',
								value: 'bicycle_parking'
							}
						]
					},
					{
						iconUrl: 'icons/bar-24.png',
						iconSize: [24,24],
						iconAnchor: [12,12],
						popupAnchor: [0,-12],
						ref: [
							{
								key: 'tags.amenity',
								value: 'bar'
							}
						]
					},
					{
						iconUrl: 'icons/shop-24.png',
						iconSize: [24,24],
						iconAnchor: [12,12],
						popupAnchor: [0,-12],
						ref: [
							{
								key: 'tags.shop',
								value: 'bicycle'
							}
						]
					},
					{
						iconUrl: 'icons/circle-stroked-24.png',
						iconSize: [24,24],
						iconAnchor: [12,12],
						popupAnchor: [0,-12],
						ref: [
							{
								key: 'tags.amenity',
								value: null
							}
						]
					}
				]
			}
		},
		filters: [
			{
				name: 's',
				sourceRef: 'tags.name',
				type: 'text',
				title: 'Busca por nome'
			},
			{
				name: 'amenity',
				sourceRef: 'tags.amenity',
				type: 'multiple-select',
				title: 'Tipo',
				labels: {
					bicycle_parking: 'Bicicletário',
					bicycle_rental: 'Aluguel de bicicletas',
					bar: 'Bar'
				},
				exclude: ['fuel']
			},
			{
				name: 'store',
				sourceRef: 'tags.shop',
				type: 'toggle',
				title: 'Lojas de bicicleta',
				value: 'bicycle',
			},
			{
				name: 'repair',
				sourceRef: 'tags["service:bicycle:repair"]',
				type: 'toggle',
				title: 'Manutenção',
				value: 'yes'
			},
			{
				name: 'fuel',
				sourceRef: 'tags.amenity',
				type: 'toggle',
				title: 'Postos de gasolina',
				value: 'fuel',
				disabledByDefault: true
			},
			{
				name: 'source',
				sourceRef: 'tags.source',
				type: 'multiple-select',
				title: 'Fonte',
			}
		],
		templates: {
			list: '<% if(item.tags.amenity) { %><p class="category"><%= item.tags.amenity %></p><% } %><h3><% if(item.tags.name) { %><%= item.tags.name %><% } else { %>Sem nome<% } %></h3>'
		},
		labels: {
			title: 'BikeLivre',
			subtitle: '<strong>Equipamentos para o ciclismo urbano</strong>',
			filters: 'Filtros',
			results: 'Resultados',
			clear_search: 'Limpar busca',
			close: 'Fechar',
			view_map: 'Ver mapa',
			loading: {
				first: 'Carregando...',
				item: 'Carregando...',
				error: 'Ops, parece que o servidor de dados está fora do ar. Tente novamente.'
			}
		}
	}

	carttirail.init('app', config);

})(jQuery);