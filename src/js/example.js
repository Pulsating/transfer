var Transfer = require( 'transfer' );

var Main = {
	init: function() {
		Transfer.createVm({
			vmId: 'subActivity'
		});

		Transfer.init({
			conf: {
				Id: 'SubActivityId',
				Name: 'SubActivityName'
			},
			orderedList: [
				{
					SubActivityName: "123",
					SubActivityId: 1
				}, {
					SubActivityName: "223",
					SubActivityId: 2
				}, {
					SubActivityId: 4,
					SubActivityName: "445"
				}
			],
			allList: [
				{
					SubActivityName: "123",
					SubActivityId: 1
				}, {
					SubActivityName: "223",
					SubActivityId: 2
				}, {
					SubActivityId: 3,
					SubActivityName: "345"
				}, {
					SubActivityId: 4,
					SubActivityName: "456"
				}, {
					SubActivityName: "567",
					SubActivityId: 5
				}, {
					SubActivityName: "678",
					SubActivityId: 6
				}, {
					SubActivityId: 7,
					SubActivityName: "789"
				}, {
					SubActivityId: 8,
					SubActivityName: "890"
				}, {
					SubActivityName: "901",
					SubActivityId: 9
				}, {
					SubActivityName: "123",
					SubActivityId: 10
				}, {
					SubActivityId: 11,
					SubActivityName: "1123"
				}
			]
		});
		
		avalon.scan();

		this.bind();
	},
	bind: function() {
		$( document ).on('click', '#J_Otput', function() {
			var result = Transfer.getResult();
			console.log( result );
			$( '#J_OtputWrap' ).html( JSON.stringify(result) );
		});
	}
};

Main.init();