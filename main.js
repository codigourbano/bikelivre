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
		},
		{
			'name': 'Ubatuba',
			'bounds': {
				'south': -23.5970001220703,
				'north': -23.1979999542236,
				'west': -45.2800025939941,
				'east': -44.723747253418
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

	function unserialize(query) {
		var pair, params = {};
		query = query.replace(/^\?/, '').split(/&/);
		for (pair in query) {
			pair = query[pair].split('=');
			params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
		}
		return params;
	}

	function dataSource() {

		var dataSource = getUrl(sources[0].bounds);

		if(window.location.search) {

			var bounds = unserialize(window.location.search.replace('?', ''));

			if(typeof bounds !== 'undefined' && bounds instanceof Object) {

				bounds = bounds.location.split('|');

				bounds = {
					south: bounds[0],
					north: bounds[1],
					west: bounds[2],
					east: bounds[3]
				}

				dataSource = getUrl(bounds);

			}
		}

		return dataSource;

	}

	var config = {
		dataSource: dataSource(),
		get: 'elements',
		dataType: 'json',
		timeOut: 20000,
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
				name: 'rent',
				sourceRef: 'tags.amenity',
				type: 'toggle',
				title: '<img src="icons/bicycle-24.png" /> Aluguel de bicicletas',
				value: 'bicycle_rental',
				relation: 'OR'
			},
			{
				name: 'parking',
				sourceRef: 'tags.amenity',
				type: 'toggle',
				title: '<img src="icons/parking-24.png" /> Bicicletários',
				value: 'bicycle_parking',
				relation: 'OR'
			},
			{
				name: 'store',
				sourceRef: 'tags.shop',
				type: 'toggle',
				title: '<img src="icons/shop-24.png" /> Bicletarias',
				value: 'bicycle',
				relation: 'OR'
			},
			{
				name: 'fuel',
				sourceRef: 'tags.amenity',
				type: 'toggle',
				title: '<img src="icons/fuel-24.png" /> Postos de gasolina',
				value: 'fuel',
				disabledByDefault: true,
				relation: 'OR'
			}
		],
		templates: {
			list: '<% if(item.tags.amenity == "bicycle_rental") { %>' + 
			        '<p class="category">Estação de empréstimo</p>' +
			      '<% } %>'+
			      '<% if(item.tags.shop) { %>' + 
      			  '<p class="category">Loja ou bicicletaria</p>' +
      			'<% } %>'+
            '<% if(item.tags.amenity == "bicycle_parking") { %>' + 
              '<p class="category">Bicicletário</p>' +
            '<% } %>'+
			      '<h3>'+
			      '<% if(item.tags.name) { %>'+
			        '<%= item.tags.name %>'+
			      '<% } else { %>' + 
			        'Sem nome<% } %>'+
			      '</h3>'+
			      '<a href="http://www.openstreetmap.org/edit?editor=id&lat='+
              '<%= item.lat %>'+
			        '&lon='+          
              '<%= item.lon %>'+			            
			        '&zoom=22" target="_blank">' +
			        'editar'+
			      '</a>'
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

	$(document).ready(function() {

		var app = carttirail.init('app', config);

		var $citySearch = $('<div class="city-search"><form><input type="text" class="city_search" name="city" placeholder="Encontre sua cidade" autocomplete="off" /><input type="hidden" name="location" class="location" /></form></div>');

		var $results = $('<div class="city-results" />');

		$citySearch.append($results);

		app.$.header.append($citySearch);

		var results = _.debounce(function(input) {

			if(!input.val() || !input.is(':focus'))
				return false;

			$.get('http://nominatim.openstreetmap.org/search.php?city=' + input.val() + '&format=json', function(data) {

				if(data) {

					$results.show();

					$results.empty();

					$results.append('<ul />');

					_.each(data, function(city, i) {

						var nice_name = city.display_name.split(',')[0];
						var rest_name = city.display_name.replace(nice_name + ', ', '');

						var $item = $('<li><strong>' + nice_name + '</strong>' + rest_name + '</li>');

						$item.data('boundingbox', city.boundingbox);

						$results.find('ul').append($item);

					});


				}

			}, 'json');

		}, 200);

		$citySearch.find('.city_search').bind('keyup', function(e) {

			if(e.keyCode == 13)
				return false;

			if(e.keyCode == 27) {
				$(this).trigger('blur');
				return false;
			}

		});

		$citySearch.find('.city_search').bind('keyup focus', function(e) {

			results($(this));

		});

		$citySearch.find('.city_search').bind('blur', function() {
			setTimeout(function() {
				$results.hide();
			}, 300);
		});

		$results.on('click', 'li', function() {

			$citySearch.find('.location').val($(this).data('boundingbox').join('|'));

			$citySearch.find('form').submit();

		});

	});

})(jQuery);