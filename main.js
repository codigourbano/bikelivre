(function($) {

	var data = {
		  "type": "FeatureCollection",
		  "generator": "overpass-turbo",
		  "copyright": "The data included in this document is from www.openstreetmap.org. The data is made available under ODbL.",
		  "timestamp": "2013-10-29T18:01:02Z",
		  "features": [
		    {
		      "type": "Feature",
		      "id": "node/339680757",
		      "properties": {
		        "@id": "node/339680757",
		        "amenity": "bicycle_rental",
		        "name": "Metro Barra Funda"
		      },
		      "geometry": {
		        "type": "Point",
		        "coordinates": [
		          -46.6669239,
		          -23.526324
		        ]
		      }
		    },
		    {
		      "type": "Feature",
		      "id": "node/339682304",
		      "properties": {
		        "@id": "node/339682304",
		        "amenity": "bicycle_rental"
		      },
		      "geometry": {
		        "type": "Point",
		        "coordinates": [
		          -46.6554162,
		          -23.5342968
		        ]
		      }
		    },
		    {
		      "type": "Feature",
		      "id": "node/462747754",
		      "properties": {
		        "@id": "node/462747754",
		        "amenity": "bicycle_rental"
		      },
		      "geometry": {
		        "type": "Point",
		        "coordinates": [
		          -46.5648631,
		          -23.5389513
		        ]
		      }
		    },
		    {
		      "type": "Feature",
		      "id": "node/1731971676",
		      "properties": {
		        "@id": "node/1731971676",
		        "amenity": "bicycle_rental",
		        "name": "Pedalusp"
		      },
		      "geometry": {
		        "type": "Point",
		        "coordinates": [
		          -46.7132329,
		          -23.5642105
		        ]
		      }
		    }
		  ]
		}

	var config = {
		dataSource: 'http://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%3B%28node%5B%22amenity%22%3D%22bicycle_parking%22%5D%28-24%2E122941926913096%2C-47%2E05169677734375%2C-23%2E202223033350386%2C-45%2E968170166015625%29%3Bnode%5B%22shop%22%3D%22bicycle%22%5D%28-24%2E122941926913096%2C-47%2E05169677734375%2C-23%2E202223033350386%2C-45%2E968170166015625%29%3Bnode%5B%22amenity%22%3D%22bicycle_rental%22%5D%28-24%2E122941926913096%2C-47%2E05169677734375%2C-23%2E202223033350386%2C-45%2E968170166015625%29%3B%29%3Bout%20body%3B%3E%3Bout%20skel%3B',
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
				title: 'Amenity'
			},
			{
				name: 'source',
				sourceRef: 'tags.source',
				type: 'multiple-select',
				title: 'Source'
			}
		],
		templates: {
			list: '<p class="category"><%= item.tags.amenity %></p><h3><%= item.tags.name %></h3>'
		},
		labels: {
			title: 'Bike OSM',
			subtitle: '<strong>Open Street Map Bike Data</strong>',
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