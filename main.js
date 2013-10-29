(function($) {

	var sources = [
		{
			'name': 'São Paulo',
			'bounds': {
				'north': -23.3569984436035,
				'south': -24.0070018768311,
				'west': -46.826000213623,
				'east': -46.3649978637695
			}
		},
		{
			'name': 'Porto Alegre',
			'bounds': {
				'north': -29.9306144714355,
				'south': -30.2694511413574,
				'west': -51.3032264709473,
				'east': -51.0119972229004
			}
		},
		{
			'name': 'Belo Horizonte',
			'bounds': {
				'north': -19.7769985198975,
				'south': -20.0590000152588,
				'west': -44.0613059997559,
				'east': -43.8569984436035
			}
		}
	];

	var nodes = [
		'"amenity"="bicycle_parking"',
		'"amenity"="bicycle_rental"',
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
			markers: {
				cluster: true
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
				title: 'Tipo'
			},
			{
				name: 'shop',
				sourceRef: 'tags.shop',
				type: 'multiple-select',
				title: 'Loja'
			},
			{
				name: 'source',
				sourceRef: 'tags.source',
				type: 'multiple-select',
				title: 'Source'
			}
		],
		templates: {
			list: '<p class="category"><% if(item.tags.amenity) { %><%= item.tags.amenity %><% } else { %>Bicicletário<% } %></p><h3><% if(item.tags.name) { %><%= item.tags.name %><% } else { %>Sem nome<% } %></h3>'
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