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
		data: data.features,
		dataRef: {
			id: 'id',
			lat: 'geometry.coordinates[1]',
			lng: 'geometry.coordinates[0]'
		},
		map: {
			markers: {
				cluster: true
			}
		},
		filters: [
			{
				name: 's',
				sourceRef: 'properties.name',
				type: 'text',
				title: 'Busca por nome'
			},
			{
				name: 'amenity',
				sourceRef: 'properties.amenity',
				type: 'multiple-select',
				title: 'Amenity'
			}
		],
		templates: {
			list: '<p class="category"><%= item.properties.amenity %></p><h3><%= item.properties.name %></h3>'
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